const numerals: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

/* 2026 → "MMXXVI"; folio and figure numbers are written the old way */
export function toRoman(n: number): string {
  let out = "";
  for (let [value, glyph] of numerals) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}
