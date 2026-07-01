import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { GUIDES } from "@/lib/content/guides";

export function RecentGuides() {
  const featured = GUIDES.slice(0, 3);

  return (
    <section className="border-t border-line bg-paper-dim/50 py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Guides"
            title="Understand the rules, in plain English"
            description="Each guide explains one topic properly, with real worked examples."
          />
          <Link
            href="/guides"
            className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt"
          >
            View all guides <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {featured.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-cobalt"
            >
              <Badge tone="cobalt">{g.category}</Badge>
              <h3 className="mt-4 font-display text-lg text-ink">{g.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                {g.description}
              </p>
              <p className="mt-4 text-xs font-medium text-slate">
                {g.readTimeMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
