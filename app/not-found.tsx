import Link from "next/link";

export default function NotFound() {
  return (
    <section className="folio px-8 py-10 text-center">
      <p className="font-display italic text-7xl font-semibold text-sanguine mb-1">
        CDIV
      </p>
      <h1 className="font-display italic text-4xl font-semibold mb-2">
        A leaf torn from the codex
      </h1>
      <p className="font-hand text-xl text-ink-soft mb-7">
        Whatever was written here is lost, like so many of the master&apos;s pages.
      </p>
      <Link href="/" className="pill pill-filled">
        Back to the notebooks
      </Link>
    </section>
  );
}
