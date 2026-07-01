import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "About",
  description: `Why ${SITE.name} exists, and how we build and maintain our calculators.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <Container className="max-w-2xl py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">About {SITE.name}</h1>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-2">
          <p>
            {SITE.name} exists because working out what you actually owe, or
            what you can actually borrow, in Ireland usually means digging
            through Revenue PDFs, Budget summaries, and Central Bank
            circulars — or trusting a random spreadsheet someone shared
            online.
          </p>
          <p>
            We built a focused set of calculators for the situations people
            search for most: take-home pay, Capital Gains Tax on a property
            or investment sale, and how much you can realistically borrow
            for a mortgage. Every calculator shows its full workings, so you
            can check the maths yourself rather than trusting a black box.
          </p>
          <p>
            We are an independent site, not affiliated with Revenue, the
            Central Bank of Ireland, or any bank or lender. We keep our
            rates and bands updated after each Budget, and we clearly flag
            where a calculation is a simplification of more complex rules.
          </p>
          <p>
            Nothing on this site is financial or tax advice — see our{" "}
            <a href="/disclaimer" className="text-cobalt underline">
              Disclaimer
            </a>{" "}
            for the details. If you spot something that looks wrong, please{" "}
            <a href="/contact" className="text-cobalt underline">
              get in touch
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
