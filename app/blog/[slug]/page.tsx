import Link from "next/link";
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
                name: "Truc Nguyen",
              },
            }),
          }}
        />

        <Link href="/" className="pill text-sm mb-7">
          ← back to the notebooks
        </Link>

        {/* Title card */}
        <header className="mt-6 mb-8 text-center">
          <p className="font-display small-caps text-ink-faint mb-3">
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
            {" · "}Truc Nguyen
            {post.metadata.language === "vietnamese" && " · in Vietnamese"}
          </p>
          <h1 className="title font-display italic text-4xl sm:text-5xl font-semibold leading-[1.05]">
            {post.metadata.title}
          </h1>

          {post.metadata.tags && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {post.metadata.tags.split(",").map((t) => (
                <span key={t} className="rubric">
                  {t.trim()}
                </span>
              ))}
            </div>
          )}
          <p className="ornament mt-7" aria-hidden="true">
            ❦
          </p>
        </header>

        {/* The argument: what this leaf is about, set apart before the text */}
        {post.metadata.summary && (
          <div className="folio mb-10 px-6 py-4 sm:mx-6">
            <span className="font-display small-caps font-semibold text-sanguine mr-2">
              In brief.
            </span>
            <span className="font-display italic text-lg text-ink-soft leading-snug">
              {post.metadata.summary}
            </span>
          </div>
        )}

        {/* Body */}
        <article className="prose prose-codex max-w-none">
          <CustomMDX source={post.content} />
        </article>

        <p className="ornament mt-14 text-lg" aria-hidden="true">
          ⁂
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-hand text-xl text-ink-soft">
            Here ends this leaf. On to the next.
          </p>
          <Link href="/" className="pill pill-filled">
            Back to the notebooks
          </Link>
        </div>
      </div>
    </section>
  );
}
