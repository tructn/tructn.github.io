import Link from "next/link";
import { toRoman } from "app/components/roman";

const INK = "var(--ink)";
const FAINT = "var(--ink-faint)";
const CHALK = "var(--sanguine)";

// Every stroke is drawn in with the .sketch animation; pathLength=1 lets one
// dasharray work for lines of any length
const pen = (delay: number) => ({
  className: "sketch",
  pathLength: 1,
  style: { "--delay": `${delay}s` } as React.CSSProperties,
});

const ink = (delay: number) => ({
  className: "ink-in",
  style: { "--delay": `${delay}s` } as React.CSSProperties,
});

/* Outline of a toothed wheel, as a closed path */
export function gearPath(cx: number, cy: number, r: number, teeth: number, depth = 6) {
  const step = (Math.PI * 2) / teeth;
  const at = (a: number, radius: number) =>
    `${(cx + Math.cos(a) * radius).toFixed(1)} ${(cy + Math.sin(a) * radius).toFixed(1)}`;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    points.push(
      at(a, r - depth),
      at(a + step * 0.15, r),
      at(a + step * 0.45, r),
      at(a + step * 0.6, r - depth),
    );
  }
  return `M${points.join(" L")} Z`;
}

function Gear({
  cx,
  cy,
  r,
  teeth,
  spokes,
  delay,
  className,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  spokes: number;
  delay: number;
  className: string;
}) {
  return (
    <g className={className}>
      <path d={gearPath(cx, cy, r, teeth)} fill="none" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" {...pen(delay)} />
      <circle cx={cx} cy={cy} r={r - 12} fill="none" stroke={INK} strokeWidth="0.8" {...pen(delay + 0.3)} />
      <circle cx={cx} cy={cy} r={r * 0.22} fill="url(#hatch)" stroke={INK} strokeWidth="1.1" {...pen(delay + 0.5)} />
      {Array.from({ length: spokes }).map((_, i) => {
        const a = (i * Math.PI * 2) / spokes;
        return (
          <line
            key={i}
            x1={(cx + Math.cos(a) * r * 0.22).toFixed(1)}
            y1={(cy + Math.sin(a) * r * 0.22).toFixed(1)}
            x2={(cx + Math.cos(a) * (r - 12)).toFixed(1)}
            y2={(cy + Math.sin(a) * (r - 12)).toFixed(1)}
            stroke={INK}
            strokeWidth="1"
            {...pen(delay + 0.6 + i * 0.05)}
          />
        );
      })}
    </g>
  );
}

/** A notebook sheet: golden spiral, a pair of gears and the circle-and-square */
function Sheet() {
  // Golden rectangle 233 × 144, split into squares of 144, 89, 55, 34, 21, 13
  const squares = [
    "M40 30 H184 V174 H40 Z",
    "M184 30 H273 V119 H184 Z",
    "M218 119 H273 V174 H218 Z",
    "M184 140 H218 V174 H184 Z",
    "M184 119 H205 V140 H184 Z",
  ];
  const spiral =
    "M40 174 A144 144 0 0 1 184 30 A89 89 0 0 1 273 119 A55 55 0 0 1 218 174 A34 34 0 0 1 184 140 A21 21 0 0 1 205 119 A13 13 0 0 1 218 132";

  // Bottom edge of the square, marked off in ten equal parts
  const ticks = Array.from({ length: 11 }, (_, i) => 485 + i * 15);

  return (
    <svg
      viewBox="0 0 720 214"
      className="block w-full h-auto"
      role="img"
      aria-label="Notebook studies in ink and red chalk: a golden spiral, two meshing gears, and a figure's circle and square, with mirror-written notes"
    >
      <defs>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={INK} strokeWidth="0.7" opacity="0.7" />
        </pattern>
      </defs>

      {/* Construction lines running across the sheet */}
      <line x1="10" y1="174" x2="710" y2="174" stroke={FAINT} strokeWidth="0.6" strokeDasharray="3 5" opacity="0.7" {...ink(0)} />
      <line x1="40" y1="174" x2="560" y2="98" stroke={FAINT} strokeWidth="0.6" opacity="0.6" {...pen(1.8)} />

      {/* Fig. I: golden rectangle and spiral */}
      {squares.map((d, i) => (
        <path key={d} d={d} fill="none" stroke={FAINT} strokeWidth="0.8" {...pen(0.1 + i * 0.15)} />
      ))}
      <path d={spiral} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" {...pen(0.6)} />
      <path d="M40 30 L273 174" stroke={FAINT} strokeWidth="0.5" opacity="0.7" {...pen(1.2)} />

      <g {...ink(1.6)} style={{ fontFamily: "var(--font-hand), serif", fontStyle: "italic" }}>
        <text x="40" y="22" fontSize="13" fill={CHALK}>fig. I</text>
        <text x="96" y="110" fontSize="12" fill={INK}>a</text>
        <text x="225" y="78" fontSize="12" fill={INK}>b</text>
        <text x="113" y="196" fontSize="13" fill={INK} textAnchor="middle">a : b  =  (a+b) : a</text>
      </g>
      <path d="M40 186 H273 M40 182 V190 M273 182 V190" stroke={INK} strokeWidth="0.8" fill="none" {...pen(1.4)} />

      {/* Fig. II: gears; tooth counts set the speed ratio of their turning */}
      <g>
        <ellipse cx="392" cy="182" rx="78" ry="6" fill="url(#hatch)" opacity="0.35" {...ink(2)} />
        <Gear cx={370} cy={98} r={42} teeth={14} spokes={6} delay={0.8} className="turn" />
        <Gear cx={414} cy={140} r={24} teeth={8} spokes={4} delay={1.2} className="turn-back" />
        <text x="318" y="22" fontSize="13" fill={CHALK} {...ink(1.8)} style={{ fontFamily: "var(--font-hand), serif", fontStyle: "italic" }}>
          fig. II
        </text>
      </g>

      {/* Fig. III: the circle and the square of a well-proportioned man */}
      <rect x="485" y="30" width="150" height="150" fill="none" stroke={INK} strokeWidth="1.3" {...pen(1)} />
      <circle cx="560" cy="98" r="82" fill="none" stroke={INK} strokeWidth="1.3" {...pen(1.3)} />
      <path d="M485 30 L635 180 M635 30 L485 180 M560 16 V180 M478 105 H642" stroke={FAINT} strokeWidth="0.6" fill="none" {...pen(1.7)} />
      <path d="M560 30 L495 160 H625 Z" fill="none" stroke={CHALK} strokeWidth="1" strokeLinejoin="round" opacity="0.8" {...pen(2.1)} />
      <circle cx="560" cy="98" r="2.4" fill={CHALK} {...ink(2.4)} />
      {ticks.map((x, i) => (
        <line key={x} x1={x} y1="180" x2={x} y2={i % 5 === 0 ? 189 : 185} stroke={INK} strokeWidth="0.8" {...pen(2 + i * 0.04)} />
      ))}
      <g {...ink(2.2)} style={{ fontFamily: "var(--font-hand), serif", fontStyle: "italic" }}>
        <text x="650" y="22" fontSize="13" fill={CHALK} textAnchor="end">fig. III</text>
        <text x="560" y="203" fontSize="12" fill={INK} textAnchor="middle">ad circulum et quadratum</text>
      </g>

      {/* Mirror writing, as Leonardo kept his notes */}
      <g transform="scale(-1 1)" {...ink(2.6)}>
        <text x="-468" y="206" fontSize="11" fill={CHALK} opacity="0.85" style={{ fontFamily: "var(--font-hand), serif", fontStyle: "italic" }}>
          studia la scienza dell&apos;arte
        </text>
      </g>
    </svg>
  );
}

export function Hero() {
  const year = toRoman(new Date().getFullYear());
  return (
    <header className="folio mb-8 px-5 pt-6 pb-3 sm:px-8 sm:pt-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-hand text-base sm:text-lg text-ink-soft mb-1">
            notes on code, life &amp; whatever I wandered into today
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl font-semibold tracking-tight leading-[0.95]">
            <Link href="/" className="outline-none focus-visible:text-[var(--sanguine)]">
              Side Quests
            </Link>
          </h1>
        </div>
        <p className="font-display small-caps text-sanguine text-sm sm:text-base text-right leading-tight shrink-0 pt-1">
          Codex
          <span className="block text-ink-faint">{year}</span>
        </p>
      </div>
      <div className="mt-3 -mx-2 sm:mx-0">
        <Sheet />
      </div>
    </header>
  );
}
