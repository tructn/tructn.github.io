import Link from "next/link";
import { getApps, themeStyle, type App } from "app/apps";
import { GetButton } from "app/components/get-button";

export default function Page() {
  let [featured, ...rest] = getApps();
  let apps = [featured, ...rest];

  return (
    <>
      <section className="wrap pt-14 pb-10 sm:pt-20">
        <p className="eyebrow">Apps by</p>
        <h1 className="display mt-1">Truc Nguyen</h1>
        <p className="mt-4 max-w-xl text-lg text-soft text-pretty">
          Small, careful tools for the Mac and the desktop. They do one job
          well, stay out of your way and keep your data on your machine.
        </p>
      </section>

      {/* Featured: the "Today" card for the first app */}
      <section className="wrap" aria-labelledby="featured">
        <div
          className="banner rounded-[28px] grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_1.35fr] lg:items-center"
          style={themeStyle(featured)}
        >
          <div>
            <p className="eyebrow !text-white/70">Featured · {featured.category}</p>
            <div className="mt-4 flex items-center gap-4">
              <img
                src={featured.icon}
                alt=""
                width={80}
                height={80}
                className="app-icon size-20"
              />
              <div>
                <h2 id="featured" className="headline">
                  {featured.name}
                </h2>
                <p className="muted">{featured.subtitle}</p>
              </div>
            </div>
            <p className="mt-5 text-lg text-white/90 text-pretty">{featured.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={featured.href} className="get get-light">
                Learn more
              </Link>
              <GetButton app={featured} />
            </div>
          </div>
          <img
            src={featured.shots[0].src}
            alt={featured.shots[0].alt}
            width={featured.shots[0].width}
            height={featured.shots[0].height}
            className="window-shot -mb-4 sm:-mb-8 lg:-mr-6"
          />
        </div>
      </section>

      <section className="wrap mt-16" aria-labelledby="all-apps">
        <h2 id="all-apps" className="section-title">
          All apps
        </h2>
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {apps.map((app) => (
            <li key={app.slug}>
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function AppCard({ app }: { app: App }) {
  let shot = app.shots[0];

  return (
    <Link
      href={app.href}
      className="card group flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
      style={themeStyle(app)}
    >
      {/* Fixed shape, so cards line up whatever the screenshot's aspect */}
      <div className="banner aspect-[16/10] px-6 pt-6">
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          className="window-shot h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
        />
      </div>
      <div className="flex items-center gap-4 p-5">
        <img src={app.icon} alt="" width={56} height={56} className="app-icon size-14" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg leading-tight">{app.name}</h3>
          <p className="text-soft text-sm truncate">{app.subtitle}</p>
          <p className="text-faint text-xs mt-0.5">
            {app.platform} · {app.category}
          </p>
        </div>
        <span className="get get-soft">View</span>
      </div>
    </Link>
  );
}
