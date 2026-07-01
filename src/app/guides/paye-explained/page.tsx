import { GuideLayout } from "@/components/guides/GuideLayout";
import { GuideH2, GuideP, GuideList, GuideCallout, GuideWorkedExample } from "@/components/guides/GuideElements";
import { FaqSchema } from "@/components/seo/FaqSchema";
import { getGuideBySlug } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";

const guide = getGuideBySlug("paye-explained")!;

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: "/guides/paye-explained",
});

const faqs = [
  {
    question: "Is PAYE a tax, or a collection system?",
    answer:
      "PAYE (Pay As You Earn) is a collection system, not a separate tax. It's the mechanism your employer uses to deduct Income Tax, USC and PRSI from your salary before you're paid, and pay it to Revenue on your behalf.",
  },
  {
    question: "What is a tax credit certificate?",
    answer:
      "Revenue issues your employer a Tax Credit Certificate (TCC) showing your tax credits and rate band, so they can calculate your deductions correctly each pay period. You can view and manage yours in Revenue's myAccount service.",
  },
];

export default function PayeExplainedPage() {
  return (
    <GuideLayout guide={guide}>
      <GuideP>
        If you're employed in Ireland, you've almost certainly paid tax
        through PAYE without ever filing a return. Here's what's actually
        happening to your salary before it reaches your bank account.
      </GuideP>

      <GuideH2>What PAYE actually is</GuideH2>
      <GuideP>
        PAYE stands for Pay As You Earn. It isn't a tax in itself — it's the
        system employers use to deduct Income Tax, USC and PRSI directly
        from your wages each time you're paid, and remit that money to
        Revenue on your behalf. You receive your salary already net of these
        deductions.
      </GuideP>

      <GuideH2>How your employer knows what to deduct</GuideH2>
      <GuideList
        items={[
          "Revenue issues a Tax Credit Certificate (RPN) to your employer, showing your tax credits and standard rate band.",
          "Your employer runs payroll each period (weekly, fortnightly or monthly), calculating Income Tax, USC and PRSI based on that RPN.",
          "The deductions are cumulative across the tax year by default, so credits and bands are spread evenly — this is why a bonus or one-off payment can look heavily taxed in a single pay period.",
          "Your payslip shows gross pay, each deduction, and net pay for that period.",
        ]}
      />

      <GuideWorkedExample title="Reading a payslip">
        <p>Gross pay: what you earned before any deductions.</p>
        <p>PAYE (Income Tax): calculated on your taxable pay, minus credits.</p>
        <p>USC: calculated on gross pay in bands, no credits applied.</p>
        <p>PRSI: calculated on gross pay at a flat rate above the weekly threshold.</p>
        <p>Net pay: what actually lands in your account.</p>
      </GuideWorkedExample>

      <GuideH2>Emergency tax</GuideH2>
      <GuideP>
        If your employer doesn't have an up-to-date RPN for you — commonly
        when starting a new job before registering it with Revenue — you can
        be placed on emergency tax, which withholds a higher rate than
        you'll likely owe. Registering your new job promptly in myAccount
        avoids this.
      </GuideP>

      <GuideCallout title="Want to see the numbers for your own salary?">
        Our{" "}
        <a href="/calculators/paye" className="underline">
          PAYE calculator
        </a>{" "}
        shows the full Income Tax, USC and PRSI breakdown for any gross
        salary.
      </GuideCallout>

      <FaqSchema items={faqs} />
    </GuideLayout>
  );
}
