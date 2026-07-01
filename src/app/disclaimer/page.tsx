import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";
import { RATES_LAST_CHECKED } from "@/lib/constants/taxYear2026";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description: `Important information about how to use ${SITE.name}'s calculators and guides.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <Container className="max-w-2xl py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Disclaimer</h1>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-2">
          <p className="rounded-xl border border-gold/40 bg-gold-dim px-5 py-4 text-sm font-medium text-ink">
            This calculator is provided for informational purposes only and
            should not be considered financial or tax advice.
          </p>
          <section>
            <h2 className="font-display text-xl text-ink">Not financial or tax advice</h2>
            <p className="mt-2">
              Every calculator and guide on {SITE.name} is designed to help
              you understand, in general terms, how Irish tax and mortgage
              rules work and roughly where you stand. They are not a
              substitute for advice from a qualified accountant, tax
              advisor, mortgage broker, or financial planner who can assess
              your full circumstances.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Rates and rules change</h2>
            <p className="mt-2">
              We update our figures after each Budget and when Revenue or
              the Central Bank of Ireland publish changes, but tax and
              mortgage rules are complex and change over time. Rates on this
              site were last checked in {RATES_LAST_CHECKED}. Always confirm
              current rates directly with Revenue.ie or the Central Bank of
              Ireland before making a decision.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Simplifications</h2>
            <p className="mt-2">
              To keep calculators usable, some are simplified — for example,
              our PAYE calculator uses standard personal credits and doesn&apos;t
              include every possible credit (like Rent Tax Credit or Home
              Carer Credit), and our CGT calculator flags Principal Private
              Residence relief without calculating its exact apportionment.
              Each calculator&apos;s methodology section explains its
              specific assumptions.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">No liability</h2>
            <p className="mt-2">
              {SITE.name} accepts no liability for decisions made based on
              information provided on this site. Use of this site is
              governed by our{" "}
              <a href="/terms" className="text-cobalt underline">
                Terms of Use
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
