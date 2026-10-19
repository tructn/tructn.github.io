import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaDownload } from "react-icons/fa";
import { Spotlight } from "app/components/spotlight";
import type { Craft } from "app/crafts/utils";

/* Captions end in a full stop, whether or not the JSON gave one */
const sentence = (text: string) => text.replace(/[.\s]*$/, ".");

/* Gallery entry, set as a numbered figure; opens the project's page */
export function CraftCard({
  craft,
  index,
  figure = index + 1,
}: {
  craft: Craft;
  index: number;
  /** Figure number in the caption, when the page already has figures */
  figure?: number;
}) {
  return (
    <Link href={`/crafts/${craft.slug}`} className="group flex flex-col h-full outline-none">
      {/* Every figure gets the same 3:2 frame, whatever the screenshot's shape;
          the image is fitted inside, never cropped. It is absolutely placed
          because aspect-ratio yields to content taller than the box. */}
      <div
        className="figure-frame relative aspect-[3/2] transition-colors group-hover:border-[var(--ink-faint)]"
        style={{ background: craft.color }}
      >
        <div className="absolute inset-3">
          <Image
            src={craft.hero.src}
            alt={craft.hero.alt}
            width={craft.hero.width}
            height={craft.hero.height}
            priority={index < 2}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <p className="caption">
        <b className="lining">Figure {figure}:</b>
        <span className="font-bold group-hover:text-[var(--link)] group-hover:underline group-focus-visible:text-[var(--link)] underline-offset-2">
          {craft.name}
        </span>
        . {craft.tagline}
        {craft.platform && <span className="text-ink-soft"> ({craft.platform})</span>}
      </p>

      {craft.stack.length > 0 && (
        <p className="mt-1 text-[0.85rem] italic text-ink-faint">
          {craft.stack.join(", ")}
        </p>
      )}
    </Link>
  );
}

/* Full write-up on a project's own page, laid out like a short paper */
export function CraftDetail({ craft }: { craft: Craft }) {
  return (
    <section aria-labelledby={`${craft.slug}-name`}>
      <Spotlight>
        <header className="flex flex-col items-center">
          {craft.logo && (
            <Image src={craft.logo} alt="" width={56} height={56} className="mb-3" />
          )}
          <h1 id={`${craft.slug}-name`} className="paper-title">
            {craft.name}: {craft.tagline.replace(/\.$/, "")}
          </h1>
          <p className="paper-authors">
            Truc Nguyen<sup>*</sup>
          </p>
          {craft.platform && <p className="paper-affil">Available for {craft.platform}</p>}
        </header>

        <div className="abstract">
          <span className="abstract-heading">Abstract</span>
          {craft.description}
          {craft.stack.length > 0 && (
            <p className="keywords">
              <b>Keywords:</b>
              {craft.stack.join(" · ")}
            </p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={craft.download.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              <FaDownload size={12} aria-hidden="true" />
              {craft.download.label}
            </a>
            <a href={craft.repo} target="_blank" rel="noopener noreferrer" className="btn">
              <FaGithub size={14} aria-hidden="true" />
              Source code
            </a>
          </div>
        </div>

        <figure className="mt-10">
          <a
            href={craft.hero.src}
            target="_blank"
            rel="noopener noreferrer"
            data-spotlight={craft.hero.caption ?? craft.name}
            className="block cursor-zoom-in figure-frame"
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
          <figcaption className="caption text-center">
            <b>Figure 1:</b>
            {sentence(craft.hero.caption ?? craft.hero.alt)}
          </figcaption>
        </figure>

        {craft.features.length > 0 && (
          <>
            <h2 className="section-heading">
              <span className="num">1</span>Features
            </h2>
            <ul className="list-disc pl-6 space-y-1 leading-snug">
              {craft.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}

        {craft.shots.length > 0 && (
          <>
            <h2 className="section-heading">
              <span className="num">{craft.features.length > 0 ? 2 : 1}</span>
              Screenshots
            </h2>
            <p className="mb-5">
              Click a figure to enlarge it.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
              {craft.shots.map((shot, i) => {
                // An odd one out at the end sits centred instead of leaving a gap
                let isLoneLast =
                  craft.shots.length % 2 === 1 && i === craft.shots.length - 1;
                return (
                  <figure
                    key={shot.src}
                    className={
                      isLoneLast
                        ? "sm:col-span-2 sm:justify-self-center sm:w-[calc(50%-0.75rem)]"
                        : ""
                    }
                  >
                    <a
                      href={shot.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-spotlight={shot.caption ?? shot.alt}
                      className="block cursor-zoom-in figure-frame hover:border-[var(--ink-faint)] transition-colors"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        className="w-full h-auto"
                      />
                    </a>
                    <figcaption className="caption text-center">
                      <b className="lining">Figure {i + 2}:</b>
                      {sentence(shot.caption ?? shot.alt)}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </>
        )}
      </Spotlight>
    </section>
  );
}
