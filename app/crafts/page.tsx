import Image from "next/image";
import { FaGithub, FaDownload } from "react-icons/fa";

export const metadata = {
  title: "Crafts",
  description: "Things I've built along the way.",
};

// Screenshots are 1600×1071 WebP, resized from the originals in tructn/kui/docs
const SHOT_W = 1600;
const SHOT_H = 1071;

const kui = {
  name: "KUI",
  tagline: "A fast, friendly desktop app for Apache Kafka.",
  description:
    "Browse topics, read and produce messages, and see consumer lag at a glance, without a single CLI flag. Built in Rust with Tauri, so it starts fast, needs no JVM or server, and keeps your cluster settings on your machine.",
  repo: "https://github.com/tructn/kui",
  releases: "https://github.com/tructn/kui/releases",
  logo: "/crafts/kui/logo.svg",
  stack: ["Rust", "Tauri", "React", "TypeScript", "Kafka", "librdkafka"],
  hero: {
    src: "/crafts/kui/topics.webp",
    alt: "KUI showing the topics of a Kafka cluster",
  },
  shots: [
    {
      src: "/crafts/kui/messages.webp",
      alt: "Messages of a topic, with partition, offset, timestamp, key and value",
      caption: "Read messages by offset or time, or go Live",
      color: "var(--sky-soft)",
    },
    {
      src: "/crafts/kui/message-value.webp",
      alt: "A message opened in a side panel with formatted JSON",
      caption: "Pretty JSON, then copy or move it to another topic",
      color: "var(--sun-soft)",
    },
    {
      src: "/crafts/kui/topic-consumers.webp",
      alt: "Consumers of a topic with per-partition progress and lag",
      caption: "Spot the stuck consumer in seconds",
      color: "var(--mint-soft)",
    },
    {
      src: "/crafts/kui/topic-lags.webp",
      alt: "A consumer group's lag across partitions, in dark mode",
      caption: "Lag per partition, in dark mode too",
      color: "var(--lilac-soft)",
    },
    {
      src: "/crafts/kui/add-cluster.webp",
      alt: "The Add cluster dialog",
      caption: "PLAINTEXT, SSL and SASL out of the box",
      color: "var(--peach-soft)",
    },
  ],
};

const tilts = ["-1deg", "0.8deg", "-0.5deg", "1deg", "-0.8deg"];

export default function Page() {
  return (
    <section className="w-full">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-extrabold leading-none">
          Crafts
        </h2>
        <p className="font-hand text-lg text-ink-soft mt-1">
          things I built because the road needed them
        </p>
      </div>

      {/* Project card */}
      <article className="toon overflow-hidden mb-10">
        <div className="p-5 sm:p-7" style={{ background: "var(--coral-soft)" }}>
          <div className="flex items-start gap-4">
            <Image
              src={kui.logo}
              alt=""
              width={72}
              height={72}
              className="wiggle shrink-0"
              style={{ filter: "drop-shadow(3px 3px 0 var(--ink))" }}
            />
            <div className="min-w-0">
              <h3 className="font-display text-4xl font-extrabold leading-none">
                {kui.name}
              </h3>
              <p className="font-display text-lg font-semibold mt-1 leading-snug">
                {kui.tagline}
              </p>
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft max-w-prose">
            {kui.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {kui.stack.map((s) => (
              <span key={s} className="sticker" style={{ background: "#fff" }}>
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={kui.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-filled toon-hover font-display"
              style={{ "--pill-color": "var(--sun)" } as React.CSSProperties}
            >
              <FaDownload size={14} aria-hidden="true" />
              Download for macOS &amp; Windows
            </a>
            <a
              href={kui.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="pill toon-hover font-display"
            >
              <FaGithub size={16} aria-hidden="true" />
              View on GitHub
            </a>
          </div>
        </div>

        <a
          href={kui.hero.src}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-t-[3px] border-[#1f1a2e] bg-white"
        >
          <Image
            src={kui.hero.src}
            alt={kui.hero.alt}
            width={SHOT_W}
            height={SHOT_H}
            priority
            className="w-full h-auto"
          />
        </a>
      </article>

      {/* Screenshot "polaroids" */}
      <h3 className="font-display text-2xl font-extrabold mb-1">
        Snapshots from the build
      </h3>
      <p className="font-hand text-lg text-ink-soft mb-6">
        click any one to see it full size
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {kui.shots.map((shot, i) => (
          <a
            key={shot.src}
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            className="toon toon-hover block p-2.5 pb-0"
            style={{ rotate: tilts[i % tilts.length], background: shot.color }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={SHOT_W}
              height={SHOT_H}
              className="w-full h-auto rounded-[10px] border-2 border-[#1f1a2e] bg-white"
            />
            <p className="font-hand text-lg text-center px-2 py-2.5 leading-snug">
              {shot.caption}
            </p>
          </a>
        ))}

        <a
          href={kui.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="toon-hover flex flex-col items-center justify-center gap-2 text-center p-6 min-h-[12rem] rounded-[18px] border-[3px] border-dashed border-[#1f1a2e]"
          style={{ rotate: "0.6deg" }}
        >
          <span className="text-4xl bob" aria-hidden="true">
            🚧
          </span>
          <span className="font-display text-xl font-extrabold">
            More down the road
          </span>
          <span className="font-hand text-lg text-ink-soft">
            topics, brokers, shortcuts &amp; more on GitHub →
          </span>
        </a>
      </div>
    </section>
  );
}
