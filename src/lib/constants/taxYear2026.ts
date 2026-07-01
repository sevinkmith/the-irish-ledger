/**
 * The Irish Ledger — Tax Year 2026 constants
 *
 * Centralising every rate, band and credit here means updating for a new
 * Budget only requires editing this one file — every calculator and guide
 * page reads from it.
 *
 * Sources (verify against Revenue.ie before relying on these for a real
 * filing — this site is informational only):
 *  - Revenue.ie — Tax Rates, Bands and Reliefs
 *  - Budget 2026 (announced 7 October 2025) summary, Department of Finance
 *  - Citizens Information — USC and PRSI
 *
 * Last checked: June 2026.
 */

export const TAX_YEAR = 2026;
export const RATES_LAST_CHECKED = "June 2026";

/* ------------------------------------------------------------------ */
/*  Income Tax                                                         */
/* ------------------------------------------------------------------ */

export const INCOME_TAX = {
  standardRate: 0.2,
  higherRate: 0.4,
  /** Standard-rate cut-off point (income taxed at 20% up to this amount) */
  standardBand: {
    single: 44_000,
    marriedOneIncome: 53_000,
    /** Combined band for a married couple with two incomes. The uplift from
     * the single band is capped at the lower of this value or the second
     * earner's income, and each individual's own band cannot exceed
     * `marriedTwoIncomesMaxPerPerson`. */
    marriedTwoIncomesMaxCombined: 88_000,
    marriedTwoIncomesUpliftCap: 35_000,
    marriedTwoIncomesMaxPerPerson: 44_000,
  },
  credits: {
    personalSingle: 2_000,
    personalMarried: 4_000,
    payeEmployee: 2_000,
    earnedIncomeSelfEmployed: 2_000,
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Universal Social Charge (USC)                                      */
/* ------------------------------------------------------------------ */

export const USC = {
  /** Below this level of total income, USC does not apply at all. */
  exemptThreshold: 13_000,
  bands: [
    { upTo: 12_012, rate: 0.005 },
    { upTo: 28_700, rate: 0.02 },
    { upTo: 70_044, rate: 0.03 },
    { upTo: Infinity, rate: 0.08 },
  ],
  /** Reduced-rate bands for full medical card holders / age 70+, where
   * total income does not exceed reducedRateIncomeCeiling. Only the 0.5%
   * and 2% rates apply — income above the 2% band ceiling is still charged
   * at 2%, not 3% or 8%. */
  reducedRate: {
    incomeCeiling: 60_000,
    rate: 0.02,
  },
  /** Extra USC charged on self-employed (non-PAYE) income above this level */
  selfEmployedSurcharge: {
    threshold: 100_000,
    rate: 0.03,
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Pay Related Social Insurance (PRSI)                                 */
/* ------------------------------------------------------------------ */

export const PRSI = {
  /** Class A employee rate, effective January – September 2026 */
  employeeRateJanToSep: 0.042,
  /** Employee rate from 1 October 2026 onward */
  employeeRateFromOct: 0.0435,
  /** Employees earning at or below this weekly amount pay no PRSI */
  weeklyExemptionThreshold: 352,
  /** Self-employed (Class S) rate on income above the threshold below */
  selfEmployedRate: 0.04,
  selfEmployedThreshold: 5_000,
  selfEmployedMinimumAnnual: 650,
} as const;

/* ------------------------------------------------------------------ */
/*  Capital Gains Tax (CGT)                                             */
/* ------------------------------------------------------------------ */

export const CGT = {
  standardRate: 0.33,
  /** Annual personal exemption — the first slice of gains in a tax year
   * that is not taxable, per individual. Cannot be transferred between
   * spouses and cannot be carried forward if unused. */
  annualExemption: 1_270,
  /** Revised Entrepreneur Relief: reduced rate on qualifying gains from
   * disposal of a qualifying business, up to a lifetime limit. */
  entrepreneurRelief: {
    rate: 0.1,
    lifetimeLimit: 1_500_000,
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Mortgage / Central Bank of Ireland macroprudential rules            */
/* ------------------------------------------------------------------ */

export const MORTGAGE_RULES = {
  loanToIncome: {
    firstTimeBuyer: 4.0,
    secondAndSubsequentBuyer: 3.5,
  },
  loanToValue: {
    /** Maximum % of the property value that can be borrowed */
    firstTimeBuyer: 0.9,
    secondAndSubsequentBuyer: 0.9,
    buyToLet: 0.7,
  },
  /** Illustrative market rate used as a default in the calculator —
   * update periodically. Actual offers vary by lender and profile. */
  indicativeDefaultRateRange: { min: 0.03, max: 0.06, typical: 0.037 },
  /** Approximate stamp duty on residential property up to €1m */
  stampDuty: {
    standardRate: 0.01,
    higherRateThreshold: 1_000_000,
    higherRate: 0.02,
  },
} as const;
