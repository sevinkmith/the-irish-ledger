import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatEUR } from "@/lib/utils/format";
import { calculatePaye } from "@/lib/calculators/paye";

export function Hero() {
  // A live, real number for the hero's "receipt corner" — grounds the page
  // in an actual figure rather than a decorative stat.
  const sample = calculatePaye({ grossSalary: 50_000, filingStatus: "single" });

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-xs font-medium text-slate">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            Built on Revenue &amp; Central Bank guidance for 2026
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            Simple Irish Financial Calculators
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">
            Free calculators for salary, tax, mortgages and investing using
            Irish Revenue guidance. No sign-up, no email gate — just clear
            numbers explained plainly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/calculators" variant="secondary">
              Explore Calculators
            </Button>
            <Button href="/guides" variant="ghost">
              Read the Guides
            </Button>
          </div>
        </div>

        {/* Signature element: a live "statement corner" clipped like a receipt */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-line-strong bg-white p-6 shadow-[0_20px_60px_-25px_rgba(14,42,71,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              PAYE example · €50,000 salary
            </p>
            <p className="font-mono-figure mt-3 text-4xl font-semibold text-ink">
              {formatEUR(sample.netAnnualPay)}
            </p>
            <p className="mt-1 text-xs text-slate">Estimated take-home pay / year</p>

            <div className="mt-5 space-y-2 border-t border-dashed border-line-strong pt-4">
              <div className="flex justify-between text-xs text-slate">
                <span>Income Tax</span>
                <span className="font-mono-figure text-ink">
                  {formatEUR(sample.incomeTaxAfterCredits)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate">
                <span>USC</span>
                <span className="font-mono-figure text-ink">{formatEUR(sample.usc)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate">
                <span>PRSI</span>
                <span className="font-mono-figure text-ink">{formatEUR(sample.prsi)}</span>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-line-strong bg-gold-dim"
          />
        </div>
      </Container>
    </section>
  );
}
