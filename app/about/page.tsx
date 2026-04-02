export const metadata = {
  title: "About me",
  description: "Learn more about TN.",
};

const facts = [
  { emoji: "☕", text: "powered by coffee (and mild panic)" },
  { emoji: "🐛", text: "it works on my machine™" },
  { emoji: "🌏", text: "vietnamese living in the uk" },
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

export default function Page() {
  return (
    <section className="w-full mt-4 sm:mt-8 antialiased">
      {/* Intro */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          ola, it&apos;s me again 👀
        </h1>
        <p className="text-black/70 text-lg leading-relaxed max-w-xl">
          i&apos;m Truc. i write code, break things, fix them (sometimes), and
          occasionally write about it here. this blog is basically my second
          brain — except less organised and more chaotic.
        </p>
      </div>

      {/* Fun facts */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">
          fun facts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {facts.map((fact) => (
            <div
              key={fact.text}
              className="flex items-center gap-3 border border-black/10 rounded-xl px-4 py-3 bg-white hover:border-black/30 transition-colors duration-200"
            >
              <span className="text-2xl">{fact.emoji}</span>
              <span className="text-sm text-black/70">{fact.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40 mb-4">
          things i work with
        </h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1 rounded-full border border-black text-sm font-medium bg-black text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-black/10 pt-8">
        <p className="text-black/60 text-sm">
          wanna chat? found something useful here? or just bored?{" "}
          <a
            href="https://github.com/tructn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-black font-medium hover:opacity-70 transition-opacity"
          >
            find me on github
          </a>{" "}
          👋
        </p>
      </div>
    </section>
  );
}
