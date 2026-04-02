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
    <section className="w-full flex justify-center antialiased">
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
        <header className="mb-10">
          <h1 className="title font-bold text-3xl sm:text-4xl tracking-tight mb-4">
            {post.metadata.title}
          </h1>
          <div className="flex items-center gap-4 text-sm opacity-60 flex-wrap">
            {post.metadata.language && (
              <span className="text-base" title={post.metadata.language}>
                {post.metadata.language === "vietnamese" ? "🇻🇳" : "🇬🇧"}
              </span>
            )}
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
            {post.metadata.tags && (
              <div className="flex flex-wrap gap-1.5">
                {post.metadata.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-2 py-0.5 text-xs rounded-full border border-black/30 text-black/60 opacity-100"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="h-px w-full bg-[var(--color-border)] mb-8 opacity-50" />

        <article className="prose max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </div>
    </section>
  );
}
