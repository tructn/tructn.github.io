"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBox } from "app/components/search-box";

const navItems = [
  { path: "/", name: "Notebooks" },
  { path: "/crafts", name: "Inventions" },
  { path: "/about", name: "The Author" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[var(--ink-hair)] pb-3">
      <ul className="flex flex-row flex-wrap gap-x-6 gap-y-1 flex-1">
        {navItems.map(({ path, name }) => {
          const isActive =
            path === "/"
              ? pathname === "/" || pathname.startsWith("/blog")
              : pathname.startsWith(path);
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                className="tab"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <SearchBox />
    </nav>
  );
}
