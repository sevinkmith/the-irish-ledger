import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideTable, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { USC } from "@/lib/constants/taxYear2026";
import { formatEUR } from "@/lib/utils/format";

const guide = getGuideBySlug("usc-explained")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/usc-explained",
});

const faqs = [
  {
    question: "Do tax credits reduce USC?",
    answer:
      "No. USC is charged on your gross income with no credits applied, unlike Income Tax. The only reductions available are the full exemption below €13,000 and the reduced-rate concession for medical card holders and those aged 70+.",
  },
  {
    question: "Is USC charged on pension contributions?",
    answer:
      "Generally yes — USC is one of the few charges that isn't reduced by employee pension contributions in the same way Income Tax is, so it's calculated on your gross income before pension deductions.",
  },
];

export default function UscExplainedPage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        The Universal Social Charge (USC) is a separate charge from Income
        Tax, calculated on your gross income in bands — and unlike Income
        Tax, it isn't reduced by tax credits.
      </GuideP>

      <GuideH2>Who pays USC</GuideH2>
      <GuideP>
        If your total income for the year is {formatEUR(USC.exemptThreshold)}{" "}
        or less, you're fully exempt from USC. Above that threshold, USC
        applies to your full income — a cliff-edge, not a band starting from
        zero, so it's worth knowing exactly where you sit.
      </GuideP>

      <GuideH2>2026 USC rate bands</GuideH2>
      <GuideTable
        headers={["Band", "Rate"]}
        rows={USC.bands.map((b, i) => [
          i === 0
            ? `Up to ${formatEUR(b.upTo)}`
            : `${formatEUR(USC.bands[i - 1].upTo)} – ${
                b.upTo === Infinity ? "and above" : formatEUR(b.upTo)
              }`,
          `${b.rate * 100}%`,
        ])}
      />

      <GuideH2>Reduced-rate concession</GuideH2>
      <GuideP>
        If you hold a full medical card, or are aged 70 or over, and your
        total income doesn't exceed {formatEUR(USC.reducedRate.incomeCeiling)}
        , only the two lowest USC rates apply — capped at{" "}
        {USC.reducedRate.rate * 100}% rather than climbing to the 3% and 8%
        bands.
      </GuideP>

      <GuideWorkedExample title="Someone earning €50,000, standard rates">
        <p>€12,012 × 0.5% = €60.06</p>
        <p>€16,688 (up to €28,700) × 2% = €333.76</p>
        <p>€21,300 (up to €50,000) × 3% = €639.00</p>
        <p className="font-semibold text-ink">Total USC ≈ €1,032.82</p>
      </GuideWorkedExample>

      <GuideList
        items={[
          "Self-employed income above €100,000 attracts a further 3% USC surcharge on the excess.",
          "USC is calculated independently of your marital status — there's no joint USC assessment for couples.",
          "Employer USC exemptions apply to certain pension-related contributions under the Auto-Enrolment scheme.",
        ]}
      />

      <GuideCallout title="See USC calculated for your own salary">
        Our{" "}
        <a href="/calculators/paye" className="underline">
          PAYE calculator
        </a>{" "}
        applies these bands automatically, including the medical card
        concession if it applies to you.
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
