"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const trim = (path: string) => path.replace(/\/+$/, "");

export function AppTabs({ tabs }: { tabs: { href: string; label: string }[] }) {
  // trailingSlash is on, but don't rely on usePathname keeping it
  const pathname = trim(usePathname());

  return (
    <ul className="flex gap-1">
      {tabs.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="tab"
            aria-current={trim(href) === pathname ? "page" : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
