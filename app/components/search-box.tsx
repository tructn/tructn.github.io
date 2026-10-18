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
        className="pill text-[15px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        Search
        <kbd className="hidden sm:inline font-sans text-[10px] not-italic border border-[var(--ink-line)] px-1 rounded-sm leading-tight text-ink-faint">
          ⌘K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-[rgba(46,32,20,0.3)] backdrop-blur-[2px]">
          <div
            ref={containerRef}
            className="folio w-full max-w-xl overflow-hidden"
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--ink-line)]">
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
                className="shrink-0"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Seek among the notebooks…"
                className="flex-1 font-display italic text-xl bg-transparent outline-none placeholder:text-[var(--ink-faint)]"
                aria-label="Search posts"
              />
              {loading && (
                <span className="font-hand text-sm text-ink-soft">
                  sharpening the quill…
                </span>
              )}
              <button
                onClick={() => setOpen(false)}
                className="font-sans text-[10px] border border-[var(--ink-line)] rounded-sm px-1.5 py-0.5 text-ink-faint hover:text-[var(--sanguine)]"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto divide-y divide-[var(--ink-hair)]">
                {results.map(({ item }) => (
                  <li key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-1 px-4 py-3 hover:bg-[var(--paper-deep)] focus-visible:bg-[var(--paper-deep)] outline-none transition-colors"
                    >
                      <span className="font-display text-lg font-semibold leading-snug">
                        {item.title}
                      </span>
                      {item.summary && (
                        <span className="text-sm text-ink-soft line-clamp-1">
                          {item.summary}
                        </span>
                      )}
                      {item.tags && (
                        <span className="font-hand text-sm text-ink-faint">
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
              <p className="px-4 py-6 font-hand text-lg text-ink-soft text-center">
                Nothing yet written on &ldquo;{query}&rdquo;
              </p>
            )}

            {/* Idle state */}
            {query.trim().length === 0 && (
              <p className="px-4 py-5 font-hand text-lg text-ink-soft text-center">
                Search every leaf: titles, tags and words
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
