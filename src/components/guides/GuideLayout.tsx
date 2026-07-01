import Link from "next/link";
import { Calculator } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { CalculatorDisclaimer } from "@/components/calculators/CalculatorDisclaimer";
import { AdSlot } from "@/components/monetisation/AdSlot";
import { getCalculatorBySlug } from "@/lib/content/calculators";
import { GuideMeta } from "@/lib/content/guides";
import { ReactNode } from "react";

export function GuideLayout({
  guide,
  children,
}: {
  guide: GuideMeta;
  children: ReactNode;
}) {
  const relatedCalculator = guide.relatedCalculatorSlug
    ? getCalculatorBySlug(guide.relatedCalculatorSlug)
    : undefined;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: "Home", path: "/" },
          { label: "Guides", path: "/guides" },
          { label: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="max-w-2xl">
            <Badge tone="cobalt">{guide.category}</Badge>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink">
              {guide.title}
            </h1>
            <p className="mt-3 text-sm text-slate">{guide.readTimeMinutes} min read</p>

            <div className="prose-guide mt-8 space-y-6 text-[15px] leading-relaxed text-ink-2">
              {children}
            </div>

            <AdSlot variant="in-content" className="mt-10" />

            <div className="mt-10">
              <CalculatorDisclaimer />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {relatedCalculator && (
              <div className="rounded-2xl border border-line-strong bg-white p-6">
                <Calculator size={20} className="text-cobalt" />
                <h2 className="mt-3 font-display text-lg text-ink">
                  {relatedCalculator.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {relatedCalculator.description}
                </p>
                <Link
                  href={`/calculators/${relatedCalculator.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
                >
                  Open calculator →
                </Link>
              </div>
            )}
            <AdSlot variant="rectangle" />
          </aside>
        </div>
      </Container>
    </>
  );
}
