import Link from "next/link";

export default function NotFound() {
  return (
    <section className="toon p-8 text-center" style={{ background: "var(--peach-soft)" }}>
      <p className="text-6xl mb-3 bob inline-block" aria-hidden="true">
        🧭
      </p>
      <h1 className="font-display text-4xl font-extrabold mb-2">
        404: Took a wrong turn
      </h1>
      <p className="font-hand text-xl text-ink-soft mb-6">
        This road doesn&apos;t go anywhere. Scenic, though.
      </p>
      <Link href="/" className="pill pill-filled toon-hover font-display">
        🥾 Back to the trail
      </Link>
    </section>
  );
}
