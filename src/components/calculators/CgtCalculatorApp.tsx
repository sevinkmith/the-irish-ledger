"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { calculateCgt, AssetType } from "@/lib/calculators/cgt";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { DateField } from "@/components/ui/DateField";
import { ToggleField } from "@/components/ui/ToggleField";
import { StatementPanel, LedgerRow } from "@/components/calculators/StatementPanel";
import { CalculatorDisclaimer } from "@/components/calculators/CalculatorDisclaimer";
import { MethodologyNote } from "@/components/calculators/MethodologyNote";
import { Card } from "@/components/ui/Card";
import { formatEUR, formatPercent } from "@/lib/utils/format";
import { CGT } from "@/lib/constants/taxYear2026";

const ASSET_OPTIONS: { value: AssetType; label: string }[] = [
  { value: "property", label: "Property" },
  { value: "shares", label: "Shares" },
  { value: "crypto", label: "Crypto" },
];

export function CgtCalculatorApp() {
  const [assetType, setAssetType] = useState<AssetType>("property");
  const [purchasePrice, setPurchasePrice] = useState(250_000);
  const [salePrice, setSalePrice] = useState(350_000);
  const [purchaseDate, setPurchaseDate] = useState("2019-06-01");
  const [saleDate, setSaleDate] = useState("2026-06-01");
  const [improvementCosts, setImprovementCosts] = useState(15_000);
  const [sellingCosts, setSellingCosts] = useState(8_000);
  const [lossesCarriedForward, setLossesCarriedForward] = useState(0);
  const [wasPPR, setWasPPR] = useState(false);

  const result = useMemo(
    () =>
      calculateCgt({
        assetType,
        purchasePrice,
        salePrice,
        purchaseDate,
        saleDate,
        improvementCosts,
        sellingCosts,
        lossesCarriedForward,
        wasPrincipalPrivateResidence: wasPPR,
      }),
    [assetType, purchasePrice, salePrice, purchaseDate, saleDate, improvementCosts, sellingCosts, lossesCarriedForward, wasPPR]
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* Inputs */}
      <Card>
        <h2 className="font-display text-xl text-ink">Disposal details</h2>
        <div className="mt-6 space-y-5">
          <SelectField
            id="assetType"
            label="Asset type"
            value={assetType}
            onChange={(v) => setAssetType(v as AssetType)}
            options={ASSET_OPTIONS}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              id="purchasePrice"
              label="Purchase price"
              value={purchasePrice}
              onChange={setPurchasePrice}
              prefix="€"
              min={0}
            />
            <NumberField
              id="salePrice"
              label="Sale price"
              value={salePrice}
              onChange={setSalePrice}
              prefix="€"
              min={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DateField
              id="purchaseDate"
              label="Purchase date"
              value={purchaseDate}
              onChange={setPurchaseDate}
            />
            <DateField id="saleDate" label="Sale date" value={saleDate} onChange={setSaleDate} />
          </div>
          <NumberField
            id="improvementCosts"
            label="Improvement costs"
            value={improvementCosts}
            onChange={setImprovementCosts}
            prefix="€"
            min={0}
            hint="Capital improvements only — e.g. an extension, not routine repairs."
          />
          <NumberField
            id="sellingCosts"
            label="Selling costs"
            value={sellingCosts}
            onChange={setSellingCosts}
            prefix="€"
            min={0}
            hint="Solicitor, auctioneer/broker fees, and other disposal costs."
          />
          <NumberField
            id="lossesCarriedForward"
            label="Losses carried forward"
            value={lossesCarriedForward}
            onChange={setLossesCarriedForward}
            prefix="€"
            min={0}
            hint="Unused losses from previous years' disposals."
          />
          {assetType === "property" && (
            <ToggleField
              id="ppr"
              label="This was my Principal Private Residence for some or all of the ownership period"
              checked={wasPPR}
              onChange={setWasPPR}
              hint="PPR relief can reduce or eliminate CGT — this calculator flags it but doesn't calculate the apportionment."
            />
          )}
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {wasPPR && (
          <div className="flex gap-3 rounded-xl border border-gold/40 bg-gold-dim px-5 py-4 text-sm text-ink">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-gold" />
            <p>
              Principal Private Residence Relief may reduce or fully remove
              the CGT shown below, depending on how long you lived in the
              property relative to your total ownership period. This
              calculator does not apportion PPR relief — see our{" "}
              <a href="/guides/capital-gains-tax-explained" className="underline">
                Capital Gains Tax guide
              </a>{" "}
              or Revenue.ie for how it&apos;s calculated.
            </p>
          </div>
        )}

        <StatementPanel
          title={result.isLoss ? "Estimated result — this is a loss" : "Estimated results"}
          headlineLabel="Estimated CGT due"
          headlineValue={formatEUR(result.cgtDue)}
          headlineTone="gold"
          footnote={
            result.isLoss ? (
              <span>
                This disposal shows a loss of {formatEUR(Math.abs(result.netGainOrLoss))}.
                No CGT is due, and this loss can be carried forward to offset
                gains in future years.
              </span>
            ) : (
              <span>
                Based on a {result.holdingPeriodYears.toFixed(1)}-year holding
                period and the standard {formatPercent(CGT.standardRate)} CGT rate.
              </span>
            )
          }
        >
          <LedgerRow label="Sale price" value={salePrice} />
          <LedgerRow label="Purchase price" value={purchasePrice} isDeduction />
          <LedgerRow label="Improvement costs" value={improvementCosts} isDeduction />
          <LedgerRow label="Selling costs" value={sellingCosts} isDeduction />
          <LedgerRow
            label={result.netGainOrLoss >= 0 ? "Capital gain" : "Capital loss"}
            value={result.netGainOrLoss}
            isTotal
          />
          <LedgerRow label="Losses carried forward applied" value={result.lossesApplied} isDeduction />
          <LedgerRow label="Annual exemption applied" value={result.annualExemptionApplied} isDeduction />
          <LedgerRow label="Taxable gain" value={result.taxableGain} isTotal />
          <LedgerRow label={`CGT due @ ${formatPercent(CGT.standardRate)}`} value={result.cgtDue} isTotal />
        </StatementPanel>

        <MethodologyNote>
          <p>
            <strong className="text-ink">1. Capital gain:</strong> sale price
            minus purchase price, minus allowable improvement and selling
            costs.
          </p>
          <p>
            <strong className="text-ink">2. Losses:</strong> any losses
            carried forward from previous disposals are deducted from the
            gain before the exemption is applied.
          </p>
          <p>
            <strong className="text-ink">3. Annual exemption:</strong> the
            first {formatEUR(CGT.annualExemption)} of gains per person, per
            year, is exempt from CGT. It cannot be transferred to a spouse or
            carried forward if unused.
          </p>
          <p>
            <strong className="text-ink">4. CGT due:</strong> the remaining
            taxable gain is charged at the standard rate of{" "}
            {formatPercent(CGT.standardRate)}. A reduced 10% rate applies
            under Revised Entrepreneur Relief for qualifying business
            disposals up to a {formatEUR(CGT.entrepreneurRelief.lifetimeLimit)}{" "}
            lifetime limit — not included in this calculator, as it depends
            on qualifying conditions this calculator can&apos;t verify.
          </p>
        </MethodologyNote>

        <CalculatorDisclaimer />
      </div>
    </div>
  );
}
