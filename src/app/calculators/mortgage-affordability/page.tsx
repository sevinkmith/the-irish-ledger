import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { WebApplicationSchema } from "@/components/seo/WebApplicationSchema";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { Container } from "@/components/ui/Container";
import { MortgageCalculatorApp } from "@/components/calculators/MortgageCalculatorApp";
import { RelatedGuides } from "@/components/calculators/RelatedGuides";
import { AdSlot } from "@/components/monetisation/AdSlot";
import { getCalculatorBySlug } from "@/lib/content/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

const calculator = getCalculatorBySlug("mortgage-affordability")!;

export const metadata = buildMetadata({
  title: "Mortgage Affordability Calculator Ireland 2026",
  description:
    "See how much you could borrow under Central Bank of Ireland loan-to-income and loan-to-value rules, and your likely monthly repayments.",
  path: "/calculators/mortgage-affordability",
});

const faqs = [
  {
    question: "How much can I borrow for a mortgage in Ireland?",
    answer:
      "Under Central Bank rules, first-time buyers can typically borrow up to 4 times their gross annual income, and second-time or subsequent buyers up to 3.5 times. Your actual maximum is also capped by the loan-to-value limit, based on your deposit.",
  },
  {
    question: "What deposit do I need to buy a home in Ireland?",
    answer:
      "First-time and second-time buyers generally need a minimum deposit of 10% of the property price. Buy-to-let purchases require a larger 30% minimum deposit.",
  },
  {
    question: "Can I borrow more than the Central Bank limits?",
    answer:
      "Lenders can grant a limited number of exceptions each year above the standard loan-to-income or loan-to-value limits, but these are at the lender's discretion and not guaranteed. This calculator shows the standard limits, not exception scenarios.",
  },
];

export default function MortgageCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Home", path: "/" },
          { label: "Calculators", path: "/calculators" },
          { label: calculator.shortTitle, path: "/calculators/mortgage-affordability" },
        ]}
      />
      <WebApplicationSchema
        name={calculator.title}
        description={calculator.description}
        path="/calculators/mortgage-affordability"
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: calculator.shortTitle },
        ]}
      />
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl text-ink">{calculator.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            See your maximum borrowing under Central Bank of Ireland rules,
            the deposit you&apos;ll need, and your likely monthly repayment.
          </p>
        </div>

        <div className="mt-10">
          <MortgageCalculatorApp />
        </div>

        <AdSlot variant="in-content" className="my-10" />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <RelatedGuides slugs={calculator.relatedGuideSlugs} />
          <FaqSchema items={faqs} />
        </div>
      </Container>
    </>
  );
}
