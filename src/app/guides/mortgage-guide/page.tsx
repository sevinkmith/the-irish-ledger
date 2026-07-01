import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideTable, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { MORTGAGE_RULES } from "@/lib/constants/taxYear2026";
import { formatPercent } from "@/lib/utils/format";

const guide = getGuideBySlug("mortgage-guide")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/mortgage-guide",
});

const faqs = [
  {
    question: "What's the minimum deposit for a first-time buyer in Ireland?",
    answer:
      "10% of the property price, under Central Bank of Ireland rules — meaning the maximum mortgage is 90% of the property's value (90% loan-to-value).",
  },
  {
    question: "How many times my salary can I borrow?",
    answer:
      "Up to 4 times your gross annual income as a first-time buyer, or 3.5 times as a second-time or subsequent buyer, under standard Central Bank loan-to-income limits. Lenders can grant a limited number of exceptions above this each year.",
  },
  {
    question: "Do government schemes like Help to Buy affect these limits?",
    answer:
      "Schemes like Help to Buy and the First Home Scheme provide extra funds toward your deposit on new-build homes, but they don't change the Central Bank's loan-to-income or loan-to-value limits themselves.",
  },
];

export default function MortgageGuidePage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        Before a lender even looks at your application, two Central Bank of
        Ireland rules set hard limits on what you can borrow. Understanding
        them first will save you time — and heartbreak at viewings.
      </GuideP>

      <GuideH2>The two rules that cap your mortgage</GuideH2>
      <GuideP>
        Since 2015, the Central Bank has applied macroprudential "mortgage
        measures" to every regulated lender in Ireland, built around two
        limits that operate together.
      </GuideP>

      <GuideTable
        headers={["Buyer type", "Max loan-to-income (LTI)", "Max loan-to-value (LTV)"]}
        rows={[
          [
            "First-time buyer",
            `${MORTGAGE_RULES.loanToIncome.firstTimeBuyer}x income`,
            formatPercent(MORTGAGE_RULES.loanToValue.firstTimeBuyer, 0),
          ],
          [
            "Second/subsequent buyer",
            `${MORTGAGE_RULES.loanToIncome.secondAndSubsequentBuyer}x income`,
            formatPercent(MORTGAGE_RULES.loanToValue.secondAndSubsequentBuyer, 0),
          ],
          [
            "Buy-to-let",
            "No fixed LTI — lender discretion",
            formatPercent(MORTGAGE_RULES.loanToValue.buyToLet, 0),
          ],
        ]}
      />

      <GuideP>
        Your actual maximum loan is whichever of the two rules is more
        restrictive for your situation — usually the income rule for buyers
        with a solid deposit, or the deposit rule for buyers with a smaller
        deposit relative to their income.
      </GuideP>

      <GuideWorkedExample title="First-time buyer couple, €100,000 combined income, €40,000 savings">
        <p>Loan-to-income limit: €100,000 × 4 = €400,000 maximum loan</p>
        <p>
          Loan-to-value limit: with €40,000 as a 10% deposit, the maximum
          property price the deposit supports is €400,000, implying a
          €360,000 loan
        </p>
        <p className="font-semibold text-ink">
          The deposit is the binding constraint here — maximum loan ≈ €360,000
        </p>
      </GuideWorkedExample>

      <GuideH2>What lenders assess beyond the Central Bank limits</GuideH2>
      <GuideList
        items={[
          "Proof of steady income — payslips, employment contracts, or accounts for the self-employed.",
          "Six months of bank statements showing repayment capacity, often evidenced by rent or savings history.",
          "Existing monthly commitments — loans, credit cards, subscriptions — which reduce what a lender considers affordable, even within the Central Bank limits.",
          "Your credit history, via the Central Credit Register.",
          "A stress test: lenders check you could still afford repayments if interest rates rose, typically modelled around 1 percentage point above your offered rate.",
        ]}
      />

      <GuideH2>Exceptions to the limits</GuideH2>
      <GuideP>
        Lenders are permitted to grant a limited proportion of their annual
        lending above the standard LTI or LTV limits — commonly called
        "exceptions." These are limited in number, at the lender's
        discretion, and not something you can rely on when budgeting for a
        home search.
      </GuideP>

      <GuideCallout title="Model your own numbers" tone="info">
        Our{" "}
        <a href="/calculators/mortgage-affordability" className="underline">
          Mortgage Affordability Calculator
        </a>{" "}
        applies these exact LTI and LTV limits to your income and savings.
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
