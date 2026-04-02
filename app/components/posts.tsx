import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

// Different rotation angles for paper note effect
const rotations = [
  "rotate-[-1deg]",
  "rotate-[0.5deg]",
  "rotate-[-0.5deg]",
  "rotate-[1deg]",
  "rotate-[0deg]",
];

// Different tape positions for variety
const tapePositions = [
  "left-4",
  "left-8",
  "right-4",
  "right-8",
  "left-1/2 -translate-x-1/2",
];

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`paper-note group relative flex flex-col bg-[#fffef9] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hover:scale-[1.02] hover:z-10 ${rotations[index % rotations.length]}`}
          >
            {/* Tape decoration */}
            <div
              className={`absolute -top-3 ${tapePositions[index % tapePositions.length]} w-12 h-6 bg-amber-100/80 rotate-[-2deg] shadow-sm z-10`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,243,219,0.9) 0%, rgba(245,233,200,0.8) 100%)",
              }}
            />

            {/* Paper lines effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, #e8e4d9 28px)",
                  backgroundPosition: "0 20px",
                }}
              />
              {/* Red margin line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-red-300/40" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col flex-1 p-6 pl-12 pt-8">
              <div className="flex flex-col gap-1 mb-2">
                <h2 className="text-lg font-medium text-stone-800 group-hover:text-amber-700 transition-colors duration-300 line-clamp-2 leading-snug">
                  {post.metadata.title}
                </h2>
                <time className="text-xs text-stone-500 tabular-nums font-normal">
                  {formatDate(post.metadata.publishedAt, false)}
                </time>
              </div>
              {post.metadata.summary && (
                <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
                  {post.metadata.summary}
                </p>
              )}
              {post.metadata.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.metadata.tags.split(",").map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2 py-0.5 text-xs bg-amber-50 border border-amber-200/60 text-amber-700/70 rounded-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Folded corner effect */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-stone-200 to-transparent" />
          </Link>
        ))}
    </div>
  );
}
