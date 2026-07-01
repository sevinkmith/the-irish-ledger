"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M4 17h4M4 12h9M4 7h16"
                stroke="#faf9f6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate">
              The
            </span>
            <span className="font-display text-lg font-semibold leading-tight text-ink">
              Irish Ledger
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-2 transition-colors hover:text-cobalt"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculators"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-2"
          >
            Explore Calculators
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper sm:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-ink-2 hover:bg-paper-dim"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/calculators"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-2.5 text-center text-sm font-semibold text-paper"
            >
              Explore Calculators
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
