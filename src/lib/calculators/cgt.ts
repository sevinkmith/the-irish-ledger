import { CGT } from "@/lib/constants/taxYear2026";

export type AssetType = "property" | "shares" | "crypto";

export interface CgtInput {
  assetType: AssetType;
  purchasePrice: number;
  salePrice: number;
  purchaseDate: string; // ISO date string, yyyy-mm-dd
  saleDate: string; // ISO date string, yyyy-mm-dd
  improvementCosts: number;
  sellingCosts: number;
  lossesCarriedForward: number;
  /** Whether the property was the seller's Principal Private Residence for
   * some or all of the ownership period — flagged for the user, not
   * calculated automatically, since PPR relief apportionment is complex. */
  wasPrincipalPrivateResidence?: boolean;
}

export interface CgtResult {
  grossGainOrLoss: number;
  allowableDeductions: number;
  netGainOrLoss: number;
  isLoss: boolean;
  lossesApplied: number;
  gainAfterLosses: number;
  annualExemptionApplied: number;
  taxableGain: number;
  cgtDue: number;
  holdingPeriodYears: number;
  effectiveRateOnGain: number;
}

export function calculateCgt(input: CgtInput): CgtResult {
  const purchasePrice = Math.max(input.purchasePrice, 0);
  const salePrice = Math.max(input.salePrice, 0);
  const improvementCosts = Math.max(input.improvementCosts, 0);
  const sellingCosts = Math.max(input.sellingCosts, 0);
  const lossesCarriedForward = Math.max(input.lossesCarriedForward, 0);

  const grossGainOrLoss = salePrice - purchasePrice;
  const allowableDeductions = improvementCosts + sellingCosts;
  const netGainOrLoss = grossGainOrLoss - allowableDeductions;

  const isLoss = netGainOrLoss <= 0;

  const grossGainBeforeLosses = Math.max(netGainOrLoss, 0);
  const lossesApplied = Math.min(lossesCarriedForward, grossGainBeforeLosses);
  const gainAfterLosses = Math.max(grossGainBeforeLosses - lossesApplied, 0);

  const annualExemptionApplied = Math.min(gainAfterLosses, CGT.annualExemption);
  const taxableGain = Math.max(gainAfterLosses - annualExemptionApplied, 0);

  const cgtDue = taxableGain * CGT.standardRate;

  const purchase = new Date(input.purchaseDate);
  const sale = new Date(input.saleDate);
  const holdingPeriodYears =
    isFinite(purchase.getTime()) && isFinite(sale.getTime())
      ? Math.max(
          (sale.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
          0
        )
      : 0;

  return {
    grossGainOrLoss,
    allowableDeductions,
    netGainOrLoss,
    isLoss,
    lossesApplied,
    gainAfterLosses,
    annualExemptionApplied,
    taxableGain,
    cgtDue,
    holdingPeriodYears,
    effectiveRateOnGain: netGainOrLoss > 0 ? cgtDue / netGainOrLoss : 0,
  };
}
