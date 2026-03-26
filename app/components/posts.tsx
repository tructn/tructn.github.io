import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="flex flex-col gap-8 w-full">
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
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white border border-black rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <div className="h-1 w-full bg-black group-hover:bg-black transition-colors duration-300" />
            <div className="flex flex-col flex-1 p-6">
              <div className="flex flex-row items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-black group-hover:underline transition-colors duration-300 line-clamp-2">
                  {post.metadata.title}
                </h2>
                <time className="text-xs text-black/60 tabular-nums font-medium ml-4 whitespace-nowrap">
                  {formatDate(post.metadata.publishedAt, false)}
                </time>
              </div>
              {post.metadata.summary && (
                <p className="text-black/80 text-sm leading-relaxed mt-1 line-clamp-3">
                  {post.metadata.summary}
                </p>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
}
