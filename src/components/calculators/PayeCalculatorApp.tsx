"use client";

import { useMemo, useState } from "react";
import { calculatePaye, FilingStatus } from "@/lib/calculators/paye";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ToggleField } from "@/components/ui/ToggleField";
import { StatementPanel, LedgerRow } from "@/components/calculators/StatementPanel";
import { CalculatorDisclaimer } from "@/components/calculators/CalculatorDisclaimer";
import { MethodologyNote } from "@/components/calculators/MethodologyNote";
import { Card } from "@/components/ui/Card";
import { formatEUR, formatPercent } from "@/lib/utils/format";
import { INCOME_TAX, PRSI, USC } from "@/lib/constants/taxYear2026";

const FILING_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: "single", label: "Single / Widowed" },
  { value: "marriedOneIncome", label: "Married, one income" },
  { value: "marriedTwoIncomes", label: "Married, two incomes" },
];

export function PayeCalculatorApp() {
  const [grossSalary, setGrossSalary] = useState(50_000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [partnerGrossSalary, setPartnerGrossSalary] = useState(0);
  const [pensionContribution, setPensionContribution] = useState(0);
  const [isSelfEmployed, setIsSelfEmployed] = useState(false);
  const [hasMedicalCardOr70, setHasMedicalCardOr70] = useState(false);

  const result = useMemo(
    () =>
      calculatePaye({
        grossSalary,
        filingStatus,
        partnerGrossSalary,
        pensionContribution,
        isSelfEmployed,
        hasFullMedicalCardOrOver70: hasMedicalCardOr70,
      }),
    [grossSalary, filingStatus, partnerGrossSalary, pensionContribution, isSelfEmployed, hasMedicalCardOr70]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* Inputs */}
      <Card>
        <h2 className="font-display text-xl text-ink">Your details</h2>
        <div className="mt-6 space-y-5">
          <NumberField
            id="grossSalary"
            label="Gross annual salary"
            value={grossSalary}
            onChange={setGrossSalary}
            prefix="€"
            min={0}
            step={500}
          />
          <SelectField
            id="filingStatus"
            label="Filing status"
            value={filingStatus}
            onChange={(v) => setFilingStatus(v as FilingStatus)}
            options={FILING_OPTIONS}
          />
          {filingStatus === "marriedTwoIncomes" && (
            <NumberField
              id="partnerSalary"
              label="Partner's gross annual salary"
              value={partnerGrossSalary}
              onChange={setPartnerGrossSalary}
              prefix="€"
              min={0}
              step={500}
              hint="Used to work out how much of the standard rate band can transfer."
            />
          )}
          <NumberField
            id="pension"
            label="Annual pension contribution"
            value={pensionContribution}
            onChange={setPensionContribution}
            prefix="€"
            min={0}
            step={100}
            hint="Reduces the income subject to Income Tax (simplified — real relief is capped by age-related earnings limits)."
          />
          <div className="space-y-3">
            <ToggleField
              id="selfEmployed"
              label="I'm self-employed"
              checked={isSelfEmployed}
              onChange={setIsSelfEmployed}
              hint="Uses the Earned Income Credit and Class S PRSI instead of PAYE credit and Class A."
            />
            <ToggleField
              id="medicalCard"
              label="I hold a full medical card, or I'm 70+"
              checked={hasMedicalCardOr70}
              onChange={setHasMedicalCardOr70}
              hint="Caps USC at 2% where income is €60,000 or less."
            />
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <StatementPanel
          title="Estimated results"
          headlineLabel="Take-home pay / year"
          headlineValue={formatEUR(result.netAnnualPay)}
          headlineTone="gold"
          footnote={
            <span>
              That&apos;s approximately {formatEUR(result.netMonthlyPay)} per
              month or {formatEUR(result.netWeeklyPay)} per week, after Income
              Tax, USC and PRSI.
            </span>
          }
        >
          <LedgerRow label="Gross salary" value={result.grossSalary} />
          <LedgerRow label="Income Tax" value={result.incomeTaxAfterCredits} isDeduction />
          <LedgerRow label="USC" value={result.usc} isDeduction />
          <LedgerRow label="PRSI" value={result.prsi} isDeduction />
          <LedgerRow label="Net take-home pay" value={result.netAnnualPay} isTotal />

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Effective tax rate</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {formatPercent(result.effectiveTaxRate)}
              </p>
            </div>
            <div className="rounded-lg bg-paper-dim px-4 py-3">
              <p className="text-xs text-slate">Marginal tax rate</p>
              <p className="font-mono-figure mt-0.5 text-lg text-ink">
                {formatPercent(result.marginalTaxRate)}
              </p>
            </div>
          </div>
        </StatementPanel>

        <MethodologyNote>
          <p>
            <strong className="text-ink">Income Tax:</strong> the first{" "}
            {formatEUR(
              filingStatus === "single"
                ? INCOME_TAX.standardBand.single
                : filingStatus === "marriedOneIncome"
                ? INCOME_TAX.standardBand.marriedOneIncome
                : INCOME_TAX.standardBand.marriedOneIncome
            )}{" "}
            (or more, if the standard band transfers between two incomes) is
            taxed at {formatPercent(INCOME_TAX.standardRate)}, with the
            remainder at {formatPercent(INCOME_TAX.higherRate)}. Your{" "}
            {isSelfEmployed ? "Earned Income Credit" : "Personal and PAYE tax credits"}{" "}
            are then subtracted directly from the tax bill.
          </p>
          {result.incomeTaxBandBreakdown.map((line) => (
            <p key={line.label} className="pl-4 text-xs text-slate/80">
              {line.label}: {formatEUR(line.amount)}
            </p>
          ))}
          <p>
            <strong className="text-ink">USC:</strong> charged on gross
            income in bands from {formatPercent(USC.bands[0].rate)} to{" "}
            {formatPercent(USC.bands[3].rate)}, with no exemption for
            pension contributions. Income of {formatEUR(USC.exemptThreshold)}{" "}
            or less is fully exempt.
          </p>
          <p>
            <strong className="text-ink">PRSI:</strong> Class A employees pay{" "}
            {formatPercent(PRSI.employeeRateJanToSep)} on all earnings above{" "}
            {formatEUR(PRSI.weeklyExemptionThreshold)}/week, rising to{" "}
            {formatPercent(PRSI.employeeRateFromOct)} from 1 October 2026.
            This calculator uses the January–September rate as an annual
            estimate.
          </p>
        </MethodologyNote>

        <CalculatorDisclaimer />
      </div>
    </div>
  );
}
