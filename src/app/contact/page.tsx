import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with the ${SITE.name} team.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <Container className="max-w-2xl py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Contact</h1>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-2">
          <p>
            Spotted a figure that looks out of date, found a bug in a
            calculator, or have a suggestion for a guide or calculator
            we&apos;re missing? We&apos;d like to hear it.
          </p>
          <p>
            Email us at{" "}
            <a href="mailto:hello@theirishledger.ie" className="text-cobalt underline">
              hello@theirishledger.ie
            </a>
            . We read every message, though we can&apos;t offer personal
            financial or tax advice — for that, please speak to a qualified
            professional or contact Revenue directly.
          </p>
          <p className="text-sm text-slate">
            Replace this email address with your real inbox before
            launching, and consider a simple contact form once traffic
            picks up.
          </p>
        </div>
      </Container>
    </>
  );
}
