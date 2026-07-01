import { Card } from "@/components/ui/Card";

export interface ProfessionalListing {
  name: string;
  specialty: string;
  blurb: string;
  href: string;
}

/**
 * Placeholder for a future lead-gen / affiliate slot — e.g. a mortgage
 * broker or tax advisor relevant to the calculator being viewed. Rendered
 * subtly, clearly labelled "Sponsored", never blocking the calculator
 * itself. Pass real `listings` once partners are onboarded; renders nothing
 * if the array is empty so it never shows fake content.
 */
export function RecommendedProfessional({
  listings = [],
  heading = "Talk to a professional",
}: {
  listings?: ProfessionalListing[];
  heading?: string;
}) {
  if (listings.length === 0) return null;

  return (
    <Card className="border-line bg-paper-dim/40">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate/70">
        Sponsored
      </p>
      <h3 className="font-display text-lg text-ink">{heading}</h3>
      <ul className="mt-4 space-y-4">
        {listings.map((p) => (
          <li key={p.name} className="rule-hairline pt-4 first:border-0 first:pt-0">
            <a href={p.href} className="text-sm font-semibold text-cobalt hover:underline">
              {p.name}
            </a>
            <p className="text-xs text-slate">{p.specialty}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate">{p.blurb}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
