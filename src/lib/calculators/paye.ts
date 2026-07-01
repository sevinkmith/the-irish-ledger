import { INCOME_TAX, PRSI, USC } from "@/lib/constants/taxYear2026";

export type FilingStatus = "single" | "marriedOneIncome" | "marriedTwoIncomes";

export interface PayeInput {
  /** Gross annual salary in euro */
  grossSalary: number;
  filingStatus: FilingStatus;
  /** Gross annual salary of the second earner, only used for marriedTwoIncomes */
  partnerGrossSalary?: number;
  /** Annual employee pension contribution — reduces income tax base only,
   * a simplification: real relief also depends on age-related earnings caps. */
  pensionContribution?: number;
  isSelfEmployed?: boolean;
  hasFullMedicalCardOrOver70?: boolean;
}

export interface PayeBreakdownLine {
  label: string;
  amount: number;
}

export interface PayeResult {
  grossSalary: number;
  taxableIncomeForTax: number;
  incomeTaxGross: number;
  totalCredits: number;
  incomeTaxAfterCredits: number;
  usc: number;
  prsi: number;
  totalDeductions: number;
  netAnnualPay: number;
  netMonthlyPay: number;
  netWeeklyPay: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  incomeTaxBandBreakdown: PayeBreakdownLine[];
  uscBandBreakdown: PayeBreakdownLine[];
}

/** Returns the standard-rate (20%) band ceiling for a given filing status */
function getStandardBandCeiling(
  status: FilingStatus,
  partnerGrossSalary: number
): number {
  const { standardBand } = INCOME_TAX;
  if (status === "single") return standardBand.single;
  if (status === "marriedOneIncome") return standardBand.marriedOneIncome;

  // marriedTwoIncomes: base band + uplift capped at the lower of the uplift
  // cap or the second earner's income, without exceeding the combined max.
  const uplift = Math.min(
    standardBand.marriedTwoIncomesUpliftCap,
    Math.max(partnerGrossSalary, 0)
  );
  const combined = standardBand.marriedOneIncome + uplift;
  return Math.min(combined, standardBand.marriedTwoIncomesMaxCombined);
}

/** Calculates gross income tax due before credits, for a given taxable income */
function calculateIncomeTax(
  taxableIncome: number,
  bandCeiling: number
): { tax: number; breakdown: PayeBreakdownLine[] } {
  const atStandard = Math.min(taxableIncome, bandCeiling);
  const atHigher = Math.max(taxableIncome - bandCeiling, 0);

  const standardTax = atStandard * INCOME_TAX.standardRate;
  const higherTax = atHigher * INCOME_TAX.higherRate;

  return {
    tax: standardTax + higherTax,
    breakdown: [
      {
        label: `First ${Math.round(atStandard).toLocaleString("en-IE")} @ 20%`,
        amount: standardTax,
      },
      {
        label: `Balance ${Math.round(atHigher).toLocaleString("en-IE")} @ 40%`,
        amount: higherTax,
      },
    ],
  };
}

/** Calculates USC due, applying the reduced-rate concession where relevant */
function calculateUSC(
  grossIncome: number,
  hasFullMedicalCardOrOver70: boolean
): { usc: number; breakdown: PayeBreakdownLine[] } {
  if (grossIncome <= USC.exemptThreshold) {
    return { usc: 0, breakdown: [{ label: "Exempt (income ≤ €13,000)", amount: 0 }] };
  }

  // Reduced rate: only the 0.5% and 2% USC rates apply, capped at 2% overall,
  // for medical card holders / age 70+ with income at or below the ceiling.
  const useReducedRate =
    hasFullMedicalCardOrOver70 && grossIncome <= USC.reducedRate.incomeCeiling;

  if (useReducedRate) {
    const band1 = Math.min(grossIncome, USC.bands[0].upTo);
    const remainder = Math.max(grossIncome - USC.bands[0].upTo, 0);
    const usc = band1 * USC.bands[0].rate + remainder * USC.reducedRate.rate;
    return {
      usc,
      breakdown: [
        { label: "First €12,012 @ 0.5%", amount: band1 * USC.bands[0].rate },
        { label: "Balance @ 2% (reduced-rate concession)", amount: remainder * USC.reducedRate.rate },
      ],
    };
  }

  let remaining = grossIncome;
  let lowerBound = 0;
  let usc = 0;
  const breakdown: PayeBreakdownLine[] = [];

  for (const band of USC.bands) {
    const bandWidth = band.upTo - lowerBound;
    const amountInBand = Math.min(Math.max(remaining, 0), bandWidth);
    if (amountInBand > 0) {
      const bandTax = amountInBand * band.rate;
      usc += bandTax;
      breakdown.push({
        label: `€${lowerBound.toLocaleString("en-IE")}–€${
          band.upTo === Infinity ? "∞" : band.upTo.toLocaleString("en-IE")
        } @ ${band.rate * 100}%`,
        amount: bandTax,
      });
    }
    remaining -= amountInBand;
    lowerBound = band.upTo;
    if (remaining <= 0) break;
  }

  return { usc, breakdown };
}

/** Calculates employee (Class A) PRSI due on gross income */
function calculatePRSI(grossIncome: number): number {
  const weeklyEquivalent = grossIncome / 52;
  if (weeklyEquivalent <= PRSI.weeklyExemptionThreshold) return 0;
  // Blended rate: most of 2026 sits at 4.2%, rising to 4.35% from 1 Oct.
  // We use the January–September rate as the headline annual estimate and
  // flag the October change in the UI rather than pro-rating silently.
  return grossIncome * PRSI.employeeRateJanToSep;
}

export function calculatePaye(input: PayeInput): PayeResult {
  const grossSalary = Math.max(input.grossSalary, 0);
  const partnerGrossSalary = Math.max(input.partnerGrossSalary ?? 0, 0);
  const pensionContribution = Math.max(input.pensionContribution ?? 0, 0);

  // Pension contributions reduce the base for income tax only (simplified).
  const taxableIncomeForTax = Math.max(grossSalary - pensionContribution, 0);

  const bandCeiling = getStandardBandCeiling(input.filingStatus, partnerGrossSalary);
  const { tax: incomeTaxGross, breakdown: incomeTaxBandBreakdown } =
    calculateIncomeTax(taxableIncomeForTax, bandCeiling);

  const totalCredits =
    (input.filingStatus === "single"
      ? INCOME_TAX.credits.personalSingle
      : INCOME_TAX.credits.personalMarried) +
    (input.isSelfEmployed
      ? INCOME_TAX.credits.earnedIncomeSelfEmployed
      : INCOME_TAX.credits.payeEmployee);

  const incomeTaxAfterCredits = Math.max(incomeTaxGross - totalCredits, 0);

  // USC and PRSI are charged on gross income (before pension relief for USC
  // in most cases, and PRSI does not benefit from pension relief either).
  const { usc, breakdown: uscBandBreakdown } = calculateUSC(
    grossSalary,
    Boolean(input.hasFullMedicalCardOrOver70)
  );

  const prsi = input.isSelfEmployed
    ? grossSalary > PRSI.selfEmployedThreshold
      ? Math.max(
          (grossSalary - 0) * PRSI.selfEmployedRate,
          PRSI.selfEmployedMinimumAnnual
        )
      : 0
    : calculatePRSI(grossSalary);

  const totalDeductions = incomeTaxAfterCredits + usc + prsi;
  const netAnnualPay = grossSalary - totalDeductions;

  const marginalTaxRate =
    taxableIncomeForTax > bandCeiling
      ? INCOME_TAX.higherRate +
        (grossSalary > USC.bands[2].upTo ? USC.bands[3].rate : USC.bands[2].rate) +
        (grossSalary / 52 > PRSI.weeklyExemptionThreshold
          ? PRSI.employeeRateJanToSep
          : 0)
      : INCOME_TAX.standardRate +
        USC.bands[1].rate +
        (grossSalary / 52 > PRSI.weeklyExemptionThreshold
          ? PRSI.employeeRateJanToSep
          : 0);

  return {
    grossSalary,
    taxableIncomeForTax,
    incomeTaxGross,
    totalCredits,
    incomeTaxAfterCredits,
    usc,
    prsi,
    totalDeductions,
    netAnnualPay,
    netMonthlyPay: netAnnualPay / 12,
    netWeeklyPay: netAnnualPay / 52,
    effectiveTaxRate: grossSalary > 0 ? totalDeductions / grossSalary : 0,
    marginalTaxRate,
    incomeTaxBandBreakdown,
    uscBandBreakdown,
  };
}
