import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";
import {
  RATES_LAST_CHECKED,
  INCOME_TAX,
  USC,
  PRSI,
  CGT,
  MORTGAGE_RULES,
} from "@/lib/constants/taxYear2026";
import { formatEUR, formatPercent } from "@/lib/utils/format";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "Methodology & Sources",
  description:
    "Every rate, band and limit used across our calculators, with a direct link to the exact Revenue.ie or Central Bank of Ireland source it comes from.",
  path: "/methodology",
});

interface SourceRow {
  label: string;
  value: string;
  sourceName: string;
  sourceUrl: string;
}

function SourceTable({ rows }: { rows: SourceRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-paper-dim text-left">
            <th className="px-5 py-3 font-semibold text-ink">Figure</th>
            <th className="px-5 py-3 font-semibold text-ink">Used in our calculator</th>
            <th className="px-5 py-3 font-semibold text-ink">Source</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-line">
              <td className="px-5 py-3.5 text-ink-2">{row.label}</td>
              <td className="font-mono-figure px-5 py-3.5 text-ink">{row.value}</td>
              <td className="px-5 py-3.5">
                
                  href={row.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cobalt hover:underline"
                >
                  {row.sourceName}
                  <ExternalLink size={13} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl text-ink">{children}</h2>;
}

export default function MethodologyPage() {
  const payeRows: SourceRow[] = [
    {
      label: "Standard / higher Income Tax rates",
      value: `${formatPercent(INCOME_TAX.standardRate)} / ${formatPercent(INCOME_TAX.higherRate)}`,
      sourceName: "Revenue — Tax rates, bands and reliefs",
      sourceUrl:
        "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx",
    },
    {
      label: "Standard rate band (single)",
      value: formatEUR(INCOME_TAX.standardBand.single),
      sourceName: "Revenue — How your Income Tax is calculated",
      sourceUrl:
        "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/how-income-tax-is-calculated.aspx",
    },
    {
      label: "Standard rate band (married, one/two incomes)",
      value: `${formatEUR(INCOME_TAX.standardBand.marriedOneIncome)} / up to ${formatEUR(
        INCOME_TAX.standardBand.marriedTwoIncomesMaxCombined
      )}`,
      sourceName: "Revenue — Tax rates, bands and reliefs",
      sourceUrl:
        "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx",
    },
    {
      label: "Personal Tax Credit / PAYE Credit",
      value: `${formatEUR(INCOME_TAX.credits.personalSingle)} / ${formatEUR(
        INCOME_TAX.credits.payeEmployee
      )}`,
      sourceName: "Revenue — Tax rates, bands and reliefs",
      sourceUrl:
        "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx",
    },
    {
      label: "USC rate bands",
      value: `${formatPercent(USC.bands[0].rate)}–${formatPercent(USC.bands[3].rate)}`,
      sourceName: "Revenue — Standard rates and thresholds of USC",
      sourceUrl: "https://www.revenue.ie/en/jobs-and-pensions/usc/standard-rates-thresholds.aspx",
    },
    {
      label: "USC exemption threshold",
      value: formatEUR(USC.exemptThreshold),
      sourceName: "Revenue — Standard rates and thresholds of USC",
      sourceUrl: "https://www.revenue.ie/en/jobs-and-pensions/usc/standard-rates-thresholds.aspx",
    },
    {
      label: "USC reduced rate (medical card / 70+)",
      value: `${formatPercent(USC.reducedRate.rate)}, income ≤ ${formatEUR(USC.reducedRate.incomeCeiling)}`,
      sourceName: "Revenue — Reduced rates of USC",
      sourceUrl: "https://www.revenue.ie/en/jobs-and-pensions/usc/reduced-rates.aspx",
    },
    {
      label: "PRSI Class A employee rate",
      value: `${formatPercent(PRSI.employeeRateJanToSep)} → ${formatPercent(
        PRSI.employeeRateFromOct
      )} from 1 Oct 2026`,
      sourceName: "gov.ie — PRSI Class A rates",
      sourceUrl: "https://www.gov.ie/en/department-of-social-protection/publications/prsi-class-a-rates/",
    },
    {
      label: "PRSI weekly exemption threshold",
      value: `${formatEUR(PRSI.weeklyExemptionThreshold)}/week`,
      sourceName: "gov.ie — PRSI Class A rates",
      sourceUrl: "https://www.gov.ie/en/department-of-social-protection/publications/prsi-class-a-rates/",
    },
    {
      label: "PRSI Class S (self-employed) rate",
      value: `${formatPercent(PRSI.selfEmployedRate)}, min. ${formatEUR(PRSI.selfEmployedMinimumAnnual)}`,
      sourceName: "Revenue — PRSI for the self-employed",
      sourceUrl:
        "https://www.revenue.ie/en/self-assessment-and-self-employment/guide-to-self-assessment/prsi-need-pay.aspx",
    },
  ];

  const cgtRows: SourceRow[] = [
    {
      label: "Standard CGT rate",
      value: formatPercent(CGT.standardRate),
      sourceName: "Revenue — How to calculate CGT",
      sourceUrl:
        "https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx",
    },
    {
      label: "Annual personal exemption",
      value: formatEUR(CGT.annualExemption),
      sourceName: "Revenue — How to calculate CGT",
      sourceUrl:
        "https://www.revenue.ie/en/gains-gifts-and-inheritance/transfering-an-asset/how-to-calculate-cgt.aspx",
    },
    {
      label: "Revised Entrepreneur Relief rate / lifetime limit",
      value: `${formatPercent(CGT.entrepreneurRelief.rate)}, up to ${formatEUR(
        CGT.entrepreneurRelief.lifetimeLimit
      )}`,
      sourceName: "Revenue — CGT reliefs",
      sourceUrl: "https://www.revenue.ie/en/gains-gifts-and-inheritance/cgt-reliefs/index.aspx",
    },
  ];

  const mortgageRows: SourceRow[] = [
    {
      label: "Loan-to-income limit (first-time buyer)",
      value: `${MORTGAGE_RULES.loanToIncome.firstTimeBuyer}x gross income`,
      sourceName: "Central Bank of Ireland — What are the mortgage measures?",
      sourceUrl: "https://www.centralbank.ie/consumer-hub/explainers/what-are-the-mortgage-measures",
    },
    {
      label: "Loan-to-income limit (second/subsequent buyer)",
      value: `${MORTGAGE_RULES.loanToIncome.secondAndSubsequentBuyer}x gross income`,
      sourceName: "Central Bank of Ireland — What are the mortgage measures?",
      sourceUrl: "https://www.centralbank.ie/consumer-hub/explainers/what-are-the-mortgage-measures",
    },
    {
      label: "Loan-to-value limit (first-time / second-time buyer)",
      value: formatPercent(MORTGAGE_RULES.loanToValue.firstTimeBuyer, 0),
      sourceName: "Central Bank of Ireland — Mortgage Measures",
      sourceUrl:
        "https://www.centralbank.ie/financial-system/financial-stability/macro-prudential-policy/mortgage-measures",
    },
    {
      label: "Loan-to-value limit (buy-to-let)",
      value: formatPercent(MORTGAGE_RULES.loanToValue.buyToLet, 0),
      sourceName: "Central Bank of Ireland — Mortgage Measures",
      sourceUrl:
        "https://www.centralbank.ie/financial-system/financial-stability/macro-prudential-policy/mortgage-measures",
    },
    {
      label: "Residential stamp duty rates",
      value: "1% / 2% / 6% (tiered)",
      sourceName: "Revenue — Stamp Duty rates on residential property",
      sourceUrl: "https://www.revenue.ie/en/property/stamp-duty/property/stamp-duty-property/rates.aspx",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Home", path: "/" },
          { label: "Methodology & Sources", path: "/methodology" },
        ]}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Methodology & Sources" }]} />
      <Container className="max-w-3xl py-14 sm:py-20">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={22} className="text-cobalt" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
            Trust & accuracy
          </p>
        </div>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink">
          Methodology &amp; Sources
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
          We&apos;d rather you check a figure against Revenue.ie or the Central
          Bank of Ireland than take our word for it. Every rate, band and
          limit used across {SITE.name}&apos;s calculators is listed below,
          with a direct link to the exact page it comes from — not just the
          organisation&apos;s homepage.
        </p>
        <p className="mt-3 text-sm text-slate">
          Figures last checked: <strong className="text-ink">{RATES_LAST_CHECKED}</strong>. All
          figures apply to the {"2026"} tax year unless stated otherwise.
        </p>

        <div className="mt-12 space-y-14">
          <section className="space-y-4">
            <SectionHeading>PAYE Calculator</SectionHeading>
            <p className="text-sm leading-relaxed text-slate">
              Income Tax, USC and PRSI figures used in our{" "}
              <a href="/calculators/paye" className="text-cobalt underline">
                PAYE calculator
              </a>
              .
            </p>
            <SourceTable rows={payeRows} />
          </section>

          <section className="space-y-4">
            <SectionHeading>CGT Calculator</SectionHeading>
            <p className="text-sm leading-relaxed text-slate">
              Rates and exemptions used in our{" "}
              <a href="/calculators/cgt" className="text-cobalt underline">
                Capital Gains Tax calculator
              </a>
              .
            </p>
            <SourceTable rows={cgtRows} />
          </section>

          <section className="space-y-4">
            <SectionHeading>Mortgage Affordability Calculator</SectionHeading>
            <p className="text-sm leading-relaxed text-slate">
              Central Bank of Ireland lending limits and stamp duty rates
              used in our{" "}
              <a href="/calculators/mortgage-affordability" className="text-cobalt underline">
                Mortgage Affordability calculator
              </a>
              .
            </p>
            <SourceTable rows={mortgageRows} />
          </section>
        </div>

        <div className="mt-14 space-y-5 rounded-2xl border border-line bg-paper-dim/50 p-6 sm:p-8">
          <h2 className="font-display text-xl text-ink">How we keep this updated</h2>
          <p className="text-sm leading-relaxed text-ink-2">
            Every rate above lives in a single, centralised file in our
            codebase — nothing is hand-typed into individual calculators. When
            Revenue or the Central Bank publish a change (most commonly after
            the annual Budget each October), we update that one file and
            every calculator, guide and this page reflect the change
            immediately.
          </p>
          <p className="text-sm leading-relaxed text-ink-2">
            Where we simplify something — for example, our PAYE calculator
            uses standard personal credits and doesn&apos;t model every
            possible credit, and our CGT calculator flags Principal Private
            Residence relief without calculating its exact apportionment —
            that simplification is explained directly on the relevant
            calculator, not hidden. See our{" "}
            <a href="/disclaimer" className="text-cobalt underline">
              Disclaimer
            </a>{" "}
            for the full list of known simplifications.
          </p>
          <p className="text-sm leading-relaxed text-ink-2">
            Spotted a figure that looks wrong or out of date? Please{" "}
            <a href="/contact" className="text-cobalt underline">
              tell us
            </a>{" "}
            — we&apos;d rather fix it fast than have it sit there quietly
            wrong.
          </p>
        </div>
      </Container>
    </>
  );
}
