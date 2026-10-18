import { CraftCard } from "app/components/craft";
import { gearPath } from "app/components/hero";
import { toRoman } from "app/components/roman";
import { getCrafts } from "app/crafts/utils";

export const metadata = {
  title: "Inventions",
  description: "Things I've built along the way.",
};

// Projects live in app/crafts/projects/<slug>.json, see the README there
export default function Page() {
  const crafts = getCrafts();

  return (
    <section className="w-full">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display italic text-4xl font-semibold leading-none">
            Inventions
          </h2>
          <p className="font-hand text-lg text-ink-soft mt-1.5">
            machines I built because I needed them
          </p>
        </div>
        <span className="rubric shrink-0">
          {toRoman(crafts.length)} device{crafts.length === 1 ? "" : "s"}
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {crafts.map((craft, i) => (
          <li key={craft.slug}>
            <CraftCard craft={craft} index={i} />
          </li>
        ))}

        <li>
          <a
            href="https://github.com/tructn"
            target="_blank"
            rel="noopener noreferrer"
            className="folio-hover flex flex-col items-center justify-center gap-2 text-center p-6 h-full min-h-[14rem] rounded-[3px] border border-dashed border-[var(--ink-line)]"
            style={{ rotate: "0.3deg" }}
          >
            <svg viewBox="0 0 60 60" width="56" height="56" aria-hidden="true" className="turn">
              <path
                d={gearPath(30, 30, 24, 12, 5)}
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <circle cx="30" cy="30" r="7" fill="none" stroke="var(--sanguine)" strokeWidth="1.2" />
            </svg>
            <span className="font-display italic text-2xl font-semibold">
              On the drawing board…
            </span>
            <span className="font-hand text-lg text-ink-soft">
              follow along on GitHub →
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
