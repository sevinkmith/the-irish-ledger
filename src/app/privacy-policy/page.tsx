import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${SITE.name} handles data.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <Container className="max-w-2xl py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate">Last updated: {new Date().toLocaleDateString("en-IE", { year: "numeric", month: "long" })}</p>

        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-2">
          <section>
            <h2 className="font-display text-xl text-ink">Calculator data stays on your device</h2>
            <p className="mt-2">
              The figures you enter into our calculators — salary, purchase
              prices, savings, and so on — are processed entirely in your
              browser. We do not transmit, store, or log the numbers you
              enter into any calculator.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Analytics</h2>
            <p className="mt-2">
              We may use privacy-respecting analytics to understand which
              pages are useful and to fix broken pages, such as aggregate
              page-view counts. This does not include the contents of any
              calculator form.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Advertising</h2>
            <p className="mt-2">
              If and when advertising is enabled on this site (for example
              via Google AdSense), the ad provider may use cookies to serve
              relevant ads. You can control ad personalisation through your
              browser or Google&apos;s Ad Settings. We&apos;ll update this
              policy with specifics if and when that&apos;s switched on.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{" "}
              <a href="mailto:hello@theirishledger.ie" className="text-cobalt underline">
                hello@theirishledger.ie
              </a>
              .
            </p>
          </section>
          <p className="text-xs text-slate">
            This is a template starting point, not legal advice — review it
            with a professional before relying on it for a live site,
            especially once analytics or advertising are switched on.
          </p>
        </div>
      </Container>
    </>
  );
}
