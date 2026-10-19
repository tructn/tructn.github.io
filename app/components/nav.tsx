"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBox } from "app/components/search-box";

const navItems = [
  { path: "/", name: "Articles" },
  { path: "/crafts", name: "Software" },
  { path: "/about", name: "Author" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
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
