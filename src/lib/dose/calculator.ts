import { ICRP102_K_FACTORS, AgeGroup, Region } from "./icrp-tables";
import { interpolateFFactor } from "./aapm-tables";
import { calculateDRLCompliance } from "./drl-tables";

const ANNUAL_BACKGROUND_MSV = 2.7;
const CHEST_XRAY_MSV = 0.02;

export interface DoseInput {
  dlp: number;
  region: Region;
  ageGroup: AgeGroup;
  ctdiVol?: number;
  effectiveDiameter?: number;
  phantom?: "body" | "head";
}

export interface DoseResult {
  effectiveDose: number;
  ssde?: number;
  drlCompliance?: {
    compliancePercent: number;
    exceeded: boolean;
    referenceDLP: number;
  };
  chestXrayEquivalent: number;
  backgroundPercent: number;
  plainEnglish: string;
}

export function calculateEffectiveDose(dlp: number, region: Region, ageGroup: AgeGroup): number {
  const row = ICRP102_K_FACTORS.find((r) => r.region === region);
  if (!row) throw new Error(`Unknown region: ${region}`);
  const k = row.values[ageGroup];
  return dlp * k;
}

export function calculateSSDE(ctdiVol: number, effectiveDiameter: number, phantom: "body" | "head" = "body"): number {
  const f = interpolateFFactor(effectiveDiameter, phantom);
  return ctdiVol * f;
}

export function calculateDose(input: DoseInput): DoseResult {
  const effectiveDose = calculateEffectiveDose(input.dlp, input.region, input.ageGroup);

  let ssde: number | undefined;
  if (input.ctdiVol !== undefined && input.effectiveDiameter !== undefined) {
    ssde = calculateSSDE(input.ctdiVol, input.effectiveDiameter, input.phantom);
  }

  const drlInfo = calculateDRLCompliance(input.dlp, input.region);
  const drlCompliance = drlInfo
    ? {
        compliancePercent: drlInfo.compliancePercent,
        exceeded: drlInfo.exceeded,
        referenceDLP: drlInfo.drl.dlp,
      }
    : undefined;

  const chestXrayEquivalent = Math.round(effectiveDose / CHEST_XRAY_MSV);
  const backgroundPercent = Math.round((effectiveDose / ANNUAL_BACKGROUND_MSV) * 100);

  const parts: string[] = [
    `Effective dose: ${effectiveDose.toFixed(2)} mSv`,
    chestXrayEquivalent > 1
      ? `equivalent to ${chestXrayEquivalent} chest X-rays`
      : "less than a single chest X-ray",
    `${backgroundPercent}% of annual background radiation (${ANNUAL_BACKGROUND_MSV} mSv/yr)`,
  ];

  if (ssde !== undefined) {
    parts.push(`SSDE: ${ssde.toFixed(2)} mGy`);
  }

  if (drlCompliance) {
    if (drlCompliance.exceeded) {
      parts.push(`EXCEEDS DRL by ${(drlCompliance.compliancePercent - 100).toFixed(0)}% — review warranted`);
    } else {
      parts.push(`Within DRL (${drlCompliance.compliancePercent.toFixed(0)}% of reference)`);
    }
  }

  return {
    effectiveDose,
    ssde,
    drlCompliance,
    chestXrayEquivalent,
    backgroundPercent,
    plainEnglish: parts.join(". "),
  };
}
