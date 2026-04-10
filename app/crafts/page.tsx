import Image from "next/image";

export const metadata = {
  title: "Crafts",
  description: "A showcase of things I've built.",
};

const projects = [
  {
    name: "clin HR",
    description:
      "A human resources management system with Next.js, supabase and drizzle-orm.",
    tags: [
      "Next.js",
      "TypeScript",
      "ORM",
      "supabase",
      "PostgreSQL",
      "Startup",
      "Tailwindcss",
      "MUI",
    ],
    url: "https://clinhr.vercel.app",
    thumbnail: "/thumbnails/clinhr.png",
  },
  {
    name: "Racket",
    description:
      "A badminton player group management for amateur players, built with React, Golang and PostgreSQL, Auth0",
    tags: [
      "React",
      "Golang",
      "PostgreSQL",
      "Tailwindcss",
      "Auth0",
      "Experiential Learning",
    ],
    url: "https://github.com/tructn/racket",
    thumbnail: "/thumbnails/racket.png",
  },
];

export default function Page() {
  return (
    <section className="w-full antialiased">
      <div className="border-t-2 border-b border-black/80 py-2 mb-6 flex items-baseline justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-black/50">
          Projects &amp; Implementations
        </span>
        <span className="text-xs font-mono text-black/40">
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col border border-black/15 overflow-hidden hover:border-black/40 transition-colors duration-200"
          >
            <div className="relative w-full h-44 bg-white border-b border-black/10 p-2">
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 px-4 py-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif font-semibold text-black text-sm group-hover:underline underline-offset-2">
                  {project.name}
                </span>
                <span className="font-mono text-[10px] text-black/30 shrink-0">
                  ↗
                </span>
              </div>
              <p className="font-serif text-sm italic text-black/60 leading-relaxed">
                {project.description}
              </p>
              <p className="font-mono text-xs text-black/40 mt-1">
                <span className="font-semibold text-black/50">Stack: </span>
                {project.tags.join(", ")}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
