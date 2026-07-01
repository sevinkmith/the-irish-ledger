"use client";

import { useMemo, useState } from "react";
import { calculateMortgageAffordability, BuyerType } from "@/lib/calculators/mortgage";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { StatementPanel, LedgerRow } from "@/components/calculators/StatementPanel";
import { CalculatorDisclaimer } from "@/components/calculators/CalculatorDisclaimer";
import { MethodologyNote } from "@/components/calculators/MethodologyNote";
import { Card } from "@/components/ui/Card";
import { formatEUR, formatPercent } from "@/lib/utils/format";
import { MORTGAGE_RULES } from "@/lib/constants/taxYear2026";

const BUYER_OPTIONS: { value: BuyerType; label: string }[] = [
  { value: "firstTimeBuyer", label: "First-time buyer" },
  { value: "secondAndSubsequentBuyer", label: "Second-time / subsequent buyer" },
];

export function MortgageCalculatorApp() {
  const [buyerType, setBuyerType] = useState<BuyerType>("firstTimeBuyer");
  const [salary, setSalary] = useState(55_000);
  const [partnerSalary, setPartnerSalary] = useState(45_000);
  const [savings, setSavings] = useState(40_000);
  const [monthlyCommitments, setMonthlyCommitments] = useState(200);
  const [interestRatePct, setInterestRatePct] = useState(3.7);
  const [termYears, setTermYears] = useState(30);

  const result = useMemo(
    () =>
      calculateMortgageAffordability({
        buyerType,
        salary,
        partnerSalary,
        savings,
        monthlyCommitments,
        interestRate: interestRatePct / 100,
        termYears,
      }),
    [buyerType, salary, partnerSalary, savings, monthlyCommitments, interestRatePct, termYears]
  );

  const ltiLabel =
    buyerType === "firstTimeBuyer"
      ? MORTGAGE_RULES.loanToIncome.firstTimeBuyer
      : MORTGAGE_RULES.loanToIncome.secondAndSubsequentBuyer;
  const ltvLabel =
    buyerType === "firstTimeBuyer"
      ? MORTGAGE_RULES.loanToValue.firstTimeBuyer
      : MORTGAGE_RULES.loanToValue.secondAndSubsequentBuyer;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* Inputs */}
      <Card>
        <h2 className="font-display text-xl text-ink">Your situation</h2>
        <div className="mt-6 space-y-5">
          <SelectField
            id="buyerType"
            label="Buyer type"
            value={buyerType}
            onChange={(v) => setBuyerType(v as BuyerType)}
            options={BUYER_OPTIONS}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="salary"
              label="Your gross annual salary"
              value={salary}
              onChange={setSalary}
              prefix="€"
              min={0}
            />
            <NumberField
              id="partnerSalary"
              label="Partner's gross salary"
              value={partnerSalary}
              onChange={setPartnerSalary}
              prefix="€"
              min={0}
              hint="Leave at 0 if applying alone."
            />
          </div>
          <NumberField
            id="savings"
            label="Savings available for deposit"
            value={savings}
            onChange={setSavings}
            prefix="€"
            min={0}
          />
          <NumberField
            id="monthlyCommitments"
            label="Existing monthly commitments"
            value={monthlyCommitments}
            onChange={setMonthlyCommitments}
            prefix="€"
            min={0}
            hint="Car loans, personal loans, and other regular credit repayments."
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="rate"
              label="Interest rate"
              value={interestRatePct}
              onChange={setInterestRatePct}
              suffix="%"
              min={0}
              step={0.1}
            />
            <NumberField
              id="term"
              label="Mortgage term"
              value={termYears}
              onChange={setTermYears}
              suffix="years"
              min={1}
              max={35}
            />
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <StatementPanel
          title="Estimated results"
          headlineLabel="Maximum property price"
          headlineValue={formatEUR(result.maxPropertyPrice)}
          headlineTone="gold"
          footnote={
            <span>
              Limited by your{" "}
              {result.limitingFactor === "income" ? "loan-to-income cap" : "deposit"}.
              Estimated monthly repayment: {formatEUR(result.monthlyRepayment)}.
            </span>
          }
        >
          <LedgerRow label="Maximum loan amount" value={result.maxLoan} isTotal />
          <LedgerRow label="Deposit required" value={result.depositRequired} />
          <LedgerRow label="Your available savings" value={savings} />
          {result.depositShortfall > 0 && (
            <LedgerRow label="Deposit shortfall" value={result.depositShortfall} isDeduction />
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Loan-to-income</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {result.loanToIncomeRatio.toFixed(2)}x
              </p>
            </div>
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Loan-to-value</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {formatPercent(result.loanToValueRatio, 0)}
              </p>
            </div>
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Monthly repayment</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {formatEUR(result.monthlyRepayment)}
              </p>
            </div>
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Stress-tested (+1%)</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {formatEUR(result.stressTestedMonthlyRepayment)}
              </p>
            </div>
          </div>
        </StatementPanel>

        <MethodologyNote title="Assumptions used">
          <p>
            <strong className="text-ink">Loan-to-income (LTI):</strong> Central
            Bank rules cap borrowing at {ltiLabel}x combined gross income for{" "}
            {buyerType === "firstTimeBuyer" ? "first-time buyers" : "second-time and subsequent buyers"}.
          </p>
          <p>
            <strong className="text-ink">Loan-to-value (LTV):</strong> the
            maximum loan is {formatPercent(ltvLabel, 0)} of the property
            price, meaning a minimum deposit of{" "}
            {formatPercent(1 - ltvLabel, 0)}.
          </p>
          <p>
            <strong className="text-ink">Monthly repayment:</strong>{" "}
            calculated as a standard repayment (capital &amp; interest)
            mortgage at your chosen rate over your chosen term.
          </p>
          <p>
            <strong className="text-ink">Stamp duty (not shown above):</strong>{" "}
            budget roughly {formatEUR(result.estimatedStampDuty)} at 1% of the
            property price, plus legal fees — these are not included in the
            maximum property price shown.
          </p>
          <p>
            Lenders can grant a limited number of exceptions above these
            limits each year — this calculator shows the standard limits
            only, not exception cases.
          </p>
        </MethodologyNote>

        <CalculatorDisclaimer />
      </div>
    </div>
  );
}
