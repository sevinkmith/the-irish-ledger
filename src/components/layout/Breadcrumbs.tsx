import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/ui/Container";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper-dim/60">
      <Container>
        <ol className="flex flex-wrap items-center gap-1.5 py-3 text-xs text-slate">
          {items.map((item, i) => (
            <Fragment key={item.label}>
              {i > 0 && <span aria-hidden className="text-line-strong">/</span>}
              <li>
                {item.href ? (
                  <Link href={item.href} className="hover:text-cobalt hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-ink">{item.label}</span>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
