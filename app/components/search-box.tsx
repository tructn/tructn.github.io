"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Fuse, { type FuseResult } from "fuse.js";

type PostIndex = {
  slug: string;
  title: string;
  summary: string;
  tags: string;
  content: string;
};

type Hit = FuseResult<PostIndex>;

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hit[]>([]);
  const [fuse, setFuse] = useState<Fuse<PostIndex> | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load search index once when dialog opens for the first time
  const loadIndex = useCallback(async () => {
    if (fuse) return;
    setLoading(true);
    try {
      const res = await fetch("/search-index");
      const data: PostIndex[] = await res.json();
      setFuse(
        new Fuse(data, {
          keys: [
            { name: "title", weight: 3 },
            { name: "tags", weight: 2 },
            { name: "summary", weight: 2 },
            { name: "content", weight: 1 },
          ],
          threshold: 0.35,
          includeMatches: true,
          minMatchCharLength: 2,
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [fuse]);

  const openSearch = useCallback(() => {
    setOpen(true);
    loadIndex();
  }, [loadIndex]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Run search on every keystroke
  useEffect(() => {
    if (!fuse || !query.trim()) {
      setResults([]);
      return;
    }
    setResults(fuse.search(query, { limit: 8 }));
  }, [query, fuse]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // ⌘K / Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        if (!open) loadIndex();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, loadIndex]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative ml-auto">
      {/* Trigger */}
      <button
        onClick={openSearch}
        aria-label="Search posts (⌘K)"
        className="flex items-center gap-1.5 font-mono text-xs text-black/40 hover:text-black transition-colors border border-black/15 hover:border-black/40 px-2.5 py-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
        <kbd className="hidden sm:inline font-mono text-[9px] bg-black/5 border border-black/10 px-1 rounded">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/20">
          <div
            ref={containerRef}
            className="w-full max-w-xl bg-white border border-black/20 shadow-lg"
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/35 shrink-0"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts…"
                className="flex-1 font-serif text-sm bg-transparent outline-none placeholder:text-black/30"
                aria-label="Search posts"
              />
              {loading && (
                <span className="font-mono text-[10px] text-black/30">
                  Loading…
                </span>
              )}
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-[10px] text-black/30 hover:text-black transition-colors border border-black/10 px-1.5 py-0.5"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto divide-y divide-black/5">
                {results.map(({ item }) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 px-4 py-3 hover:bg-black/[0.03] transition-colors"
                    >
                      <span className="font-serif text-sm font-semibold text-black">
                        {item.title}
                      </span>
                      {item.summary && (
                        <span className="font-serif text-xs italic text-black/50 line-clamp-1">
                          {item.summary}
                        </span>
                      )}
                      {item.tags && (
                        <span className="font-mono text-[10px] text-black/35">
                          {item.tags
                            .split(",")
                            .map((t) => t.trim())
                            .join(" · ")}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Empty state */}
            {query.trim().length >= 2 && results.length === 0 && !loading && (
              <p className="px-4 py-5 font-mono text-xs text-black/35 text-center">
                No posts found for &ldquo;{query}&rdquo;
              </p>
            )}

            {/* Idle state */}
            {query.trim().length === 0 && (
              <p className="px-4 py-4 font-mono text-[10px] text-black/25 text-center">
                Type to search across all posts, tags, and content
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
