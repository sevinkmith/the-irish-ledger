import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { WebApplicationSchema } from "@/components/seo/WebApplicationSchema";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { Container } from "@/components/ui/Container";
import { PayeCalculatorApp } from "@/components/calculators/PayeCalculatorApp";
import { RelatedGuides } from "@/components/calculators/RelatedGuides";
import { AdSlot } from "@/components/monetisation/AdSlot";
import { getCalculatorBySlug } from "@/lib/content/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

const calculator = getCalculatorBySlug("paye")!;

export const metadata = buildMetadata({
  title: "PAYE Calculator Ireland 2026 — Take-Home Pay",
  description:
    "Calculate your Income Tax, USC and PRSI, and see your exact take-home pay in Ireland for 2026. Free, with full workings shown.",
  path: "/calculators/paye",
});

const faqs = [
  {
    question: "How accurate is this PAYE calculator?",
    answer:
      "It uses the published 2026 Income Tax, USC and PRSI rates and standard tax credits. It's a strong estimate for most PAYE employees, but doesn't account for every possible credit (e.g. Rent Tax Credit, Home Carer Credit) — check Revenue.ie's own calculator or myAccount for a filing-accurate figure.",
  },
  {
    question: "Does this include USC and PRSI, or just Income Tax?",
    answer:
      "All three. Take-home pay is calculated as gross salary minus Income Tax (after credits), USC, and PRSI.",
  },
  {
    question: "What's the difference between effective and marginal tax rate?",
    answer:
      "Your effective rate is your total deductions as a percentage of your whole salary. Your marginal rate is the rate charged on your next euro of income — usually higher, since Ireland's system is progressive.",
  },
];

export default function PayeCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Home", path: "/" },
          { label: "Calculators", path: "/calculators" },
          { label: calculator.shortTitle, path: "/calculators/paye" },
        ]}
      />
      <WebApplicationSchema
        name={calculator.title}
        description={calculator.description}
        path="/calculators/paye"
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
            Enter your gross salary to see a full breakdown of Income Tax,
            USC and PRSI, and your estimated take-home pay for 2026.
          </p>
        </div>

        <div className="mt-10">
          <PayeCalculatorApp />
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
