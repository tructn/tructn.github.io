import Link from "next/link";
import { getApps } from "app/apps";

const DOC_LABELS = { privacy: "Privacy Policy", support: "Support" } as const;

export default function Footer() {
  let apps = getApps();

  return (
    <footer className="site-footer mt-24">
      <div className="wrap py-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2">
          {apps.map((app) => (
            <li key={app.slug} className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href={app.href} className="font-medium text-soft hover:underline">
                {app.name}
              </Link>
              {app.docs.map((kind) => (
                <Link key={kind} href={`${app.href}${kind}/`} className="hover:underline">
                  {DOC_LABELS[kind]}
                </Link>
              ))}
            </li>
          ))}
        </ul>
        <p className="tabular-nums">© {new Date().getFullYear()} Truc Nguyen</p>
      </div>
    </footer>
  );
}
