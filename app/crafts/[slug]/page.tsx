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
      <CraftDetail craft={craft} />

      {others.length > 0 && (
        <div className="mt-6">
          <h2 className="section-heading">More</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
            {others.map((other, i) => (
              <li key={other.slug}>
                <CraftCard
                  craft={other}
                  index={i + 1}
                  // Numbering runs on from the hero and screenshots above
                  figure={craft.shots.length + 2 + i}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-10">
        <Link href="/crafts" className="ref">
          ← All software
        </Link>
      </p>
    </section>
  );
}
