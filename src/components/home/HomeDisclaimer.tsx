import { Container } from "@/components/ui/Container";
import { Info } from "lucide-react";
import { SITE } from "@/lib/content/site";

export function HomeDisclaimer() {
  return (
    <section className="border-t border-line bg-ink">
      <Container className="flex items-start gap-4 py-10 text-paper/70">
        <Info size={20} className="mt-0.5 shrink-0 text-paper/50" />
        <p className="text-sm leading-relaxed">
          <strong className="font-semibold text-paper">A note on accuracy.</strong>{" "}
          {SITE.name}&apos;s calculators are provided for informational
          purposes only and should not be considered financial or tax
          advice. Tax rules change with each Budget — we keep our figures up
          to date, but your own circumstances (reliefs, credits, marital
          status, residency) can change the result. Always confirm important
          decisions with Revenue.ie, the Central Bank of Ireland, or a
          qualified advisor.
        </p>
      </Container>
    </section>
  );
}
