import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-2">Page not found</h1>
      <p className="mt-4 text-soft">This page has moved, or never existed.</p>
      <p className="mt-8">
        <Link href="/" className="get">
          See all apps
        </Link>
      </p>
    </section>
  );
}
