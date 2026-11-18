import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getApp, getApps, getDoc, type DocKind } from "app/apps";
import { baseUrl } from "app/sitemap";

/* Shared by /<slug>/privacy/ and /<slug>/support/: the app's markdown file,
   set as a plain readable page. These URLs are what the store listing
   points at, so keep them stable. */

export function docParams(kind: DocKind) {
  return getApps()
    .filter((app) => app.docs.includes(kind))
    .map((app) => ({ slug: app.slug }));
}

export function docMetadata(slug: string, kind: DocKind) {
  let app = getApp(slug);
  if (!app?.docs.includes(kind)) return;
  let doc = getDoc(slug, kind);
  return {
    title: `${app.name} ${doc.title}`,
    description: `${doc.title} for ${app.name}, ${app.subtitle.toLowerCase()}.`,
    alternates: { canonical: `${baseUrl}${app.href}${kind}/` },
  };
}

function DocLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  let href = props.href ?? "";
  if (href.startsWith("/")) {
    return <Link {...props} href={href} />;
  }
  if (href.startsWith("http")) {
    return <a {...props} target="_blank" rel="noopener noreferrer" />;
  }
  return <a {...props} />;
}

export function DocPage({ slug, kind }: { slug: string; kind: DocKind }) {
  let app = getApp(slug)!;
  let doc = getDoc(slug, kind);

  return (
    <article className="wrap max-w-3xl pt-12 sm:pt-16">
      <header className="flex items-center gap-4">
        <img src={app.icon} alt="" width={64} height={64} className="app-icon size-16" />
        <div>
          <p className="eyebrow">{app.name}</p>
          <h1 className="headline">{doc.title}</h1>
        </div>
      </header>
      {doc.updated && <p className="mt-4 text-sm text-faint">Last updated {doc.updated}</p>}
      <div className="doc mt-8">
        <MDXRemote
          source={doc.content}
          components={{ a: DocLink }}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
