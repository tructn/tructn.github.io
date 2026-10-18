import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { toRoman } from "app/components/roman";

// Leaves lie a touch askew, like sheets gathered loose into a codex
const tilts = ["-0.35deg", "0.3deg", "-0.2deg", "0.4deg"];

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const sorted = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display italic text-4xl font-semibold leading-none">
            The Notebooks
          </h2>
          <p className="font-hand text-lg text-ink-soft mt-1.5">
            every leaf so far, the newest on top
          </p>
        </div>
        <span className="rubric shrink-0">
          {toRoman(sorted.length)} folio{sorted.length === 1 ? "" : "s"}
        </span>
      </div>

      <ol className="relative">
        {/* The ruled margin the folio numbers sit in */}
        <span
          aria-hidden="true"
          className="absolute left-[46px] top-0 bottom-0 border-l border-[rgba(163,64,42,0.35)]"
        />

        {sorted.map((post, idx) => {
          const folio = sorted.length - idx;
          return (
            <li key={post.slug} className="relative pl-16 pb-8 last:pb-2">
              <span
                aria-hidden="true"
                className="font-display italic absolute left-0 top-5 w-[40px] text-right text-xl font-semibold text-sanguine"
              >
                {toRoman(folio)}
              </span>

              <Link
                href={`/blog/${post.slug}`}
                className="folio folio-hover group block px-6 py-5"
                style={{ rotate: tilts[idx % tilts.length] }}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5 font-display small-caps text-[15px] text-ink-faint">
                  <span>Folio {toRoman(folio)}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt, false)}
                  </time>
                  {post.metadata.language === "vietnamese" && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>in Vietnamese</span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold leading-tight mb-2">
                  <span
                    className="swipe"
                    style={{ "--swipe": "var(--sanguine)" } as React.CSSProperties}
                  >
                    {post.metadata.title}
                  </span>
                </h3>

                {post.metadata.summary && (
                  <p className="text-ink-soft leading-relaxed line-clamp-2">
                    {post.metadata.summary}
                  </p>
                )}

                {post.metadata.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.metadata.tags.split(",").map((t) => (
                      <span key={t} className="rubric">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <p className="font-hand text-lg text-ink-soft pl-16 mt-1">
        …and more leaves yet to be written
      </p>
    </div>
  );
}
