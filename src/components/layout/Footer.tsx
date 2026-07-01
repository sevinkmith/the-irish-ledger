import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CALCULATORS } from "@/lib/content/calculators";
import { GUIDES } from "@/lib/content/guides";
import { FOOTER_LEGAL_LINKS, SITE } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/80">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-paper"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M4 17h4M4 12h9M4 7h16"
                    stroke="#0e2a47"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="leading-none">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-paper/50">
                  The
                </span>
                <span className="font-display text-base font-semibold leading-tight text-paper">
                  Irish Ledger
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {SITE.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Calculators
            </p>
            <ul className="mt-4 space-y-2.5">
              {CALCULATORS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="text-sm text-paper/75 hover:text-paper"
                  >
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Guides
            </p>
            <ul className="mt-4 space-y-2.5">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="text-sm text-paper/75 hover:text-paper"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/75 hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/10 pt-6">
          <p className="text-xs leading-relaxed text-paper/50">
            {SITE.name} is an independent, free resource and is not
            affiliated with Revenue, the Central Bank of Ireland, or any
            government body. All calculators are provided for informational
            purposes only and do not constitute financial or tax advice.
          </p>
          <p className="mt-3 text-xs text-paper/40">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
