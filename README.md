# The Irish Ledger

A free collection of Irish financial calculators and guides — PAYE take-home
pay, Capital Gains Tax, and mortgage affordability — built with Next.js
(App Router), TypeScript and Tailwind CSS v4.

## Stack

- **Next.js 16** (App Router, static generation — every page prerenders at build time)
- **TypeScript**, strict mode
- **Tailwind CSS v4**
- Self-hosted fonts via `@fontsource` (Fraunces, Inter, IBM Plex Mono) — no runtime call to Google Fonts
- `lucide-react` for icons, `clsx` for conditional classnames
- Zero external runtime dependencies for the calculators themselves — all logic is pure TypeScript in `src/lib/calculators`

## Project structure

```
src/
  app/                     Routes (App Router)
    calculators/           /calculators, /calculators/paye, /cgt, /mortgage-affordability
    guides/                /guides + 6 guide pages
    about, contact, privacy-policy, terms, disclaimer
    sitemap.ts, robots.ts  Generated XML sitemap + robots.txt
  components/
    ui/                    Base primitives (Container, Card, Button, form fields...)
    layout/                Header, Footer, Breadcrumbs
    home/                  Homepage sections
    calculators/           The 3 calculator apps + shared StatementPanel/Methodology/Disclaimer
    guides/                Shared guide layout + typography building blocks
    seo/                   FAQPage / BreadcrumbList / WebApplication JSON-LD components
    monetisation/          AdSlot, RecommendedProfessional, SponsoredPartner placeholders
  lib/
    calculators/           paye.ts, cgt.ts, mortgage.ts — pure calculation logic, fully typed
    constants/              taxYear2026.ts — every rate/band/credit in one place
    content/                site.ts, calculators.ts, guides.ts — content registries
    seo/                    metadata.ts — canonical URL + Open Graph helper
    utils/                  format.ts — currency/percent formatting
```

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Build & lint

```bash
npm run build   # production build — every route is statically prerendered
npm run lint
npm run start   # serve the production build locally
```

## Deploy to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. Once live, update `SITE.url` in `src/lib/content/site.ts` to your real
   production domain (used for canonical URLs, Open Graph, and the sitemap),
   commit, and redeploy.

Alternatively, from the CLI:

```bash
npm install -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Updating tax rates for a new Budget

Every rate, band, credit and mortgage limit lives in one file:
`src/lib/constants/taxYear2026.ts`. Update the values there (and bump
`TAX_YEAR` / `RATES_LAST_CHECKED`) and every calculator, guide, and FAQ
answer that references a constant updates automatically.

## Turning on monetisation

Three placeholder components are already wired into calculator and guide
pages, styled subtly and ready to swap for real integrations without a
redesign:

- `src/components/monetisation/AdSlot.tsx` — replace the placeholder `<div>`
  with a real Google AdSense `<ins>` unit (or another network's tag).
- `src/components/monetisation/RecommendedProfessional.tsx` — pass a real
  `listings` array (e.g. mortgage brokers, tax advisors) to render sponsored
  listings; renders nothing if empty.
- `src/components/monetisation/SponsoredPartner.tsx` — a single inline
  sponsored-partner strip; renders nothing until `label`/`href` are set.

No popups or email gates are used anywhere on the site by design.

## Suggested next calculators

See the handoff notes in the final chat message for a prioritised list of
calculators to build next.
