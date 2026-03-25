import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

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
            className="group border border-neutral-200 rounded-lg p-5 hover:shadow-lg transition-all bg-white flex flex-col w-full"
            href={`/blog/${post.slug}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-black tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-black mb-2 group-hover:underline">
              {post.metadata.title}
            </h2>
            {post.metadata.summary && (
              <p className="text-sm text-black mb-2 line-clamp-3">
                {post.metadata.summary}
              </p>
            )}
            <span className="mt-auto text-xs text-blue-600 font-medium group-hover:underline">
              Read more →
            </span>
          </Link>
        ))}
    </div>
  );
}
