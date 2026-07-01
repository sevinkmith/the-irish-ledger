import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { GUIDES } from "@/lib/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Guides",
  description:
    "Plain-English guides to Income Tax, USC, PRSI, Capital Gains Tax and mortgages in Ireland.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const categories = Array.from(new Set(GUIDES.map((g) => g.category)));

  return (
    <>
      <BreadcrumbSchema items={[{ label: "Home", path: "/" }, { label: "Guides", path: "/guides" }]} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <Container className="py-14 sm:py-20">
        <h1 className="font-display text-4xl text-ink">Guides</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate">
          Each guide covers one topic properly — worked examples, real
          numbers, and links to the calculator that puts it into practice.
        </p>

        <div className="mt-10 space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="font-display text-xl text-ink">{category}</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {GUIDES.filter((g) => g.category === category).map((g) => (
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
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
