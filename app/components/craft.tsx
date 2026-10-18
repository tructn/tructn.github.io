import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaDownload } from "react-icons/fa";
import { toRoman } from "app/components/roman";
import { Spotlight } from "app/components/spotlight";
import type { Craft } from "app/crafts/utils";

const tilts = ["-0.5deg", "0.4deg", "-0.25deg", "0.5deg", "-0.4deg"];

/* The project's colour, thinned so the page shows through */
const wash = (color: string) => `color-mix(in srgb, ${color} 60%, transparent)`;

/* Gallery tile: cover shot, logo badge and the gist; opens the project's page */
export function CraftCard({ craft, index }: { craft: Craft; index: number }) {
  return (
    <Link
      href={`/crafts/${craft.slug}`}
      className="folio folio-hover group flex flex-col h-full"
      style={{ rotate: tilts[index % tilts.length] }}
    >
      <div
        className="relative m-3 mb-0 px-3 pt-3 rounded-[var(--hand-radius)]"
        style={{ background: wash(craft.color) }}
      >
        <Image
          src={craft.hero.src}
          alt={craft.hero.alt}
          width={craft.hero.width}
          height={craft.hero.height}
          priority={index < 2}
          className="photo w-full h-auto"
        />
        {craft.platform && (
          <span className="rubric absolute top-5 right-5">
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
              style={{ filter: "drop-shadow(0 3px 4px rgba(60, 35, 10, 0.35))" }}
            />
          )}
          <h3
            className="font-display italic text-3xl font-semibold leading-none swipe"
            style={{ "--swipe": craft.accent } as React.CSSProperties}
          >
            {craft.name}
          </h3>
        </div>
        <p className="text-ink-soft leading-snug mt-2">
          {craft.tagline}
        </p>

        {craft.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {craft.stack.slice(0, 4).map((s) => (
              <span key={s} className="rubric">
                {s}
              </span>
            ))}
            {craft.stack.length > 4 && (
              <span className="rubric">
                +{craft.stack.length - 4}
              </span>
            )}
          </div>
        )}

        <span className="font-hand text-lg mt-auto pt-3 self-end">
          examine the drawings →
        </span>
      </div>
    </Link>
  );
}

/* Full write-up on a project's own page */
export function CraftDetail({ craft }: { craft: Craft }) {
  return (
    <section aria-labelledby={`${craft.slug}-name`}>
      <Spotlight>
        <article className="mb-10">
          <div
            className="p-5 sm:p-7 rounded-[var(--hand-radius)]"
            style={{ background: wash(craft.color) }}
          >
            <div className="flex items-start gap-4">
              {craft.logo && (
                <Image
                  src={craft.logo}
                  alt=""
                  width={72}
                  height={72}
                  className="shrink-0"
                  style={{ filter: "drop-shadow(0 4px 6px rgba(60, 35, 10, 0.35))" }}
                />
              )}
              <div className="min-w-0">
                <h1
                  id={`${craft.slug}-name`}
                  className="font-display italic text-5xl font-semibold leading-none"
                >
                  {craft.name}
                </h1>
                <p className="font-display text-xl font-medium mt-1.5 leading-snug">
                  {craft.tagline}
                </p>
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-ink-soft max-w-prose">
              {craft.description}
            </p>

            {craft.features.length > 0 && (
              <ul className="mt-4 grid gap-1.5 leading-snug max-w-prose">
                {craft.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true" className="text-sanguine">
                      ❧
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {craft.stack.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {craft.stack.map((s) => (
                  <span key={s} className="rubric">
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={craft.download.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-filled"
              >
                <FaDownload size={14} aria-hidden="true" />
                {craft.download.label}
              </a>
              <a
                href={craft.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
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
            data-spotlight={craft.hero.caption ?? craft.name}
            className="block mt-5 cursor-zoom-in"
          >
            <Image
              src={craft.hero.src}
              alt={craft.hero.alt}
              width={craft.hero.width}
              height={craft.hero.height}
              priority
              className="photo w-full h-auto"
            />
          </a>
        </article>

        {craft.shots.length > 0 && (
          <>
            {/* Screenshots as numbered plates */}
            <h2 className="font-display italic text-3xl font-semibold mb-1">
              Studies
            </h2>
            <p className="font-hand text-lg text-ink-soft mb-6">
              select any plate to see it full size
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
                    data-spotlight={shot.caption ?? ""}
                    className={`group block cursor-zoom-in ${
                      isLoneLast
                        ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.875rem)]"
                        : ""
                    }`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="photo photo-hover w-full h-auto"
                    />
                    <p className="font-hand text-lg text-center px-2 py-2.5 leading-snug">
                      <span className="font-display not-italic small-caps text-sanguine mr-1.5">
                        Fig. {toRoman(i + 1)}.
                      </span>
                      {shot.caption}
                    </p>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </Spotlight>
    </section>
  );
}
