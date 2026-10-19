import { FaGithub, FaRss } from "react-icons/fa";

/* Set like the footnote block at the foot of a paper's first page */
export default function Footer() {
  return (
    <footer className="mt-16 text-[0.85rem] leading-snug text-ink-soft">
      <div className="footnote-rule mb-2" />
      <p>
        <sup className="mr-1">*</sup>
        © Truc Nguyen,{" "}
        <span className="lining">{new Date().getFullYear()}</span>.
      </p>
      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
        <span>
          <sup className="mr-1">†</sup>
          <a
            className="ref inline-flex items-center gap-1"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/tructn"
          >
            <FaGithub size={12} aria-hidden="true" />
            github.com/tructn
          </a>
        </span>
        <span>
          <sup className="mr-1">‡</sup>
          <a className="ref inline-flex items-center gap-1" href="/rss">
            <FaRss size={11} aria-hidden="true" />
            RSS feed
          </a>
        </span>
      </p>
    </footer>
  );
}
