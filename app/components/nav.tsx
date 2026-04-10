"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const underlinePaths = [
  "M 0 6 Q 15 3, 35 6 Q 55 9, 75 5 Q 90 3, 100 6",
  "M 0 5 Q 20 2, 45 7 Q 70 10, 90 4 Q 96 2, 100 5",
  "M 0 7 Q 25 3, 50 6 Q 75 9, 100 5",
];

const navItems = [
  { path: "/", name: "Home", color: "#fde68a", strokeWidth: 3, pathIdx: 0 },
  {
    path: "/builds",
    name: "Things I Built",
    color: "#86efac",
    strokeWidth: 2.5,
    pathIdx: 1,
  },
  {
    path: "/about",
    name: "About Me",
    color: "#93c5fd",
    strokeWidth: 3.5,
    pathIdx: 2,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {navItems.map(({ path, name, color, strokeWidth, pathIdx }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className="group flex align-middle relative py-1 px-3 m-1 text-black focus-visible:outline-black focus-visible:outline-2"
                >
                  {name}
                  <svg
                    aria-hidden="true"
                    className={`absolute left-3 right-3 bottom-0 w-[calc(100%-1.5rem)] h-[10px] transition-opacity duration-200 overflow-visible pointer-events-none ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <path
                      d={underlinePaths[pathIdx]}
                      fill="none"
                      stroke={color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
