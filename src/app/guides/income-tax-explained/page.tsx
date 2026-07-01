import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideTable, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { INCOME_TAX } from "@/lib/constants/taxYear2026";
import { formatEUR, formatPercent } from "@/lib/utils/format";

const guide = getGuideBySlug("income-tax-explained")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/income-tax-explained",
});

const faqs = [
  {
    question: "What is the standard rate cut-off point?",
    answer:
      "It's the amount of income taxed at the lower 20% rate before the 40% higher rate applies. For 2026 it's €44,000 for a single person, €53,000 for a one-income married couple, and up to €88,000 combined for a two-income married couple.",
  },
  {
    question: "What's the difference between a tax band and a tax credit?",
    answer:
      "A band determines which rate (20% or 40%) applies to a slice of your income. A credit is subtracted directly from the tax you owe, euro for euro, after the band calculation.",
  },
];

export default function IncomeTaxExplainedPage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        Ireland taxes income using two rates: a standard rate and a higher
        rate. Where your income sits relative to your standard rate band
        decides how much of it is taxed at each rate — and your tax credits
        then reduce the bill directly.
      </GuideP>

      <GuideH2>The two rates</GuideH2>
      <GuideP>
        Every euro you earn up to your standard rate band is taxed at{" "}
        {formatPercent(INCOME_TAX.standardRate)}. Everything above that band
        is taxed at {formatPercent(INCOME_TAX.higherRate)}. This is why
        Ireland's system is described as progressive — the more you earn
        above your band, the higher your average rate climbs, even though no
        single euro is ever taxed twice.
      </GuideP>

      <GuideH2>2026 standard rate bands</GuideH2>
      <GuideTable
        headers={["Status", "Taxed at 20% up to"]}
        rows={[
          ["Single / widowed", formatEUR(INCOME_TAX.standardBand.single)],
          ["Married, one income", formatEUR(INCOME_TAX.standardBand.marriedOneIncome)],
          [
            "Married, two incomes (combined max)",
            formatEUR(INCOME_TAX.standardBand.marriedTwoIncomesMaxCombined),
          ],
        ]}
      />
      <GuideP>
        For a married couple with two incomes, the band can transfer between
        spouses, but the increase from the one-income band is capped at the
        lower of {formatEUR(INCOME_TAX.standardBand.marriedTwoIncomesUpliftCap)}{" "}
        or the second earner's own income — and no individual's personal
        band can exceed {formatEUR(INCOME_TAX.standardBand.marriedTwoIncomesMaxPerPerson)}.
      </GuideP>

      <GuideH2>Tax credits reduce the bill directly</GuideH2>
      <GuideP>
        After your income tax is calculated using the bands above, your tax
        credits are subtracted from that figure — not from your income.
        Every PAYE employee gets a Personal Tax Credit and a PAYE (Employee)
        Credit; the self-employed get an Earned Income Credit instead of the
        PAYE credit.
      </GuideP>
      <GuideList
        items={[
          <>Personal Tax Credit: {formatEUR(INCOME_TAX.credits.personalSingle)} (single) / {formatEUR(INCOME_TAX.credits.personalMarried)} (married)</>,
          <>PAYE (Employee) Credit: {formatEUR(INCOME_TAX.credits.payeEmployee)}</>,
          <>Earned Income Credit (self-employed): {formatEUR(INCOME_TAX.credits.earnedIncomeSelfEmployed)}</>,
          <>Other credits may apply depending on your situation — e.g. Rent Tax Credit, Home Carer Credit, Age Tax Credit.</>,
        ]}
      />

      <GuideWorkedExample title="Single employee earning €50,000">
        <p>€44,000 × 20% = €8,800</p>
        <p>€6,000 (the balance) × 40% = €2,400</p>
        <p>Gross income tax = €11,200</p>
        <p>Less Personal Credit (€2,000) and PAYE Credit (€2,000) = €7,200 net Income Tax</p>
        <p className="text-xs text-slate">
          This is Income Tax only — USC and PRSI are calculated separately
          on top of this figure.
        </p>
      </GuideWorkedExample>

      <GuideCallout title="Income Tax is only one part of your deductions">
        USC and PRSI are calculated on gross income, entirely separately
        from Income Tax and its credits. To see your full take-home pay, use
        our{" "}
        <a href="/calculators/paye" className="underline">
          PAYE calculator
        </a>
        .
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
