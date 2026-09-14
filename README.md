# IFSC Finder & Banking Portal

A programmatic-SEO Next.js 14 (App Router) site for looking up Indian bank branch IFSC/MICR
codes, backed by a Supabase database holding the **full national dataset (~180,000+ branches)**.

## Stack

- Next.js 14 (App Router, Incremental Static Regeneration)
- TypeScript, Tailwind CSS
- lucide-react icons
- **Supabase** (Postgres) — the only backend piece; free tier is enough

## One-time setup (do this before `npm run dev` / deploying)

### 1. Create a free Supabase project
Go to [supabase.com](https://supabase.com) → sign up → "New project". Pick any name/password/region
and wait ~2 minutes for it to finish provisioning.

### 2. Run the database schema
In your Supabase project: **SQL Editor → New query** → open `supabase/schema.sql` from this repo,
copy its entire contents, paste, and click **Run**. This creates the tables, the auto-slug
columns, the summary views, and the "public read-only" security policy.

### 3. Import the full IFSC dataset
1. Download `IFSC.csv` from the latest release: https://github.com/razorpay/ifsc/releases/latest
   (look under "Assets").
2. In Supabase: **Table Editor → raw_ifsc → Insert → Import data from CSV**.
3. Upload the file, check the column mapping looks sensible, click **Import**. This can take a
   few minutes for 180,000+ rows.
4. Go back to **SQL Editor**, open `supabase/schema.sql` again, and run **only the SQL below the
   "STOP HERE" comment** (the `insert into branches ...` statement and everything after it). This
   copies the raw import into the real `branches` table with proper types and auto-generated
   slugs.

### 4. Connect the website to Supabase
In Supabase: **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
Then in this project:
```bash
cp .env.example .env.local
```
and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=<your project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon public key>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
On Vercel/Netlify, add the same three variables under the project's Environment Variables
settings.

That's it — `getAllBanks()`, the bank/state/district/branch pages, the cascading dropdowns, and
the IFSC search box now all read from the full dataset.

## Getting started (local dev)

```bash
npm install
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
components/    UI building blocks (search, dropdowns, cards, ad slots, breadcrumbs, FAQ content)
lib/           data.ts (Supabase queries), supabase.ts (client), api.ts (IFSC lookup), seo.ts, schema.ts
supabase/schema.sql   full database setup script (run once, see above)
```

## Why Supabase instead of a bundled JSON file

India has ~180,000 bank branches. That's too much data to bundle directly into a Next.js app (it
would bloat every page load and make builds extremely slow). A real, free-tier database is the
correct fix — Supabase's free tier (500MB database, no credit card) comfortably fits this dataset
with room to spare.

Because the full dataset is so large, the bank/state/district/branch pages use **Incremental
Static Regeneration** (`dynamicParams = true`, `revalidate = 3600`): only the ~20 most common
banks are pre-built at deploy time; every other page (state, district, and every branch page) is
generated the first time someone — or Google — visits it, then cached for an hour. This keeps
deploys fast regardless of dataset size, while still giving every one of the 180,000+ branches its
own real, indexable URL over time.

## SEO implementation

- Every bank page and bank+state page is listed in `/sitemap.xml`, giving Google tens of
  thousands of entry points to discover every district and branch page by following links.
- Each page sets a unique `<title>`, meta description, canonical URL, and OpenGraph tags via
  `lib/seo.ts`.
- Branch pages emit `BankOrCreditUnion` and `BreadcrumbList` JSON-LD (`lib/schema.ts`) for rich
  results eligibility. The homepage and bank pages emit `FAQPage` JSON-LD.

## Keeping the dataset up to date

The razorpay/ifsc project publishes a new release (with an updated `IFSC.csv`) every few weeks as
the RBI updates branch data. To refresh: truncate `raw_ifsc`, re-import the new CSV, and re-run
the `insert into branches ... on conflict (ifsc) do nothing` step from `supabase/schema.sql` — it
only adds branches that aren't already there, so it's safe to re-run periodically.

## AdSense slots

`components/AdSlot.tsx` renders three placeholder containers (`top-banner`, `sidebar-sticky`,
`post-result-native`) already positioned on the homepage, bank/state/district pages, and branch
pages. Once your AdSense account is approved:

1. Uncomment the loader `<script>` in `app/layout.tsx` and add your `data-ad-client` ID.
2. Replace the placeholder `<div>` inside `AdSlot.tsx` with a real `<ins className="adsbygoogle">`
   unit, using the `data-ad-slot` ID from your AdSense dashboard for each placement.

## Deployment

- **Vercel:** works out of the box (`vercel.json` included) — set the three environment
  variables from step 4 above in the project's settings.
- **Netlify:** `netlify.toml` is configured with `@netlify/plugin-nextjs`. Set the same three
  environment variables in Site settings → Environment variables.

Before going live, also replace the contact email in `app/contact/page.tsx`.
