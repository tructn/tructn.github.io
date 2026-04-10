import React from "react";

const variants = [
  {
    color: "#fde68a",
    angle: "104deg",
    height: "45%",
    offset: "65%",
    end: "3%",
    strokeWidth: 3,
  },
  {
    color: "#86efac",
    angle: "98deg",
    height: "40%",
    offset: "70%",
    end: "5%",
    strokeWidth: 2.5,
  },
  {
    color: "#93c5fd",
    angle: "108deg",
    height: "52%",
    offset: "60%",
    end: "2%",
    strokeWidth: 3.5,
  },
  {
    color: "#f9a8d4",
    angle: "101deg",
    height: "42%",
    offset: "68%",
    end: "4%",
    strokeWidth: 2,
  },
  {
    color: "#fdba74",
    angle: "106deg",
    height: "48%",
    offset: "62%",
    end: "3%",
    strokeWidth: 4,
  },
];

// Wobbly hand-drawn underline paths in a 100×10 viewBox
const underlinePaths = [
  "M 0 6 Q 15 3, 35 6 Q 55 9, 75 5 Q 90 3, 100 6",
  "M 0 5 Q 20 2, 45 7 Q 70 10, 90 4 Q 96 2, 100 5",
  "M 0 7 Q 25 3, 50 6 Q 75 9, 100 5",
  "M 0 4 Q 30 8, 55 4 Q 78 1, 100 6",
  "M 0 6 Q 10 2, 30 7 Q 55 10, 80 4 Q 92 1, 100 5",
];

function pickVariant(text: string) {
  const hash = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return {
    variant: variants[hash % variants.length],
    pathIndex: hash % underlinePaths.length,
  };
}

interface MarkerProps {
  children: string;
  /** Override automatic variant selection (0–4). */
  variant?: number;
  /** "underline" (default) → wobbly SVG stroke; "highlight" → slanted background strip. */
  type?: "underline" | "highlight";
}

export function Marker({ children, variant, type = "underline" }: MarkerProps) {
  const idx = variant !== undefined ? variant % variants.length : undefined;
  const { variant: v, pathIndex } =
    idx !== undefined
      ? { variant: variants[idx], pathIndex: idx % underlinePaths.length }
      : pickVariant(children);

  if (type === "highlight") {
    return (
      <span
        className="marker"
        style={
          {
            "--marker-color": v.color,
            "--marker-angle": v.angle,
            "--marker-height": v.height,
            "--marker-offset": v.offset,
            "--marker-end": v.end,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    );
  }

  // type === "underline" — inline SVG wobbly stroke
  return (
    <span
      style={{ position: "relative", display: "inline", whiteSpace: "nowrap" }}
    >
      {children}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          bottom: "-4px",
          width: "100%",
          height: "10px",
          overflow: "visible",
          pointerEvents: "none",
        }}
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <path
          d={underlinePaths[pathIndex]}
          fill="none"
          stroke={v.color}
          strokeWidth={v.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
