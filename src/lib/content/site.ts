export const SITE = {
  name: "The Irish Ledger",
  shortName: "Irish Ledger",
  tagline: "Simple Irish Financial Calculators",
  description:
    "Free calculators and plain-English guides for salary, tax, mortgages and investing in Ireland — built on Revenue and Central Bank guidance.",
  // Update this to the real production domain before going live.
  url: "https://theirishledger.ie",
  locale: "en_IE",
  twitterHandle: "@irishledger",
  contactEmail: "hello@theirishledger.ie",
} as const;

export const NAV_LINKS = [
  { label: "Calculators", href: "/calculators" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;
