import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const sorted = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  return (
    <div className="w-full">
      {/* Recent Posts header */}
      <div className="border-t-2 border-b border-black/80 py-2 mb-6 flex items-baseline justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-black/50">
          Recent Posts
        </span>
        <span className="text-xs font-mono text-black/40">
          {sorted.length} entr{sorted.length === 1 ? "y" : "ies"}
        </span>
      </div>

      <ol className="flex flex-col divide-y divide-black/10">
        {sorted.map((post, idx) => (
          <li key={post.slug} className="py-5">
            <Link
              href={`/blog/${post.slug}`}
              className="group block focus-visible:outline-none"
            >
              {/* Entry row */}
              <div className="flex gap-4">
                {/* Reference number */}
                <span className="font-mono text-xs text-black/30 pt-0.5 w-6 shrink-0 text-right select-none">
                  [{sorted.length - idx}]
                </span>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h2 className="font-serif text-base font-semibold text-black leading-snug group-hover:underline underline-offset-2 decoration-black/40 mb-1">
                    {post.metadata.title}
                  </h2>

                  {/* Author · Date · Language */}
                  <p className="font-mono text-xs text-black/50 mb-2">
                    Truc Nguyen
                    {post.metadata.language === "vietnamese" && " 🇻🇳"}
                    <span className="mx-1.5">·</span>
                    <time dateTime={post.metadata.publishedAt}>
                      {formatDate(post.metadata.publishedAt, false)}
                    </time>
                  </p>

                  {/* Abstract excerpt */}
                  {post.metadata.summary && (
                    <p className="text-sm text-black/60 leading-relaxed line-clamp-2 font-serif italic">
                      {post.metadata.summary}
                    </p>
                  )}

                  {/* Keywords */}
                  {post.metadata.tags && (
                    <p className="mt-2 font-mono text-xs text-black/40">
                      <span className="not-italic font-semibold text-black/50">
                        Keywords:{" "}
                      </span>
                      {post.metadata.tags
                        .split(",")
                        .map((t) => t.trim())
                        .join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="border-t border-black/20 mt-2" />
    </div>
  );
}
