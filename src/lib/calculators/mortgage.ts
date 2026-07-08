import { MORTGAGE_RULES } from "@/lib/constants/taxYear2026";

export type BuyerType = "firstTimeBuyer" | "secondAndSubsequentBuyer";

export interface MortgageInput {
  buyerType: BuyerType;
  /** Gross annual salary of the main applicant */
  salary: number;
  /** Gross annual salary of a partner/co-applicant, 0 if none */
  partnerSalary: number;
  /** Cash savings available to put toward a deposit */
  savings: number;
  /** Existing monthly loan/credit commitments (car loans, other debt) */
  monthlyCommitments: number;
  /** Annual mortgage interest rate as a decimal, e.g. 0.037 for 3.7% */
  interestRate: number;
  /** Mortgage term in years */
  termYears: number;
}

export interface MortgageResult {
  combinedGrossIncome: number;
  maxLoanByIncome: number;
  maxLoanByDeposit: number;
  maxLoan: number;
  limitingFactor: "income" | "deposit";
  maxPropertyPrice: number;
  depositRequired: number;
  depositShortfall: number;
  loanToIncomeRatio: number;
  loanToValueRatio: number;
  monthlyRepayment: number;
  /** Repayment recalculated at rate + 1%, the kind of stress buffer lenders
   * and the Central Bank consider when assessing resilience to rate rises. */
  stressTestedMonthlyRepayment: number;
  totalMonthlyOutgoings: number;
  estimatedStampDuty: number;
  ltiCapApplied: number;
  ltvCapApplied: number;
}

/** Standard mortgage amortisation formula (repayment mortgage) */
function calculateMonthlyRepayment(
  loanAmount: number,
  annualRate: number,
  termYears: number
): number {
  if (loanAmount <= 0) return 0;
  const monthlyRate = annualRate / 12;
  const numPayments = termYears * 12;
  if (monthlyRate === 0) return loanAmount / numPayments;
  const factor = Math.pow(1 + monthlyRate, numPayments);
  return (loanAmount * monthlyRate * factor) / (factor - 1);
}

function estimateStampDuty(propertyPrice: number): number {
  const { standardRate, standardRateCeiling, midRate, midRateCeiling, higherRate } =
    MORTGAGE_RULES.stampDuty;

  const atStandard = Math.min(propertyPrice, standardRateCeiling);
  const atMid = Math.min(
    Math.max(propertyPrice - standardRateCeiling, 0),
    midRateCeiling - standardRateCeiling
  );
  const atHigher = Math.max(propertyPrice - midRateCeiling, 0);

  return atStandard * standardRate + atMid * midRate + atHigher * higherRate;
}
export function calculateMortgageAffordability(input: MortgageInput): MortgageResult {
  const salary = Math.max(input.salary, 0);
  const partnerSalary = Math.max(input.partnerSalary, 0);
  const savings = Math.max(input.savings, 0);
  const monthlyCommitments = Math.max(input.monthlyCommitments, 0);
  const interestRate = Math.max(input.interestRate, 0);
  const termYears = Math.max(input.termYears, 1);

  const combinedGrossIncome = salary + partnerSalary;

  const ltiCapApplied =
    input.buyerType === "firstTimeBuyer"
      ? MORTGAGE_RULES.loanToIncome.firstTimeBuyer
      : MORTGAGE_RULES.loanToIncome.secondAndSubsequentBuyer;

  const ltvCapApplied =
    input.buyerType === "firstTimeBuyer"
      ? MORTGAGE_RULES.loanToValue.firstTimeBuyer
      : MORTGAGE_RULES.loanToValue.secondAndSubsequentBuyer;

  // Rule 1: Loan-to-income cap
  const maxLoanByIncome = combinedGrossIncome * ltiCapApplied;

  // Rule 2: Loan-to-value cap — with `savings` as the deposit, the maximum
  // loan the deposit can support is derived from: deposit = price * (1-LTV)
  // so price = savings / (1 - LTV), and loan = price - savings.
  const maxPropertyPriceByDeposit = savings / (1 - ltvCapApplied);
  const maxLoanByDeposit = maxPropertyPriceByDeposit - savings;

  const maxLoan = Math.min(maxLoanByIncome, Math.max(maxLoanByDeposit, 0));
  const limitingFactor: "income" | "deposit" =
    maxLoanByIncome <= maxLoanByDeposit ? "income" : "deposit";

  // Once we know the capped loan, the property price it supports is bounded
  // by both the deposit-implied price and what the loan+savings can cover.
  const maxPropertyPrice = Math.min(
    maxPropertyPriceByDeposit,
    maxLoan / ltvCapApplied
  );

  const depositRequired = maxPropertyPrice * (1 - ltvCapApplied);
  const depositShortfall = Math.max(depositRequired - savings, 0);

  const loanToIncomeRatio = combinedGrossIncome > 0 ? maxLoan / combinedGrossIncome : 0;
  const loanToValueRatio = maxPropertyPrice > 0 ? maxLoan / maxPropertyPrice : 0;

  const monthlyRepayment = calculateMonthlyRepayment(maxLoan, interestRate, termYears);
  const stressTestedMonthlyRepayment = calculateMonthlyRepayment(
    maxLoan,
    interestRate + 0.01,
    termYears
  );

  return {
    combinedGrossIncome,
    maxLoanByIncome,
    maxLoanByDeposit: Math.max(maxLoanByDeposit, 0),
    maxLoan,
    limitingFactor,
    maxPropertyPrice: Math.max(maxPropertyPrice, 0),
    depositRequired: Math.max(depositRequired, 0),
    depositShortfall,
    loanToIncomeRatio,
    loanToValueRatio,
    monthlyRepayment,
    stressTestedMonthlyRepayment,
    totalMonthlyOutgoings: monthlyRepayment + monthlyCommitments,
    estimatedStampDuty: estimateStampDuty(Math.max(maxPropertyPrice, 0)),
    ltiCapApplied,
    ltvCapApplied,
  };
}
