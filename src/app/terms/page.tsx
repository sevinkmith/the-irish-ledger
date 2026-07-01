import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <Container className="max-w-2xl py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Terms of Use</h1>
        <p className="mt-3 text-sm text-slate">Last updated: {new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long" })}</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-2">
          <section>
            <h2 className="font-display text-xl text-ink">Use of this site</h2>
            <p className="mt-2">
              {SITE.name} provides free calculators and guides for general
              informational purposes. By using this site, you agree that
              results are estimates, not advice, and that you&apos;re
              responsible for verifying any figure before relying on it for
              a financial or tax decision.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">No professional relationship</h2>
            <p className="mt-2">
              Using this site does not create an advisory, fiduciary, or
              professional relationship between you and {SITE.name}. We are
              not a registered tax agent, financial advisor, or mortgage
              broker.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Limitation of liability</h2>
            <p className="mt-2">
              {SITE.name} is provided &quot;as is&quot; without warranties of
              any kind. To the fullest extent permitted by law, we are not
              liable for any loss or damage arising from reliance on
              information or calculations provided on this site.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Changes</h2>
            <p className="mt-2">
              We may update these terms as the site evolves. Continued use
              of the site after changes are posted constitutes acceptance of
              the updated terms.
            </p>
          </section>
          <p className="text-xs text-slate">
            This is a template starting point, not legal advice — have it
            reviewed by a solicitor before relying on it for a live,
            monetised site.
          </p>
        </div>
      </Container>
    </>
  );
}
