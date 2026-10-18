import { CraftCard } from "app/components/craft";
import { getCrafts } from "app/crafts/utils";

export const metadata = {
  title: "Crafts",
  description: "Things I've built along the way.",
};

// Projects live in app/crafts/projects/<slug>.json, see the README there
export default function Page() {
  const crafts = getCrafts();

  return (
    <section className="w-full">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-none">
            Crafts
          </h2>
          <p className="font-hand text-lg text-ink-soft mt-1">
            things I built because I needed them
          </p>
        </div>
        <span className="sticker shrink-0" style={{ background: "var(--mint-soft)" }}>
          🛠️ {crafts.length} project{crafts.length === 1 ? "" : "s"}
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
            className="toon-hover flex flex-col items-center justify-center gap-2 text-center p-6 h-full min-h-[14rem] rounded-[18px] border-[3px] border-dashed border-[#1f1a2e]"
            style={{ rotate: "0.6deg" }}
          >
            <span className="text-4xl bob" aria-hidden="true">
              🚧
            </span>
            <span className="font-display text-xl font-extrabold">
              Next quest loading…
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
