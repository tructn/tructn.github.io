export const metadata = {
  title: "About me",
  description: "Learn more about TN.",
};

const facts = [
  { emoji: "☕", text: "powered by coffee (and mild panic)" },
  { emoji: "🐛", text: "it works on my machine™" },
  { emoji: "📝", text: "writes notes so future-me doesn't suffer" },
  { emoji: "📷", text: "loves photography, terrible at it" },
  { emoji: "🤷", text: "still googling basic stuff after years of coding" },
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

const factColors = [
  "var(--sun-soft)",
  "var(--sky-soft)",
  "var(--mint-soft)",
  "var(--coral-soft)",
  "var(--lilac-soft)",
];

export default function Page() {
  return (
    <section className="w-full">
      <div className="toon p-6 sm:p-7 mb-10 flex flex-col sm:flex-row gap-5 sm:items-center">
        <span
          aria-hidden="true"
          className="wiggle shrink-0 w-20 h-20 rounded-full border-[3px] border-[#1f1a2e] grid place-items-center text-4xl"
          style={{ background: "var(--sun)", boxShadow: "3px 3px 0 var(--ink)" }}
        >
          🧑‍💻
        </span>
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-none mb-2">
            Hi, I&apos;m Truc!
          </h2>
          <p className="text-[17px] text-ink-soft leading-relaxed">
            I write code, break things, fix them (sometimes), and occasionally
            write about it here. This blog is basically my second brain, except
            less organised and more chaotic. I&apos;m not sure where the road
            ends, and that&apos;s kind of the point.
          </p>
        </div>
      </div>

      {/* Fun facts */}
      <div className="mb-10">
        <h3 className="font-display text-2xl font-extrabold mb-4">
          Fun facts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact, i) => (
            <div
              key={fact.text}
              className="toon toon-hover flex items-center gap-3 px-4 py-3"
              style={{
                background: factColors[i % factColors.length],
                rotate: i % 2 ? "0.6deg" : "-0.6deg",
              }}
            >
              <span className="text-3xl" aria-hidden="true">
                {fact.emoji}
              </span>
              <span className="font-hand text-lg leading-snug">
                {fact.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-10">
        <h3 className="font-display text-2xl font-extrabold mb-4">
          Things in my backpack
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {stack.map((item, i) => (
            <span
              key={item}
              className="sticker text-sm"
              style={{ background: factColors[i % factColors.length] }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t-[3px] border-dashed border-[#1f1a2e4d] pt-6 flex flex-wrap items-center gap-4">
        <p className="font-hand text-xl text-ink-soft">
          wanna chat? found something useful? or just bored?
        </p>
        <a
          href="https://github.com/tructn"
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-filled toon-hover font-display"
        >
          👋 Find me on GitHub
        </a>
      </div>
    </section>
  );
}
