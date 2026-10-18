import { toRoman } from "app/components/roman";

export const metadata = {
  title: "About me",
  description: "Learn more about TN.",
};

const facts = [
  "powered by coffee (and mild panic)",
  "it works on my machine™",
  "writes notes so future-me doesn't suffer",
  "loves photography, terrible at it",
  "still googling basic stuff after years of coding",
];

const stack = [
  "C#",
  ".NET",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "SQL",
  "Docker",
  "Go (learning... slowly)",
];

export default function Page() {
  return (
    <section className="w-full">
      <div className="folio p-6 sm:p-8 mb-12 flex flex-col sm:flex-row gap-6 sm:items-center">
        {/* Monogram in a ruled roundel, like a maker's mark */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="shrink-0 w-24 h-24"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--ink-faint)" strokeWidth="0.6" />
          <path d="M50 4 V96 M4 50 H96" stroke="var(--ink-hair)" strokeWidth="0.6" />
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontSize="34"
            fill="var(--sanguine)"
            style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontWeight: 600 }}
          >
            TN
          </text>
        </svg>
        <div>
          <h2 className="font-display italic text-4xl font-semibold leading-none mb-3">
            Hi, I&apos;m Truc!
          </h2>
          <p className="text-[1.1rem] text-ink-soft leading-relaxed">
            I write code, break things, fix them (sometimes), and occasionally
            write about it here. This blog is basically my second brain, except
            less organised and more chaotic. I&apos;m not sure where the road
            ends, and that&apos;s kind of the point.
          </p>
        </div>
      </div>

      {/* Fun facts */}
      <div className="mb-12">
        <h3 className="font-display italic text-3xl font-semibold mb-5">
          Observations on the author
        </h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {facts.map((fact, i) => (
            <li
              key={fact}
              className="flex items-baseline gap-3 border-b border-[var(--ink-hair)] pb-2"
            >
              <span className="font-display italic font-semibold text-sanguine w-8 shrink-0 text-right">
                {toRoman(i + 1)}.
              </span>
              <span className="font-hand text-lg leading-snug">{fact}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Stack */}
      <div className="mb-12">
        <h3 className="font-display italic text-3xl font-semibold mb-5">
          Instruments of the workshop
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {stack.map((item) => (
            <span key={item} className="rubric text-[0.95rem]">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <p className="ornament mb-6 text-lg" aria-hidden="true">
        ❦
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <p className="font-hand text-xl text-ink-soft">
          wanna chat? found something useful? or just bored?
        </p>
        <a
          href="https://github.com/tructn"
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-filled"
        >
          Find me on GitHub
        </a>
      </div>
    </section>
  );
}
