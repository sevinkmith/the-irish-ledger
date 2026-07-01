import Link from "next/link";
import { Wallet, TrendingUp, Home as HomeIcon, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CALCULATORS } from "@/lib/content/calculators";

const ICONS = { wallet: Wallet, "trending-up": TrendingUp, home: HomeIcon };

export function FeaturedCalculators() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Calculators"
          title="Start with a calculator"
          description="Every calculator shows its full workings — no black boxes, no vague estimates."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-cobalt hover:shadow-[0_16px_40px_-24px_rgba(14,42,71,0.4)]"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt-dim text-cobalt">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {c.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt">
                  Open calculator
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
