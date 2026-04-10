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
    <section className="w-full antialiased">
      <div className="w-full">
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

        {/* Title block */}
        <header className="text-center mb-8 border-b border-black/10 pb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-black leading-tight mb-4">
            {post.metadata.title}
          </h1>

          {/* Author + date */}
          <p className="font-mono text-xs text-black/50 mb-1">
            Truc Nguyen
            {post.metadata.language === "vietnamese" && (
              <span className="ml-1">🇻🇳</span>
            )}
          </p>
          <time
            dateTime={post.metadata.publishedAt}
            className="font-mono text-xs text-black/40"
          >
            {formatDate(post.metadata.publishedAt)}
          </time>

          {/* Keywords */}
          {post.metadata.tags && (
            <p className="mt-3 font-mono text-xs text-black/40">
              <span className="font-semibold text-black/50">Keywords: </span>
              {post.metadata.tags
                .split(",")
                .map((t) => t.trim())
                .join(", ")}
            </p>
          )}
        </header>

        {/* Abstract */}
        {post.metadata.summary && (
          <div className="mb-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-black/40 mb-2">
              Abstract
            </p>
            <p className="text-sm font-serif italic text-black/70 leading-relaxed border-l-2 border-black/15 pl-4">
              {post.metadata.summary}
            </p>
          </div>
        )}

        <div className="border-t border-dashed border-black/15 mb-8" />

        {/* Body */}
        <article className="prose prose-paper max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  );
}
