"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Screenshot } from "app/apps";

/* A row of captioned screenshots that scrolls sideways, as on a store page.
   Clicking one opens it full size; arrows, swipes and ←/→ step through. */
export function Gallery({ shots }: { shots: Screenshot[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const count = shots.length;
  const open = index !== null;

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (by: number) => setIndex((i) => (i === null ? i : (i + by + count) % count)),
    [count],
  );

  function onScroll() {
    let rail = railRef.current;
    if (!rail) return;
    setEdges({
      start: rail.scrollLeft < 8,
      end: rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8,
    });
  }

  function scrollBy(dir: number) {
    let rail = railRef.current;
    let slide = rail?.querySelector<HTMLElement>(".slide");
    if (!rail || !slide) return;
    rail.scrollBy({ left: dir * (slide.offsetWidth + 16), behavior: "smooth" });
  }

  useEffect(onScroll, []);

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

  let shot = index === null ? null : shots[index];

  return (
    <div>
      {count > 1 && (
        <div className="wrap flex justify-end gap-2 mb-3">
          <button
            className="icon-btn"
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            aria-label="Previous screenshots"
          >
            ←
          </button>
          <button
            className="icon-btn"
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            aria-label="More screenshots"
          >
            →
          </button>
        </div>
      )}

      <div ref={railRef} className="carousel" onScroll={onScroll}>
        {shots.map((s, i) => (
          <div key={s.src} className="slide">
            {/* A link to the file, so it still opens without JavaScript */}
            <a
              href={s.src}
              className="slide-card banner"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                triggerRef.current = e.currentTarget;
                setIndex(i);
              }}
            >
              <p className="text-lg sm:text-xl font-bold tracking-tight text-balance">
                {s.title}
              </p>
              {s.subtitle && (
                <p className="muted mt-1 text-sm text-balance">{s.subtitle}</p>
              )}
              <img
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                loading={i < 2 ? "eager" : "lazy"}
                className="window-shot mt-auto pt-3"
              />
            </a>
          </div>
        ))}
      </div>

      {shot &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={shot.title}
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
              className="icon-btn absolute top-4 right-4"
              aria-label="Close"
            >
              ✕
            </button>

            {/* key restarts the fade for each screenshot */}
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              className="spotlight-plate max-w-full max-h-[78vh] w-auto h-auto object-contain"
            />

            <div className="flex items-center gap-4 text-white">
              {count > 1 && (
                <button onClick={() => step(-1)} className="icon-btn" aria-label="Previous">
                  ←
                </button>
              )}
              <div className="text-center">
                <p className="font-semibold">{shot.title}</p>
                <p className="text-sm text-white/60 tabular-nums">
                  {index! + 1} of {count}
                </p>
              </div>
              {count > 1 && (
                <button onClick={() => step(1)} className="icon-btn" aria-label="Next">
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
