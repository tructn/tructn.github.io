import Link from "next/link";

const INK = "var(--ink)";

function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="drift">
        <path
          d="M10 30 Q0 30 2 21 Q4 12 15 14 Q19 2 33 5 Q45 0 50 12 Q62 10 63 21 Q64 30 54 30 Z"
          fill="#fff"
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/** Hand-drawn landscape: the road winds off toward a flag marked "?" */
function Scene() {
  return (
    <svg
      viewBox="0 0 720 190"
      className="block w-full h-auto"
      role="img"
      aria-label="A cartoon traveller walking a winding road toward a far-off flag marked with a question mark"
    >
      {/* Sun */}
      <g className="bob" style={{ transformOrigin: "640px 46px" }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={640 + Math.cos(a) * 34}
              y1={46 + Math.sin(a) * 34}
              x2={640 + Math.cos(a) * 44}
              y2={46 + Math.sin(a) * 44}
              stroke={INK}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="640" cy="46" r="25" fill="var(--sun)" stroke={INK} strokeWidth="3" />
        <circle cx="632" cy="43" r="2.6" fill={INK} />
        <circle cx="648" cy="43" r="2.6" fill={INK} />
        <path d="M631 52 Q640 59 649 52" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <Cloud x={70} y={14} scale={0.9} />
      <Cloud x={430} y={30} scale={0.7} />

      {/* Back hills */}
      <path
        d="M-10 120 Q90 62 200 104 Q300 140 380 92 Q470 40 560 92 Q640 136 730 96 L730 200 L-10 200 Z"
        fill="var(--mint-soft)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Front hills */}
      <path
        d="M-10 160 Q120 112 250 146 Q360 172 470 132 Q590 92 730 140 L730 200 L-10 200 Z"
        fill="var(--mint)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Winding road: ink outline, sandy fill, dashed centre line */}
      {[
        { stroke: INK, width: 30, dash: undefined },
        { stroke: "var(--peach-soft)", width: 24, dash: undefined },
        { stroke: INK, width: 2.5, dash: "8 9" },
      ].map((layer, i) => (
        <path
          key={i}
          d="M40 205 Q120 170 230 172 Q360 176 400 140 Q430 112 520 108"
          fill="none"
          stroke={layer.stroke}
          strokeWidth={layer.width}
          strokeDasharray={layer.dash}
          strokeLinecap={layer.dash ? "round" : "butt"}
        />
      ))}

      {/* Little trees */}
      {[
        { x: 120, y: 136, c: "var(--mint)" },
        { x: 318, y: 120, c: "var(--lilac)" },
        { x: 600, y: 112, c: "var(--mint)" },
      ].map((t) => (
        <g key={t.x} transform={`translate(${t.x} ${t.y})`}>
          <line x1="0" y1="0" x2="0" y2="16" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="-6" r="12" fill={t.c} stroke={INK} strokeWidth="3" />
        </g>
      ))}

      {/* Destination flag, deliberately a mystery */}
      <g transform="translate(526 70)">
        <line x1="0" y1="0" x2="0" y2="40" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M0 2 L28 9 L0 18 Z" fill="var(--coral)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <text x="9" y="14.5" fontSize="10" fontWeight="800" fill="#fff" fontFamily="sans-serif">
          ?
        </text>
      </g>

      {/* The traveller */}
      <g transform="translate(226 140)">
        <g className="bob">
          {/* backpack */}
          <rect x="-20" y="-6" width="12" height="18" rx="4" fill="var(--sky)" stroke={INK} strokeWidth="2.5" />
          {/* body */}
          <ellipse cx="0" cy="4" rx="15" ry="17" fill="var(--sun)" stroke={INK} strokeWidth="3" />
          {/* eyes + smile */}
          <circle cx="4" cy="0" r="2.4" fill={INK} />
          <circle cx="11" cy="0" r="2.4" fill={INK} />
          <path d="M4 8 Q8 12 12 8" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          {/* hat */}
          <path d="M-12 -9 Q0 -24 13 -9 Z" fill="var(--coral)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          {/* legs */}
          <path d="M-5 20 L-8 28 M5 20 L9 27" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* Signpost */}
      <g transform="translate(60 120)">
        <line x1="0" y1="-6" x2="0" y2="40" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path
          d="M-4 -14 L52 -14 L62 -4 L52 6 L-4 6 Z"
          fill="#fff"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="2" y="0" fontSize="11" fill={INK} style={{ fontFamily: "var(--font-hand), cursive" }}>
          this way-ish
        </text>
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <header className="toon overflow-hidden mb-6" style={{ background: "var(--sky-soft)" }}>
      <div className="px-5 pt-5 sm:px-7 sm:pt-6">
        <p className="font-hand text-base sm:text-lg text-ink-soft -rotate-1 mb-1">
          code, life &amp; whatever I wandered into today
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
          <Link href="/" className="wiggle inline-block outline-none focus-visible:underline">
            Side Quests
          </Link>
        </h1>
      </div>
      <Scene />
    </header>
  );
}
