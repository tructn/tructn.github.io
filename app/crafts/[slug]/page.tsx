import Link from "next/link";
import { notFound } from "next/navigation";
import { CraftCard, CraftDetail } from "app/components/craft";
import { getCrafts } from "app/crafts/utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  return getCrafts().map((craft) => ({ slug: craft.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let craft = getCrafts().find((craft) => craft.slug === slug);
  if (!craft) {
    return;
  }

  let title = `${craft.name}: ${craft.tagline}`;
  let image = `${baseUrl}${craft.hero.src}`;

  return {
    title: craft.name,
    description: craft.description,
    openGraph: {
      title,
      description: craft.description,
      url: `${baseUrl}/crafts/${craft.slug}`,
      images: [{ url: image, width: craft.hero.width, height: craft.hero.height }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: craft.description,
      images: [image],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  let crafts = getCrafts();
  let craft = crafts.find((craft) => craft.slug === slug);

  if (!craft) {
    notFound();
  }

  let others = crafts.filter((c) => c.slug !== craft.slug);

  return (
    <section className="w-full">
      <Link href="/crafts" className="pill text-sm mb-7">
        ← all inventions
      </Link>

      <CraftDetail craft={craft} />

      {others.length > 0 && (
        <div className="mt-14">
          <p className="ornament mb-8 text-lg" aria-hidden="true">
            ❦
          </p>
          <h2 className="font-display italic text-3xl font-semibold mb-1">
            Other inventions
          </h2>
          <p className="font-hand text-lg text-ink-soft mb-6">
            side quests that turned into machines
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {others.map((other, i) => (
              <li key={other.slug}>
                <CraftCard craft={other} index={i + 1} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
