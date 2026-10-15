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

        <Link
          href="/"
          className="pill toon-hover font-display text-sm mb-6"
        >
          ← back to the trail
        </Link>

        {/* Title card */}
        <header
          className="toon p-6 sm:p-8 mb-8"
          style={{ background: "var(--sun-soft)", rotate: "-0.4deg" }}
        >
          <p className="font-hand text-lg text-ink-soft mb-2">
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
            {" · "}Truc Nguyen
            {post.metadata.language === "vietnamese" && " · 🇻🇳"}
          </p>
          <h1 className="title font-display text-3xl sm:text-4xl font-extrabold leading-tight">
            {post.metadata.title}
          </h1>

          {post.metadata.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.metadata.tags.split(",").map((t) => (
                <span key={t} className="sticker" style={{ background: "#fff" }}>
                  #{t.trim()}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* TL;DR speech bubble */}
        {post.metadata.summary && (
          <div className="relative mb-10 ml-2 sm:ml-6">
            <div
              className="toon px-5 py-4"
              style={{ background: "var(--mint-soft)" }}
            >
              <span className="font-display font-extrabold mr-2">TL;DR</span>
              <span className="text-ink-soft leading-relaxed">
                {post.metadata.summary}
              </span>
            </div>
            {/* bubble tail */}
            <svg
              aria-hidden="true"
              width="34"
              height="22"
              viewBox="0 0 34 22"
              className="absolute -bottom-[17px] left-8"
            >
              <path
                d="M2 0 L14 19 L28 0"
                fill="var(--mint-soft)"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Body */}
        <article className="prose prose-toon max-w-none">
          <CustomMDX source={post.content} />
        </article>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-dashed border-[#1f1a2e4d] pt-6">
          <p className="font-hand text-xl text-ink-soft">
            That&apos;s this stop. On to the next one!
          </p>
          <Link href="/" className="pill pill-filled toon-hover font-display">
            🥾 Back to the trail
          </Link>
        </div>
      </div>
    </section>
  );
}
