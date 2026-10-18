import { FaGithub, FaRss } from "react-icons/fa";
import { toRoman } from "app/components/roman";

export default function Footer() {
  return (
    <footer className="mt-20 mb-12">
      <p className="ornament text-lg mb-6" aria-hidden="true">
        ❦
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 px-1">
        <p className="font-hand text-lg leading-snug">
          It&apos;s about the journey, not the destination.
          <span className="block font-display not-italic small-caps text-base text-ink-faint">
            Truc Nguyen · {toRoman(new Date().getFullYear())} · still sketching
          </span>
        </p>
        <div className="flex gap-2.5">
          <a
            className="pill text-sm"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/tructn"
          >
            <FaGithub size={15} aria-hidden="true" />
            GitHub
          </a>
          <a className="pill text-sm" href="/rss">
            <FaRss size={13} aria-hidden="true" />
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
