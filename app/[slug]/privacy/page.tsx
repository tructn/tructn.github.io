import { DocPage, docMetadata, docParams } from "app/components/doc-page";

export async function generateStaticParams() {
  return docParams("privacy");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return docMetadata(slug, "privacy");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <DocPage slug={slug} kind="privacy" />;
}
