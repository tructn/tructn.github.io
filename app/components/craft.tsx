import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaDownload } from "react-icons/fa";
import type { Craft } from "app/crafts/utils";

const tilts = ["-1deg", "0.8deg", "-0.5deg", "1deg", "-0.8deg"];

/* Gallery tile: cover shot, logo badge and the gist; opens the project's page */
export function CraftCard({ craft, index }: { craft: Craft; index: number }) {
  return (
    <Link
      href={`/crafts/${craft.slug}`}
      className="toon toon-hover group flex flex-col overflow-hidden h-full"
      style={{ rotate: tilts[index % tilts.length] }}
    >
      <div
        className="relative border-b-[3px] border-[#1f1a2e] px-3 pt-3"
        style={{ background: craft.color }}
      >
        <Image
          src={craft.hero.src}
          alt={craft.hero.alt}
          width={craft.hero.width}
          height={craft.hero.height}
          priority={index < 2}
          className="w-full h-auto rounded-t-[10px] border-2 border-b-0 border-[#1f1a2e] bg-white"
        />
        {craft.platform && (
          <span
            className="sticker absolute top-5 right-5"
            style={{ background: "#fff" }}
          >
            {craft.platform}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 pt-3">
        <div className="flex items-end gap-3">
          {craft.logo && (
            <Image
              src={craft.logo}
              alt=""
              width={48}
              height={48}
              className="shrink-0 -mt-9"
              style={{ filter: "drop-shadow(2px 2px 0 var(--ink))" }}
            />
          )}
          <h3
            className="font-display text-2xl font-extrabold leading-none swipe"
            style={{ "--swipe": craft.color } as React.CSSProperties}
          >
            {craft.name}
          </h3>
        </div>
        <p className="text-[15px] text-ink-soft leading-snug mt-2">
          {craft.tagline}
        </p>

        {craft.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {craft.stack.slice(0, 4).map((s) => (
              <span key={s} className="sticker" style={{ background: "#fff" }}>
                {s}
              </span>
            ))}
            {craft.stack.length > 4 && (
              <span className="sticker" style={{ background: "#fff" }}>
                +{craft.stack.length - 4}
              </span>
            )}
          </div>
        )}

        <span className="font-hand text-lg mt-auto pt-3 self-end">
          take a look →
        </span>
      </div>
    </Link>
  );
}

/* Full write-up on a project's own page */
export function CraftDetail({ craft }: { craft: Craft }) {
  return (
    <section aria-labelledby={`${craft.slug}-name`}>
      <article className="toon overflow-hidden mb-8">
        <div className="p-5 sm:p-7" style={{ background: craft.color }}>
          <div className="flex items-start gap-4">
            {craft.logo && (
              <Image
                src={craft.logo}
                alt=""
                width={72}
                height={72}
                className="wiggle shrink-0"
                style={{ filter: "drop-shadow(3px 3px 0 var(--ink))" }}
              />
            )}
            <div className="min-w-0">
              <h1
                id={`${craft.slug}-name`}
                className="font-display text-4xl font-extrabold leading-none"
              >
                {craft.name}
              </h1>
              <p className="font-display text-lg font-semibold mt-1 leading-snug">
                {craft.tagline}
              </p>
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft max-w-prose">
            {craft.description}
          </p>

          {craft.features.length > 0 && (
            <ul className="mt-4 grid gap-1.5 text-[15px] leading-snug max-w-prose">
              {craft.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden="true" className="font-display font-extrabold">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {craft.stack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {craft.stack.map((s) => (
                <span key={s} className="sticker" style={{ background: "#fff" }}>
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={craft.download.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-filled toon-hover font-display"
              style={{ "--pill-color": "var(--sun)" } as React.CSSProperties}
            >
              <FaDownload size={14} aria-hidden="true" />
              {craft.download.label}
            </a>
            <a
              href={craft.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="pill toon-hover font-display"
            >
              <FaGithub size={16} aria-hidden="true" />
              View on GitHub
            </a>
          </div>
        </div>

        <a
          href={craft.hero.src}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-t-[3px] border-[#1f1a2e] bg-white"
        >
          <Image
            src={craft.hero.src}
            alt={craft.hero.alt}
            width={craft.hero.width}
            height={craft.hero.height}
            priority
            className="w-full h-auto"
          />
        </a>
      </article>

      {craft.shots.length > 0 && (
        <>
          {/* Screenshot "polaroids" */}
          <h2 className="font-display text-2xl font-extrabold mb-1">
            Snapshots
          </h2>
          <p className="font-hand text-lg text-ink-soft mb-6">
            click any one to see it full size
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {craft.shots.map((shot, i) => {
              // An odd one out at the end sits centred instead of leaving a gap
              let isLoneLast =
                craft.shots.length % 2 === 1 && i === craft.shots.length - 1;
              return (
                <a
                  key={shot.src}
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`toon toon-hover block p-2.5 ${shot.caption ? "pb-0" : ""} ${
                    isLoneLast
                      ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.875rem)]"
                      : ""
                  }`}
                  style={{ rotate: tilts[i % tilts.length], background: shot.color }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    className="w-full h-auto rounded-[10px] border-2 border-[#1f1a2e] bg-white"
                  />
                  {shot.caption && (
                    <p className="font-hand text-lg text-center px-2 py-2.5 leading-snug">
                      {shot.caption}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
