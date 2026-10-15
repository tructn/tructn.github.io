"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchBox } from "app/components/search-box";

const navItems = [
  { path: "/", name: "The Trail", emoji: "🥾", color: "var(--sun)" },
  { path: "/crafts", name: "Crafts", emoji: "🛠️", color: "var(--coral)" },
  { path: "/about", name: "About Me", emoji: "👋", color: "var(--lilac)" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-10 flex flex-wrap items-center gap-3">
      <ul className="flex flex-row flex-wrap gap-2.5 flex-1">
        {navItems.map(({ path, name, emoji, color }) => {
          const isActive =
            path === "/"
              ? pathname === "/" || pathname.startsWith("/blog")
              : pathname.startsWith(path);
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                className="pill toon-hover font-display text-[15px]"
                style={{ "--pill-color": color } as React.CSSProperties}
              >
                <span aria-hidden="true">{emoji}</span>
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
