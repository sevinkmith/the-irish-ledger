export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: "Income Tax" | "Capital Gains Tax" | "Mortgages";
  relatedCalculatorSlug?: string;
  readTimeMinutes: number;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "income-tax-explained",
    title: "Income Tax in Ireland, Explained",
    description:
      "How Ireland's two income tax rates, standard rate bands and tax credits fit together.",
    category: "Income Tax",
    relatedCalculatorSlug: "paye",
    readTimeMinutes: 6,
  },
  {
    slug: "paye-explained",
    title: "What Is PAYE and How Does It Work?",
    description:
      "How the Pay As You Earn system deducts tax from your salary before you're paid.",
    category: "Income Tax",
    relatedCalculatorSlug: "paye",
    readTimeMinutes: 5,
  },
  {
    slug: "usc-explained",
    title: "USC Explained: Universal Social Charge",
    description:
      "Who pays USC, the current rate bands, and the reduced-rate concessions.",
    category: "Income Tax",
    relatedCalculatorSlug: "paye",
    readTimeMinutes: 5,
  },
  {
    slug: "prsi-explained",
    title: "PRSI Explained: Class A Contributions",
    description:
      "What PRSI pays for, how much you contribute, and why your PRSI class matters.",
    category: "Income Tax",
    relatedCalculatorSlug: "paye",
    readTimeMinutes: 5,
  },
  {
    slug: "capital-gains-tax-explained",
    title: "Capital Gains Tax in Ireland, Explained",
    description:
      "How CGT is calculated on property, shares and crypto, and how to reduce what you owe legally.",
    category: "Capital Gains Tax",
    relatedCalculatorSlug: "cgt",
    readTimeMinutes: 7,
  },
  {
    slug: "mortgage-guide",
    title: "A First-Time Buyer's Guide to Irish Mortgages",
    description:
      "Central Bank lending rules, deposit requirements, and how lenders assess affordability.",
    category: "Mortgages",
    relatedCalculatorSlug: "mortgage-affordability",
    readTimeMinutes: 8,
  },
];

export function getGuideBySlug(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
