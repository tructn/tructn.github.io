import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="flex flex-col gap-6">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="group relative flex flex-col w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-6 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
            href={`/blog/${post.slug}`}
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-blue-400 rounded-s-xl transition-all group-hover:bg-blue-600" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-black tabular-nums font-medium tracking-wide">
                {formatDate(post.metadata.publishedAt, false)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-black mb-2 group-hover:underline leading-tight">
              {post.metadata.title}
            </h2>
            {post.metadata.summary && (
              <p className="text-base text-black mb-3 line-clamp-3 opacity-90">
                {post.metadata.summary}
              </p>
            )}
            <span className="mt-auto text-xs text-blue-700 font-semibold group-hover:underline tracking-wide">
              Read more →
            </span>
          </Link>
        ))}
    </div>
  );
}
