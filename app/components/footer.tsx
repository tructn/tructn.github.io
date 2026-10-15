import { FaGithub, FaRss } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 mb-12">
      <div
        className="toon flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4"
        style={{ background: "var(--lilac-soft)" }}
      >
        <p className="font-hand text-lg leading-snug">
          It&apos;s about the journey, not the destination.
          <span className="block text-base text-ink-soft">
            © {new Date().getFullYear()} Truc Nguyen · still walking
          </span>
        </p>
        <div className="flex gap-2.5">
          <a
            className="pill toon-hover font-display text-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/tructn"
          >
            <FaGithub size={15} aria-hidden="true" />
            GitHub
          </a>
          <a className="pill toon-hover font-display text-sm" href="/rss">
            <FaRss size={13} aria-hidden="true" />
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
