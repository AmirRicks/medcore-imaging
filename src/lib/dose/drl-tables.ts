import { Region } from "./icrp-tables";

export interface DRLReference {
  region: string;
  ctdiVol: number;
  dlp: number;
}

export const EC_RP_185_DRLS: DRLReference[] = [
  { region: "Head (Cerebral)", ctdiVol: 56, dlp: 980 },
  { region: "Head (Facial bones)", ctdiVol: 30, dlp: 500 },
  { region: "Neck", ctdiVol: 20, dlp: 600 },
  { region: "Chest", ctdiVol: 15, dlp: 470 },
  { region: "Abdomen", ctdiVol: 20, dlp: 780 },
  { region: "Pelvis", ctdiVol: 20, dlp: 670 },
  { region: "Chest+Abdomen+Pelvis", ctdiVol: 18, dlp: 1250 },
  { region: "Coronary Angiography", ctdiVol: 65, dlp: 1100 },
];

export function getDRLForRegion(region: string): DRLReference | undefined {
  return EC_RP_185_DRLS.find((d) =>
    d.region.toLowerCase().includes(region.toLowerCase())
  );
}

export function calculateDRLCompliance(
  patientDLP: number,
  region: string
): { drl: DRLReference; compliancePercent: number; exceeded: boolean } | null {
  const drl = getDRLForRegion(region);
  if (!drl) return null;
  const percent = (patientDLP / drl.dlp) * 100;
  return {
    drl,
    compliancePercent: Math.round(percent * 10) / 10,
    exceeded: percent > 100,
  };
}
