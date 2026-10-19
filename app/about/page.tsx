export const metadata = {
  title: "About me",
  description: "Learn more about TN.",
};

const facts = [
  "Powered by coffee (and mild panic).",
  "It works on my machine™.",
  "Writes notes so future me doesn't suffer.",
  "Loves photography, terrible at it.",
  "Still googles basic stuff after years of coding.",
];

const stack: [string, string][] = [
  ["Languages", "C#, TypeScript, SQL, Go (learning… slowly)"],
  ["Frameworks", ".NET, React, Next.js, Angular"],
  ["Runtimes & tooling", "Node.js, Docker"],
];

export default function Page() {
  return (
    <section className="w-full">
      <h1 className="paper-title">About</h1>

      <div className="mt-8 flex flex-col sm:flex-row gap-5 sm:items-start">
        {/* The boxed portrait at the end of a journal paper */}
        <div
          aria-hidden="true"
          className="figure-frame shrink-0 w-24 h-28 flex items-center justify-center text-3xl italic text-ink-soft bg-[var(--wash)]"
        >
          TN
        </div>
        <p className="text-justify hyphens-auto leading-relaxed">
          Hi, I&apos;m <b>Truc</b>. I write code, break things, fix them
          (sometimes), and occasionally write about it here. This blog is my
          second brain, just less organised.
        </p>
      </div>

      <h2 className="section-heading">
        <span className="num">1</span>Facts
      </h2>
      <ol className="space-y-2">
        {facts.map((fact, i) => (
          <li key={fact}>
            <b className="mr-1.5">Fact {i + 1}.</b>
            <i>{fact}</i>
          </li>
        ))}
      </ol>

      <h2 className="section-heading">
        <span className="num">2</span>Stack
      </h2>
      <figure>
        <figcaption className="caption mb-2 text-center">
          <b>Table 1:</b>Tools I use.
        </figcaption>
        <table className="booktabs !table !max-w-none !whitespace-normal">
          <thead>
            <tr>
              <th>Category</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            {stack.map(([category, items]) => (
              <tr key={category}>
                <td className="italic">{category}</td>
                <td>{items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <h2 className="section-heading">
        <span className="num">3</span>Contact
      </h2>
      <p>
        Say hi on{" "}
        <a
          href="https://github.com/tructn"
          target="_blank"
          rel="noopener noreferrer"
          className="ref"
        >
          github.com/tructn
        </a>
        .
      </p>
    </section>
  );
}
