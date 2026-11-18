import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp, themeStyle } from "app/apps";
import { AppTabs } from "./tabs";

const DOC_LABELS = { privacy: "Privacy", support: "Support" } as const;

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let app = getApp(slug);
  if (!app) notFound();

  let tabs = [
    { href: app.href, label: "Overview" },
    ...app.docs.map((kind) => ({ href: `${app.href}${kind}/`, label: DOC_LABELS[kind] })),
  ];

  return (
    <div style={themeStyle(app)}>
      {app.docs.length > 0 && (
        <div className="border-b border-[var(--hair)]">
          <div className="wrap flex h-12 items-center gap-3">
            <Link href={app.href} className="flex items-center gap-2 mr-auto font-semibold">
              <img src={app.icon} alt="" width={24} height={24} className="size-6" />
              {app.name}
            </Link>
            <AppTabs tabs={tabs} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
