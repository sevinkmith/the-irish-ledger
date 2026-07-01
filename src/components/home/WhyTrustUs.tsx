import { ShieldCheck, BookOpenCheck, Calculator, EyeOff } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const POINTS = [
  {
    icon: BookOpenCheck,
    title: "Sourced from Revenue & the Central Bank",
    body: "Every rate, band and credit traces back to Revenue.ie or Central Bank of Ireland mortgage rules — never guessed.",
  },
  {
    icon: Calculator,
    title: "Full workings, every time",
    body: "Every calculator shows the step-by-step breakdown behind the final number, not just a single figure.",
  },
  {
    icon: EyeOff,
    title: "No sign-up, no email gate",
    body: "Every calculator and guide is free to use in full. We'll never ask for your email to see a result.",
  },
  {
    icon: ShieldCheck,
    title: "Clear about our limits",
    body: "We flag exactly where a calculation is a simplification, and when to speak to a professional instead.",
  },
];

export function WhyTrustUs() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why trust us"
          title="Built to be checked, not just believed"
          description="We'd rather you verify a number against Revenue.ie than take our word for it — so we make that easy."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {POINTS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-dim text-gold">
                <p.icon size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display text-lg text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
