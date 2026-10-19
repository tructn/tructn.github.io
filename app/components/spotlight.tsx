"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Plate = { src: string; alt: string; caption: string };

/* Opens any <a data-spotlight> inside it as a full-screen gallery of every
   such link in the group. The links still point at the full-size image, so
   without JavaScript (or with ⌘/ctrl-click) they open the file as before. */
export function Spotlight({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [plates, setPlates] = useState<Plate[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const open = index !== null;
  const count = plates.length;

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (by: number) => setIndex((i) => (i === null ? i : (i + by + count) % count)),
    [count],
  );

  function onClick(e: React.MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    let link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-spotlight]");
    if (!link || !groupRef.current) return;
    e.preventDefault();

    let links = Array.from(
      groupRef.current.querySelectorAll<HTMLAnchorElement>("a[data-spotlight]"),
    );
    setPlates(
      links.map((a) => ({
        src: a.href,
        alt: a.querySelector("img")?.alt ?? "",
        caption: a.dataset.spotlight ?? "",
      })),
    );
    triggerRef.current = link;
    setIndex(links.indexOf(link));
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    let overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, step]);

  let plate = index === null ? null : plates[index];

  return (
    <div ref={groupRef} onClick={onClick}>
      {children}

      {plate &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={plate.caption || plate.alt}
            className="spotlight fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 sm:p-10"
            onClick={(e) => e.target === e.currentTarget && close()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              let dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <button
              ref={closeRef}
              onClick={close}
              className="btn absolute top-4 right-4"
              aria-label="Close"
            >
              Close ✕
            </button>

            {/* key restarts the fade for each plate */}
            <img
              key={plate.src}
              src={plate.src}
              alt={plate.alt}
              className="spotlight-plate max-w-full max-h-[78vh] w-auto h-auto object-contain"
            />

            <div className="flex items-center gap-4 text-white">
              {count > 1 && (
                <button onClick={() => step(-1)} className="btn" aria-label="Previous">
                  ←
                </button>
              )}
              <p className="caption text-white text-center">
                {count > 1 && (
                  <b className="lining">
                    Figure {index! + 1} of {count}:
                  </b>
                )}
                {plate.caption}
              </p>
              {count > 1 && (
                <button onClick={() => step(1)} className="btn" aria-label="Next">
                  →
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
