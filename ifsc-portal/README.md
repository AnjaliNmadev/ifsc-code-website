# IFSC Finder & Banking Portal

A programmatic-SEO Next.js 14 (App Router) site for looking up Indian bank branch IFSC/MICR
codes, with a full crawlable directory (`/bank/state/district/branch`), JSON-LD structured data,
a dual search UI, and AdSense-ready ad slots.

## Stack

- Next.js 14 (App Router, static generation via `generateStaticParams`)
- TypeScript, Tailwind CSS
- lucide-react icons
- Zero backend — data comes from a bundled JSON dataset plus a live public IFSC API

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx                              Homepage — dual search (code lookup + cascading browser)
  [bank]/page.tsx                       Bank page — list of states
  [bank]/[state]/page.tsx               State page — list of districts
  [bank]/[state]/[district]/page.tsx    District page — list of branches
  [bank]/[state]/[district]/[branch]/page.tsx   Branch ("money") page — full details + JSON-LD
  about, privacy-policy, disclaimer, contact/page.tsx
  sitemap.ts, robots.ts
components/    UI building blocks (search, dropdowns, cards, ad slots, breadcrumbs)
lib/           data.ts (dataset access), api.ts (live lookup), seo.ts, schema.ts, utils.ts
data/branches.json   bundled sample dataset
```

## SEO implementation

- Every route (`bank`, `state`, `district`, `branch`) is statically generated at build time via
  `generateStaticParams`, so Google can crawl and index each level without JavaScript.
- Each page sets a unique `<title>`, meta description, canonical URL, and OpenGraph tags via
  `lib/seo.ts`.
- Branch pages emit `BankOrCreditUnion` and `BreadcrumbList` JSON-LD (`lib/schema.ts`) for rich
  results eligibility.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically from
  the same dataset that powers the pages, so they never fall out of sync.

## Data engine — important note on scale

There is no free, public API that lists *every* Indian bank branch hierarchically by
bank → state → district → branch — the well-known public APIs (e.g. Razorpay's
`https://ifsc.razorpay.com/{IFSC}`) only do a **reverse lookup for a single known code**.

To keep this project genuinely "zero backend," it ships with:

1. **`data/branches.json`** — a small, real-shaped sample dataset (a handful of branches across
   SBI, HDFC Bank, ICICI Bank, and PNB) that drives the entire directory: routing, static
   generation, sitemap, and the cascading dropdowns. This is what you should replace.
2. **`lib/api.ts`** — a live client-side lookup against the Razorpay IFSC API for any 11-digit
   code a visitor types in that isn't in your local dataset, with clean loading/error/not-found
   states and session-level caching.

**To scale to the full national dataset:** replace `data/branches.json` with a complete IFSC
dataset (several open-source CSV/JSON IFSC exports exist on GitHub) reshaped to match the
`BranchRecord` fields in `lib/types.ts`. Every helper in `lib/data.ts` is dataset-size agnostic —
nothing else needs to change, and `generateStaticParams` will simply produce more pages
(consider Next.js's `dynamicParams`/ISR options if the dataset grows into the hundreds of
thousands of branches, so you don't statically build all of them up front).

## AdSense slots

`components/AdSlot.tsx` renders three placeholder containers (`top-banner`, `sidebar-sticky`,
`post-result-native`) already positioned on the homepage, bank/state/district pages, and branch
pages. Once your AdSense account is approved:

1. Uncomment the loader `<script>` in `app/layout.tsx` and add your `data-ad-client` ID.
2. Replace the placeholder `<div>` inside `AdSlot.tsx` with a real `<ins className="adsbygoogle">`
   unit, using the `data-ad-slot` ID from your AdSense dashboard for each placement.

## Deployment

- **Vercel:** works out of the box (`vercel.json` included) — just set `NEXT_PUBLIC_SITE_URL` in
  the project's environment variables.
- **Netlify:** `netlify.toml` is configured with `@netlify/plugin-nextjs`. Set
  `NEXT_PUBLIC_SITE_URL` in Site settings → Environment variables.

Before going live, also:

- Replace the Google Search Console verification token placeholder in `app/layout.tsx`.
- Replace the contact email in `app/contact/page.tsx`.
- Update the "Last updated" date and any jurisdiction-specific wording in Privacy Policy /
  Disclaimer to match your actual business details.
