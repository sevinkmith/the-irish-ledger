export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: "wallet" | "trending-up" | "home";
  relatedGuideSlugs: string[];
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "paye",
    title: "PAYE & Take-Home Pay Calculator",
    shortTitle: "PAYE Calculator",
    description:
      "Work out your Income Tax, USC and PRSI, and see your exact take-home pay for 2026.",
    icon: "wallet",
    relatedGuideSlugs: ["paye-explained", "usc-explained", "prsi-explained", "income-tax-explained"],
  },
  {
    slug: "cgt",
    title: "Capital Gains Tax (CGT) Calculator",
    shortTitle: "CGT Calculator",
    description:
      "Estimate the Capital Gains Tax due on selling property, shares or crypto in Ireland.",
    icon: "trending-up",
    relatedGuideSlugs: ["capital-gains-tax-explained"],
  },
  {
    slug: "mortgage-affordability",
    title: "Mortgage Affordability Calculator",
    shortTitle: "Mortgage Calculator",
    description:
      "See how much you could borrow under Central Bank rules, and your likely monthly repayments.",
    icon: "home",
    relatedGuideSlugs: ["mortgage-guide"],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
