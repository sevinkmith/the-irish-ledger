import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GUIDES } from "@/lib/content/guides";

export function RelatedGuides({ slugs }: { slugs: string[] }) {
  const guides = GUIDES.filter((g) => slugs.includes(g.slug));
  if (guides.length === 0) return null;

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="flex items-center gap-2 font-display text-lg text-ink">
        <BookOpen size={18} className="text-cobalt" />
        Related guides
      </h3>
      <ul className="mt-4 space-y-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="text-sm font-medium text-cobalt hover:underline"
            >
              {g.title}
            </Link>
            <p className="text-xs text-slate">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
