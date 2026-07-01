import { Wallet, TrendingUp, Home as HomeIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CALCULATORS } from "@/lib/content/calculators";
import { buildMetadata } from "@/lib/seo/metadata";

const ICONS = { wallet: Wallet, "trending-up": TrendingUp, home: HomeIcon };

export const metadata = buildMetadata({
  title: "Irish Financial Calculators",
  description:
    "Free calculators for PAYE take-home pay, Capital Gains Tax and mortgage affordability in Ireland.",
  path: "/calculators",
});

export default function CalculatorsIndexPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/calculators" }]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
      <Container className="py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Calculators</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate">
          Every calculator below shows its full workings and cites the
          Revenue or Central Bank rule behind each figure. Free to use, no
          sign-up required.
        </p>

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
                  <h2 className="mt-4 font-display text-xl text-ink">{c.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{c.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt">
                  Open calculator
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
