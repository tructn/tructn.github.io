import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { getApps } from "app/apps";

/* Translucent bar across the top: the store's name, then every app */
export function Navbar() {
  let apps = getApps();

  return (
    <header className="site-header">
      <nav className="wrap flex h-12 items-center gap-5">
        <Link href="/" className="font-semibold tracking-tight mr-auto">
          Truc Nguyen <span className="text-faint font-normal">Apps</span>
        </Link>
        <ul className="flex items-center gap-4">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={app.href}
                className="flex items-center gap-1.5 text-sm text-soft hover:text-[var(--ink)]"
              >
                <img src={app.icon} alt="" width={20} height={20} className="size-5" />
                <span className="hidden sm:inline">{app.name}</span>
                <span className="sr-only sm:hidden">{app.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/tructn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-soft hover:text-[var(--ink)]"
            >
              <FaGithub size={18} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
