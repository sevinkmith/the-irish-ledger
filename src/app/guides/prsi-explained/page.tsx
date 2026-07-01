import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { PRSI } from "@/lib/constants/taxYear2026";
import { formatEUR, formatPercent } from "@/lib/utils/format";

const guide = getGuideBySlug("prsi-explained")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/prsi-explained",
});

const faqs = [
  {
    question: "What does PRSI actually pay for?",
    answer:
      "PRSI (Pay Related Social Insurance) funds Ireland's Social Insurance Fund, which pays for the State Pension (Contributory), Jobseeker's Benefit, Illness Benefit, Maternity and Paternity Benefit, and other social welfare payments — contingent on your contribution record.",
  },
  {
    question: "Is everyone on the same PRSI class?",
    answer:
      "No. Most private-sector employees are Class A. Public servants recruited before 1995, some self-employed people, and other categories fall under different classes (B, C, D, S, etc.) with different rates and benefit entitlements.",
  },
];

export default function PrsiExplainedPage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        PRSI is often lumped in with "tax" on a payslip, but it works
        differently: it's a social insurance contribution that builds your
        entitlement to future benefits, not a general tax.
      </GuideP>

      <GuideH2>Class A: the standard employee rate</GuideH2>
      <GuideP>
        Most private-sector employees pay Class A PRSI at{" "}
        {formatPercent(PRSI.employeeRateJanToSep)} of gross earnings for most
        of 2026, rising to {formatPercent(PRSI.employeeRateFromOct)} from 1
        October 2026 as part of a phased increase to fund the Social
        Insurance Fund. If you earn {formatEUR(PRSI.weeklyExemptionThreshold)}{" "}
        or less per week, you pay no PRSI at all for that week.
      </GuideP>

      <GuideH2>Why your PRSI record matters</GuideH2>
      <GuideList
        items={[
          "The State Pension (Contributory) requires a minimum number of paid contributions — currently 520 (10 years) for any pension, with 40 years for the maximum rate.",
          "Jobseeker's Benefit, Illness Benefit and other short-term supports also require a minimum recent contribution history.",
          "Gaps in your PRSI record (e.g. time abroad, unpaid leave) can reduce your eventual pension unless covered by credits or voluntary contributions.",
          "You can check your own contribution record via Revenue's myAccount or the Department of Social Protection.",
        ]}
      />

      <GuideH2>Self-employed PRSI (Class S)</GuideH2>
      <GuideP>
        Self-employed individuals pay Class S PRSI at{" "}
        {formatPercent(PRSI.selfEmployedRate)} on income above{" "}
        {formatEUR(PRSI.selfEmployedThreshold)} a year, with a minimum
        annual payment of {formatEUR(PRSI.selfEmployedMinimumAnnual)} where
        liable. Class S contributions cover a narrower range of benefits
        than Class A.
      </GuideP>

      <GuideWorkedExample title="PRSI on a €50,000 salary (Class A)">
        <p>€50,000 × 4.2% ≈ €2,100 for the January–September period rate</p>
        <p className="text-xs text-slate">
          The exact annual figure blends the pre- and post-October rates —
          our calculator uses the January–September rate as a simplified
          annual estimate and flags the October change.
        </p>
      </GuideWorkedExample>

      <GuideCallout title="See PRSI alongside Income Tax and USC">
        Use our{" "}
        <a href="/calculators/paye" className="underline">
          PAYE calculator
        </a>{" "}
        to see all three deductions together against your take-home pay.
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
