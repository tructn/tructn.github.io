import Link from "next/link";

/* What LaTeX prints for a \ref it cannot resolve */
export default function NotFound() {
  return (
    <section className="py-10 text-center">
      <p className="text-6xl font-bold mb-3">[??]</p>
      <h1 className="paper-title">Page not found</h1>
      <p className="mt-4 italic text-ink-soft">
        Nothing here.
      </p>
      <p className="mt-8">
        <Link href="/" className="btn btn-solid">
          Back home
        </Link>
      </p>
    </section>
  );
}
