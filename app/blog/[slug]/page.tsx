import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="w-full flex justify-center antialiased py-4">
      <div className="paper-article w-full p-6 sm:p-8 md:p-10 relative">
        {/* Notebook holes decoration */}
        <div className="notebook-holes hidden sm:flex">
          <div className="notebook-hole" />
          <div className="notebook-hole" />
          <div className="notebook-hole" />
          <div className="notebook-hole" />
          <div className="notebook-hole" />
        </div>

        {/* Red margin line */}
        <div className="absolute left-10 sm:left-14 top-0 bottom-0 w-px bg-red-300/30 hidden sm:block" />

        {/* Paper lines background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm hidden sm:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, #e8e4d9 28px)",
            backgroundPosition: "0 20px",
          }}
        />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "TN Blog",
              },
            }),
          }}
        />

        <div className="relative sm:pl-10">
          <header className="mb-8">
            <h1 className="title font-bold text-2xl sm:text-3xl tracking-tight mb-4 text-stone-800">
              {post.metadata.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-stone-500 flex-wrap">
              {post.metadata.language && (
                <span className="text-base" title={post.metadata.language}>
                  {post.metadata.language === "vietnamese" ? "🇻🇳" : "🇬🇧"}
                </span>
              )}
              <time dateTime={post.metadata.publishedAt} className="italic">
                {formatDate(post.metadata.publishedAt)}
              </time>
              {post.metadata.tags && (
                <div className="flex flex-wrap gap-1.5">
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
          </header>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-amber-200/60" />
            <span className="text-amber-300 text-xs">✦</span>
            <div className="h-px flex-1 bg-amber-200/60" />
          </div>

          <article className="prose max-w-none prose-stone">
            <CustomMDX source={post.content} />
          </article>

          {/* Paper fold corner */}
          <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tl from-stone-200/50 to-transparent rounded-tl-lg" />
        </div>
      </div>
    </section>
  );
}
