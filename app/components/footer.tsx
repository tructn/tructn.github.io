import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-black md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-black"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/tructn"
          >
            <FaGithub size={14} />
            <p className="ml-2 h-7">Github</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-black">
        © {new Date().getFullYear()} Truc Nguyen. All rights reserved.
      </p>
    </footer>
  );
}
