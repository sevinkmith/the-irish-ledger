import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { WebApplicationSchema } from "@/components/seo/WebApplicationSchema";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { Container } from "@/components/ui/Container";
import { CgtCalculatorApp } from "@/components/calculators/CgtCalculatorApp";
import { RelatedGuides } from "@/components/calculators/RelatedGuides";
import { AdSlot } from "@/components/monetisation/AdSlot";
import { getCalculatorBySlug } from "@/lib/content/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

const calculator = getCalculatorBySlug("cgt")!;

export const metadata = buildMetadata({
  title: "Capital Gains Tax (CGT) Calculator Ireland 2026",
  description:
    "Estimate the Capital Gains Tax due when selling property, shares or crypto in Ireland, with the annual exemption and losses applied.",
  path: "/calculators/cgt",
});

const faqs = [
  {
    question: "What is the CGT rate in Ireland?",
    answer:
      "The standard rate of Capital Gains Tax in Ireland is 33% on the taxable gain, after allowable deductions, carried-forward losses, and the annual personal exemption of €1,270 have been applied.",
  },
  {
    question: "Do I get a tax-free allowance on capital gains?",
    answer:
      "Yes — each individual has an annual CGT exemption of €1,270. It applies per person, per tax year, cannot be transferred to a spouse, and is lost if unused.",
  },
  {
    question: "Does this calculator account for Principal Private Residence relief?",
    answer:
      "It flags when PPR relief may apply to a property disposal, but doesn't calculate the exact relief, since that depends on how many years you lived in the property versus your total ownership period. See our Capital Gains Tax guide for how the apportionment works.",
  },
  {
    question: "Are crypto disposals taxed the same as shares in Ireland?",
    answer:
      "Generally yes — Revenue treats gains on cryptocurrency disposals the same as other chargeable assets for CGT purposes, taxed at the standard 33% rate, subject to the same annual exemption.",
  },
];

export default function CgtCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Home", path: "/" },
          { label: "Calculators", path: "/calculators" },
          { label: calculator.shortTitle, path: "/calculators/cgt" },
        ]}
      />
      <WebApplicationSchema
        name={calculator.title}
        description={calculator.description}
        path="/calculators/cgt"
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
            Work out the Capital Gains Tax due on selling property, shares
            or crypto, with allowable costs, carried-forward losses and the
            annual exemption applied step by step.
          </p>
        </div>

        <div className="mt-10">
          <CgtCalculatorApp />
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
