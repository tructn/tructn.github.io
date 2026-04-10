"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/crafts", name: "Crafts" },
  { path: "/about", name: "About Me" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-10 border-b border-black/15 pb-2">
      <ul className="flex flex-row gap-0 font-mono text-xs uppercase tracking-widest">
        {navItems.map(({ path, name }) => {
          const isActive = pathname === path;
          return (
            <li key={path}>
              <Link
                href={path}
                className={`inline-block px-3 py-1 mr-1 transition-colors focus-visible:outline-none focus-visible:underline ${
                  isActive
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
