import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { CGT } from "@/lib/constants/taxYear2026";
import { formatEUR, formatPercent } from "@/lib/utils/format";

const guide = getGuideBySlug("capital-gains-tax-explained")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/capital-gains-tax-explained",
});

const faqs = [
  {
    question: "When do I need to pay Capital Gains Tax in Ireland?",
    answer:
      "For disposals between 1 January and 30 November, CGT is due by 15 December of the same year. For disposals in December, it's due by 31 January of the following year. You self-assess and pay via Revenue's ROS or myAccount.",
  },
  {
    question: "Can I offset a loss on one asset against a gain on another?",
    answer:
      "Yes. Capital losses in the same tax year are set against capital gains in that year first. Any unused losses can be carried forward indefinitely to offset gains in future years — but they can't be carried back.",
  },
  {
    question: "Is my family home exempt from CGT?",
    answer:
      "Your Principal Private Residence is generally exempt from CGT on disposal, under PPR relief — but only for the portion of ownership during which it was genuinely your main residence. If you rented it out for part of the time, or it includes non-qualifying land, relief may be partial.",
  },
];

export default function CapitalGainsTaxExplainedPage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        Capital Gains Tax applies when you dispose of an asset — typically
        by selling it — for more than it cost you. Here's how the Irish
        rules actually work, step by step.
      </GuideP>

      <GuideH2>What counts as a disposal</GuideH2>
      <GuideP>
        A disposal isn't just a sale. Gifting an asset, exchanging it, or
        even certain transfers to a trust can all trigger CGT, based on the
        asset's market value at the time. This guide focuses on the common
        case: selling property, shares or crypto for cash.
      </GuideP>

      <GuideH2>How the gain is calculated</GuideH2>
      <GuideList
        items={[
          "Start with your sale price (or market value, for a gift/transfer).",
          "Deduct your original purchase price.",
          "Deduct allowable costs: capital improvements (not routine repairs or maintenance) and costs of the disposal itself, like solicitor or auctioneer fees.",
          "The result is your capital gain — or loss, if the figure is negative.",
        ]}
      />

      <GuideH2>Losses, the annual exemption, and the rate</GuideH2>
      <GuideP>
        Any capital losses you're carrying forward from previous years are
        deducted from this year's gain first. Then, each individual gets an
        annual exemption of {formatEUR(CGT.annualExemption)} — the first
        slice of gains in a tax year that's tax-free. It can't be
        transferred to a spouse and is lost if you don't use it. Whatever
        remains is taxed at the standard CGT rate of{" "}
        {formatPercent(CGT.standardRate)}.
      </GuideP>

      <GuideWorkedExample title="Selling shares for a €20,000 gain">
        <p>Capital gain: €20,000</p>
        <p>Losses carried forward: €2,000 → remaining gain €18,000</p>
        <p>Annual exemption: €1,270 → taxable gain €16,730</p>
        <p className="font-semibold text-ink">CGT due: €16,730 × 33% = €5,520.90</p>
      </GuideWorkedExample>

      <GuideH2>Reliefs worth knowing about</GuideH2>
      <GuideList
        items={[
          <>
            <strong className="text-ink">Principal Private Residence (PPR) Relief</strong>{" "}
            — your main home is generally exempt from CGT, apportioned for
            any period it wasn't your main residence.
          </>,
          <>
            <strong className="text-ink">Revised Entrepreneur Relief</strong> — a
            reduced {formatPercent(CGT.entrepreneurRelief.rate)} rate on
            qualifying gains from disposing of a business, up to a{" "}
            {formatEUR(CGT.entrepreneurRelief.lifetimeLimit)} lifetime limit.
          </>,
          "Transfers between spouses or civil partners are generally exempt from CGT at the time of transfer.",
        ]}
      />

      <GuideCallout title="Work out your own CGT liability" tone="info">
        Our{" "}
        <a href="/calculators/cgt" className="underline">
          CGT calculator
        </a>{" "}
        applies the exemption and any carried-forward losses automatically —
        just enter your purchase and sale details.
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
