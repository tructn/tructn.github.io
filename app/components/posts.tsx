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
      {/* \maketitle */}
      <h1 className="paper-title">Truc&apos;s Notes</h1>
      <p className="paper-affil mt-2">On code and life</p>
      <p className="paper-authors">
        Truc Nguyen<sup>*</sup>
      </p>

      <h2 className="section-heading">Contents</h2>

      <ol className="space-y-4">
        {sorted.map((post, idx) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block outline-none">
              <div className="toc-row">
                <span className="font-bold lining w-6 shrink-0">{idx + 1}</span>
                <span className="font-bold leading-snug group-hover:text-[var(--link)] group-focus-visible:text-[var(--link)] group-hover:underline underline-offset-2">
                  {post.metadata.title}
                </span>
                <span aria-hidden="true" className="toc-leader" />
                <time
                  dateTime={post.metadata.publishedAt}
                  className="lining text-[0.9rem] shrink-0"
                >
                  {formatDate(post.metadata.publishedAt, false)}
                </time>
              </div>

              <div className="pl-8 text-[0.92rem] leading-snug text-ink-soft">
                {post.metadata.summary && (
                  <p className="mt-1 line-clamp-2">{post.metadata.summary}</p>
                )}
                {(post.metadata.tags || post.metadata.language === "vietnamese") && (
                  <p className="mt-0.5 italic text-ink-faint">
                    {post.metadata.tags &&
                      post.metadata.tags
                        .split(",")
                        .map((t) => t.trim())
                        .join(", ")}
                    {post.metadata.language === "vietnamese" &&
                      `${post.metadata.tags ? " · " : ""}in Vietnamese`}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
