export type AgeGroup = "0yr" | "1yr" | "5yr" | "10yr" | "15yr" | "adult";
export type Region =
  | "head"
  | "neck"
  | "chest"
  | "abdomen"
  | "pelvis"
  | "abdomen-pelvis"
  | "chest-abdomen";

export const AGE_GROUPS: AgeGroup[] = [
  "0yr",
  "1yr",
  "5yr",
  "10yr",
  "15yr",
  "adult",
];

export const REGIONS: { key: Region; label: string }[] = [
  { key: "head", label: "Head" },
  { key: "neck", label: "Neck" },
  { key: "chest", label: "Chest" },
  { key: "abdomen", label: "Abdomen" },
  { key: "pelvis", label: "Pelvis" },
  { key: "abdomen-pelvis", label: "Abdomen + Pelvis" },
  { key: "chest-abdomen", label: "Chest + Abdomen" },
];

export interface KFactorRow {
  region: Region;
  label: string;
  values: Record<AgeGroup, number>;
}

export const ICRP102_K_FACTORS: KFactorRow[] = [
  { region: "head", label: "Head", values: { "0yr": 0.011, "1yr": 0.0067, "5yr": 0.0040, "10yr": 0.0032, "15yr": 0.0021, adult: 0.0023 } },
  { region: "neck", label: "Neck", values: { "0yr": 0.017, "1yr": 0.012, "5yr": 0.011, "10yr": 0.0079, "15yr": 0.0059, adult: 0.0054 } },
  { region: "chest", label: "Chest", values: { "0yr": 0.039, "1yr": 0.026, "5yr": 0.020, "10yr": 0.018, "15yr": 0.013, adult: 0.017 } },
  { region: "abdomen", label: "Abdomen", values: { "0yr": 0.049, "1yr": 0.030, "5yr": 0.020, "10yr": 0.015, "15yr": 0.013, adult: 0.015 } },
  { region: "pelvis", label: "Pelvis", values: { "0yr": 0.043, "1yr": 0.026, "5yr": 0.019, "10yr": 0.014, "15yr": 0.013, adult: 0.019 } },
  { region: "abdomen-pelvis", label: "Abdomen+Pelvis", values: { "0yr": 0.046, "1yr": 0.028, "5yr": 0.020, "10yr": 0.015, "15yr": 0.013, adult: 0.017 } },
  { region: "chest-abdomen", label: "Chest+Abdomen", values: { "0yr": 0.044, "1yr": 0.028, "5yr": 0.020, "10yr": 0.016, "15yr": 0.013, adult: 0.016 } },
];
