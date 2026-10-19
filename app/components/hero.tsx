import Link from "next/link";

// The volume counts years since the first post went up in 2026
const FIRST_YEAR = 2026;

/** Running head, as at the top of every page of a journal */
export function Hero() {
  const year = new Date().getFullYear();
  const volume = year - FIRST_YEAR + 1;
  return (
    <header className="running-head mb-3">
      <Link href="/" className="hover:text-[var(--ink)] focus-visible:text-[var(--ink)] outline-none">
        Truc&apos;s Notes
      </Link>
      <span className="shrink-0 lining">
        Vol. {volume} ({year})
      </span>
    </header>
  );
}
