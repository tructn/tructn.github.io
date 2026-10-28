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

/* A BibTeX entry, the way a paper asks to be cited */
function bibtex(slug: string, title: string, publishedAt: string) {
  let year = publishedAt.slice(0, 4);
  let key = `nguyen${year}:${slug}`;
  return [
    `@misc{${key},`,
    `  author = {Nguyen, Truc},`,
    `  title  = {${title}},`,
    `  year   = {${year}},`,
    `  url    = {${baseUrl}/blog/${slug}},`,
    `  note   = {My quick notes}`,
    `}`,
  ].join("\n");
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

        {/* \maketitle */}
        <header>
          <h1 className="paper-title">{post.metadata.title}</h1>
          <p className="paper-authors">
            Truc Nguyen<sup>*</sup>
          </p>
          <p className="paper-affil lining">
            <time dateTime={post.metadata.publishedAt}>
              {formatDate(post.metadata.publishedAt)}
            </time>
            {post.metadata.language === "vietnamese" && " · in Vietnamese"}
          </p>
        </header>

        {(post.metadata.summary || post.metadata.tags) && (
          <div className="abstract mb-10">
            {post.metadata.summary && (
              <>
                <span className="abstract-heading">Abstract</span>
                {post.metadata.summary}
              </>
            )}
            {post.metadata.tags && (
              <p className="keywords">
                <b>Keywords:</b>
                {post.metadata.tags
                  .split(",")
                  .map((t) => t.trim())
                  .join(" · ")}
              </p>
            )}
          </div>
        )}

        {/* Body: h2 and h3 are numbered by CSS counters */}
        <article className="prose prose-paper max-w-none">
          <CustomMDX source={post.content} />
        </article>

        <h2 className="section-heading">Cite</h2>
        <pre className="font-mono text-[0.78rem] leading-relaxed bg-[#fafaf8] border-y border-[var(--rule)] px-4 py-3 overflow-x-auto">
          {bibtex(post.slug, post.metadata.title, post.metadata.publishedAt)}
        </pre>

        <p className="mt-8">
          <Link href="/" className="ref">
            ← All articles
          </Link>
        </p>
      </div>
    </section>
  );
}
