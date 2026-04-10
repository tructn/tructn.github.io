import Image from "next/image";
import { Marker } from "app/components/marker";

export const metadata = {
  title: "Things I Built",
  description: "A showcase of things I've built.",
};

const projects = [
  {
    name: "tructn.github.io",
    description: "This blog — my personal notes, built with Next.js and MDX.",
    tags: ["Next.js", "TypeScript", "MDX"],
    url: "https://github.com/tructn/tructn.github.io",
    thumbnail: "/thumbnails/blog.png",
  },
];

export default function Page() {
  return (
    <section className="w-full mt-4 sm:mt-8 antialiased">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          Things I Built 🛠️
        </h1>
        <p className="text-black/70 text-lg leading-relaxed max-w-xl">
          Things I&apos;ve <Marker>built</Marker>, <Marker>shipped</Marker>, or
          tinkered with. Some <Marker>finished</Marker>, some eternal
          works-in-progress.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col border border-black/10 rounded-xl overflow-hidden bg-white hover:border-black/30 transition-colors duration-200"
          >
            <div className="relative w-full h-44 bg-black/5">
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-black group-hover:underline underline-offset-4">
                  {project.name}
                </span>
                <span className="text-black/30 text-xs">↗</span>
              </div>
              <p className="text-sm text-black/60 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full border border-black/20 text-xs text-black/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
