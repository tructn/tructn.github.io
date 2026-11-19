import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { getApp, getApps } from "app/apps";
import { Gallery } from "app/components/gallery";
import { GetButton } from "app/components/get-button";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  return getApps().map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let app = getApp(slug);
  if (!app) return;

  let title = `${app.name}: ${app.subtitle}`;
  let shot = app.shots[0];

  return {
    title: app.name,
    description: app.summary,
    alternates: { canonical: `${baseUrl}${app.href}` },
    openGraph: {
      title,
      description: app.summary,
      url: `${baseUrl}${app.href}`,
      images: [{ url: `${baseUrl}${shot.src}`, width: shot.width, height: shot.height }],
    },
    twitter: { card: "summary_large_image", title, description: app.summary },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  let app = getApp(slug);
  if (!app) notFound();

  let [hero] = app.shots;
  let year = new Date().getFullYear();

  let info: [string, React.ReactNode][] = [
    ["Developer", "Truc Nguyen"],
    ["Category", app.category],
    ["Compatibility", app.requires],
    app.languages && ["Languages", app.languages],
    app.age && ["Age Rating", app.age],
    ["Price", app.purchases ? `${app.price}, ${app.purchases.toLowerCase()}` : app.price],
    app.version && ["Version", app.version],
    ["Copyright", `© ${year} Truc Nguyen`],
  ].filter(Boolean) as [string, React.ReactNode][];

  return (
    <article>
      {/* Hero: icon, name and the first screenshot on the app's colours */}
      <header className="banner">
        <div className="wrap pt-12 sm:pt-16 text-center flex flex-col items-center">
          <img
            src={app.icon}
            alt={`${app.name} icon`}
            width={128}
            height={128}
            className="app-icon size-24 sm:size-32"
          />
          <h1 className="display mt-4">{app.name}</h1>
          <p className="mt-2 text-xl muted text-balance">{app.tagline}</p>
          <div className="mt-6 flex flex-wrap justify-center items-start gap-3">
            <GetButton app={app} variant="light" withNote />
            {app.repo && (
              <a
                href={app.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="get get-static"
              >
                <FaGithub aria-hidden="true" />
                Source
              </a>
            )}
          </div>
          <p className="mt-3 text-sm muted">
            {app.price}
            {app.purchases && ` · ${app.purchases}`} · {app.platform}
          </p>
          <img
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            fetchPriority="high"
            className="window-shot mt-8 -mb-[6%] max-w-[1000px]"
          />
        </div>
      </header>

      <dl className="wrap info-strip mt-0 !px-0 sm:!px-0">
        <div>
          <dt>Price</dt>
          <dd>
            {app.price}
            {app.purchases && <small>In-App Purchases</small>}
          </dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>
            {app.category}
            <small>&nbsp;</small>
          </dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>
            {app.platform}
            <small>{app.requires}</small>
          </dd>
        </div>
        {app.age && (
          <div>
            <dt>Age</dt>
            <dd>
              {app.age}
              <small>Years old</small>
            </dd>
          </div>
        )}
        {app.version && (
          <div>
            <dt>Version</dt>
            <dd>
              {app.version}
              <small>&nbsp;</small>
            </dd>
          </div>
        )}
        <div>
          <dt>Developer</dt>
          <dd>
            Truc N.
            <small>Independent</small>
          </dd>
        </div>
      </dl>

      <section className="mt-14" aria-labelledby="preview">
        <h2 id="preview" className="wrap section-title">
          Preview
        </h2>
        <Gallery shots={app.shots} />
      </section>

      <section className="wrap mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="section-title">About {app.name}</h2>
          <div className="mt-3 space-y-3 text-soft text-pretty">
            {app.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {app.stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {app.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs text-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {app.features.map((f) => (
            <li key={f.title} className="feature">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-soft text-[0.95rem]">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {app.pro && (
        <section className="wrap mt-16" aria-labelledby="pro">
          <div className="banner rounded-[28px] p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-5">
              {app.pro.icon && (
                <img
                  src={app.pro.icon}
                  alt={`${app.pro.name} icon`}
                  width={96}
                  height={96}
                  className="app-icon size-20 sm:size-24"
                />
              )}
              <div>
                <p className="eyebrow !text-white/70">
                  In-App Purchase · {app.pro.kind}
                  {app.pro.price && ` · ${app.pro.price}`}
                </p>
                <h2 id="pro" className="headline mt-1">
                  {app.pro.name}
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl muted text-pretty">{app.pro.text}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {app.pro.features.map((f) => (
                <li
                  key={f.title}
                  className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm"
                >
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm muted">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="wrap mt-16 grid gap-5 md:grid-cols-2 md:items-start">
        {app.privacy && (
          <div className="card p-6 sm:p-8">
            <h2 className="section-title">App Privacy</h2>
            <div className="mt-5 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl text-white"
                style={{ background: "var(--accent)" }}
              >
                ✓
              </span>
              <div>
                <p className="font-semibold text-lg">{app.privacy.label}</p>
                <p className="text-soft text-sm text-pretty">{app.privacy.text}</p>
              </div>
            </div>
            {app.docs.includes("privacy") && (
              <Link href={`${app.href}privacy/`} className="link mt-4 inline-block">
                Read the privacy policy →
              </Link>
            )}
          </div>
        )}

        <div className="card p-6 sm:p-8">
          <h2 className="section-title">Information</h2>
          <dl className="mt-4 divide-y divide-[var(--hair)] text-[0.95rem]">
            {info.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-2.5">
                <dt className="text-faint">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {app.docs.includes("support") && (
              <Link href={`${app.href}support/`} className="link">
                App Support →
              </Link>
            )}
            {app.docs.includes("privacy") && (
              <Link href={`${app.href}privacy/`} className="link">
                Privacy Policy →
              </Link>
            )}
            {app.repo && (
              <a href={app.repo} target="_blank" rel="noopener noreferrer" className="link">
                Source code →
              </a>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
