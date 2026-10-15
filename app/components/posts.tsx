import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

// Each stop on the trail gets its own colour + a tiny tilt, like stickers on a map
const palette = [
  { pin: "var(--coral)", soft: "var(--coral-soft)" },
  { pin: "var(--sky)", soft: "var(--sky-soft)" },
  { pin: "var(--sun)", soft: "var(--sun-soft)" },
  { pin: "var(--mint)", soft: "var(--mint-soft)" },
  { pin: "var(--lilac)", soft: "var(--lilac-soft)" },
  { pin: "var(--peach)", soft: "var(--peach-soft)" },
];
const tilts = ["-0.6deg", "0.5deg", "-0.3deg", "0.7deg"];

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const sorted = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-4 mb-7">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-none">
            The Trail
          </h2>
          <p className="font-hand text-lg text-ink-soft mt-1">
            every stop so far, newest first
          </p>
        </div>
        <span className="sticker shrink-0" style={{ background: "var(--mint-soft)" }}>
          📍 {sorted.length} stop{sorted.length === 1 ? "" : "s"}
        </span>
      </div>

      <ol className="relative">
        {/* The dashed road the stops hang off */}
        <span
          aria-hidden="true"
          className="absolute left-[17px] top-3 bottom-3 border-l-[3px] border-dashed border-[#1f1a2e66]"
        />

        {sorted.map((post, idx) => {
          const color = palette[idx % palette.length];
          const stop = sorted.length - idx;
          return (
            <li key={post.slug} className="relative pl-12 pb-7 last:pb-2">
              {/* Map pin */}
              <span
                aria-hidden="true"
                className="font-display absolute left-0 top-4 w-[37px] h-[37px] rounded-full border-[3px] border-[#1f1a2e] grid place-items-center text-sm font-extrabold"
                style={{ background: color.pin, boxShadow: "2px 2px 0 var(--ink)" }}
              >
                {stop}
              </span>

              <Link
                href={`/blog/${post.slug}`}
                className="toon toon-hover group block p-5"
                style={{ rotate: tilts[idx % tilts.length] }}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 font-hand text-base text-ink-soft">
                  <span>Stop #{stop}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                  {post.metadata.language === "vietnamese" && (
                    <span title="Written in Vietnamese">· 🇻🇳</span>
                  )}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight mb-2">
                  <span
                    className="swipe"
                    style={{ "--swipe": color.pin } as React.CSSProperties}
                  >
                    {post.metadata.title}
                  </span>
                </h3>

                {post.metadata.summary && (
                  <p className="text-[15px] text-ink-soft leading-relaxed line-clamp-2">
                    {post.metadata.summary}
                  </p>
                )}

                {post.metadata.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.metadata.tags.split(",").map((t) => (
                      <span
                        key={t}
                        className="sticker"
                        style={{ background: color.soft }}
                      >
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="font-hand text-lg text-ink-soft pl-12 mt-1">
        …and the road keeps going 🚶
      </p>
    </div>
  );
}
