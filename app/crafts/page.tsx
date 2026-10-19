import { CraftCard } from "app/components/craft";
import { getCrafts } from "app/crafts/utils";

export const metadata = {
  title: "Software",
  description: "Things I've built along the way.",
};

// Projects live in app/crafts/projects/<slug>.json, see the README there
export default function Page() {
  const crafts = getCrafts();

  return (
    <section className="w-full">
      <h1 className="paper-title">Software</h1>
      <p className="paper-affil mt-2">
        Things I built because I needed them. All open source.
      </p>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {crafts.map((craft, i) => (
          <li key={craft.slug}>
            <CraftCard craft={craft} index={i} />
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[0.92rem] italic text-ink-soft">
        More on{" "}
        <a
          href="https://github.com/tructn"
          target="_blank"
          rel="noopener noreferrer"
          className="ref not-italic"
        >
          github.com/tructn
        </a>
        .
      </p>
    </section>
  );
}
