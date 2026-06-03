export interface AAPM204Entry {
  effectiveDiameter: number;
  fFactor32: number;
  fFactor16: number;
}

export const AAPM204_F_FACTORS: AAPM204Entry[] = [
  { effectiveDiameter: 8, fFactor32: 4.82, fFactor16: 0.98 },
  { effectiveDiameter: 9, fFactor32: 3.91, fFactor16: 0.96 },
  { effectiveDiameter: 10, fFactor32: 3.22, fFactor16: 0.93 },
  { effectiveDiameter: 11, fFactor32: 2.68, fFactor16: 0.89 },
  { effectiveDiameter: 12, fFactor32: 2.25, fFactor16: 0.86 },
  { effectiveDiameter: 13, fFactor32: 1.92, fFactor16: 0.82 },
  { effectiveDiameter: 14, fFactor32: 1.65, fFactor16: 0.78 },
  { effectiveDiameter: 15, fFactor32: 1.43, fFactor16: 0.74 },
  { effectiveDiameter: 16, fFactor32: 1.25, fFactor16: 0.70 },
  { effectiveDiameter: 17, fFactor32: 1.11, fFactor16: 0.66 },
  { effectiveDiameter: 18, fFactor32: 0.99, fFactor16: 0.63 },
  { effectiveDiameter: 19, fFactor32: 0.89, fFactor16: 0.59 },
  { effectiveDiameter: 20, fFactor32: 0.81, fFactor16: 0.56 },
  { effectiveDiameter: 21, fFactor32: 0.74, fFactor16: 0.53 },
  { effectiveDiameter: 22, fFactor32: 0.68, fFactor16: 0.50 },
  { effectiveDiameter: 23, fFactor32: 0.63, fFactor16: 0.47 },
  { effectiveDiameter: 24, fFactor32: 0.58, fFactor16: 0.45 },
  { effectiveDiameter: 25, fFactor32: 0.54, fFactor16: 0.42 },
  { effectiveDiameter: 26, fFactor32: 0.51, fFactor16: 0.40 },
  { effectiveDiameter: 27, fFactor32: 0.47, fFactor16: 0.38 },
  { effectiveDiameter: 28, fFactor32: 0.45, fFactor16: 0.36 },
  { effectiveDiameter: 29, fFactor32: 0.42, fFactor16: 0.34 },
  { effectiveDiameter: 30, fFactor32: 0.40, fFactor16: 0.33 },
  { effectiveDiameter: 31, fFactor32: 0.38, fFactor16: 0.31 },
  { effectiveDiameter: 32, fFactor32: 0.36, fFactor16: 0.30 },
  { effectiveDiameter: 33, fFactor32: 0.35, fFactor16: 0.29 },
  { effectiveDiameter: 34, fFactor32: 0.33, fFactor16: 0.27 },
  { effectiveDiameter: 35, fFactor32: 0.32, fFactor16: 0.26 },
  { effectiveDiameter: 36, fFactor32: 0.31, fFactor16: 0.25 },
  { effectiveDiameter: 37, fFactor32: 0.30, fFactor16: 0.24 },
  { effectiveDiameter: 38, fFactor32: 0.29, fFactor16: 0.23 },
  { effectiveDiameter: 39, fFactor32: 0.28, fFactor16: 0.23 },
  { effectiveDiameter: 40, fFactor32: 0.27, fFactor16: 0.22 },
];

export function interpolateFFactor(
  diameter: number,
  phantom: "body" | "head" = "body"
): number {
  const table = AAPM204_F_FACTORS;
  const field = phantom === "body" ? "fFactor32" : "fFactor16";

  if (diameter <= table[0].effectiveDiameter) return table[0][field];
  if (diameter >= table[table.length - 1].effectiveDiameter)
    return table[table.length - 1][field];

  for (let i = 0; i < table.length - 1; i++) {
    const low = table[i];
    const high = table[i + 1];
    if (diameter >= low.effectiveDiameter && diameter <= high.effectiveDiameter) {
      const t =
        (diameter - low.effectiveDiameter) /
        (high.effectiveDiameter - low.effectiveDiameter);
      return low[field] + t * (high[field] - low[field]);
    }
  }
  return table[table.length - 1][field];
}
