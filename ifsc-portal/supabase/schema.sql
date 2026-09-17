-- ============================================================================
-- IFSC Finder — Supabase database setup
-- ============================================================================
-- Run this entire file ONCE in Supabase: Dashboard → SQL Editor → New query
-- → paste this whole file → Run. It is safe to re-run (uses IF NOT EXISTS /
-- OR REPLACE everywhere), so don't worry about running it twice.
-- ============================================================================

-- 1. Helper function: turns "State Bank of India" into "state-bank-of-india"
create or replace function slugify(v text) returns text
language sql immutable as $$
  select trim(both '-' from regexp_replace(lower(coalesce(v, '')), '[^a-z0-9]+', '-', 'g'));
$$;

-- 1b. Helper function: title-cases a bank/branch name like initcap() does,
--     but then re-uppercases known bank acronyms. Plain initcap("HDFC BANK")
--     produces "Hdfc Bank" (it only capitalizes the first letter of each
--     word, everything else is lowercased) — this fixes that for HDFC,
--     ICICI, SBI, and the other acronym-named banks in the dataset.
create or replace function smart_initcap(v text) returns text
language plpgsql immutable as $$
declare
  result text := initcap(trim(coalesce(v, '')));
  acronyms text[] := array[
    'HDFC','ICICI','IDBI','SBI','PNB','UCO','RBL','DCB','IDFC','CSB','TMB',
    'DBS','SVC','NKGSB','TJSB','ESAF','HSBC','SCB','NESFB','KVB','UBI','BOI','BOB','JK'
  ];
  a text;
begin
  foreach a in array acronyms loop
    result := regexp_replace(result, '\m' || a || '\M', a, 'gi');
  end loop;
  return result;
end;
$$;

-- 2. Staging table — this matches the column headers of the official
--    razorpay/ifsc CSV export (https://github.com/razorpay/ifsc/releases,
--    look for "IFSC.csv" under the latest release's Assets). Every column is
--    plain text here on purpose, so the CSV import never fails on type
--    mismatches — we convert types in step 4 below.
create table if not exists raw_ifsc (
  "IFSC" text,
  "BANK" text,
  "BRANCH" text,
  "ADDRESS" text,
  "CITY" text,
  "DISTRICT" text,
  "STATE" text,
  "CONTACT" text,
  "MICR" text,
  "UPI" text,
  "NEFT" text,
  "RTGS" text,
  "IMPS" text,
  "BANKCODE" text,
  "CENTRE" text,
  "SWIFT" text
);

-- ============================================================================
-- STOP HERE the first time. Now:
--   1. Download IFSC.csv from https://github.com/razorpay/ifsc/releases/latest
--   2. In Supabase: Table Editor → raw_ifsc → Insert → Import data from CSV
--   3. Upload IFSC.csv, confirm the column mapping matches, click Import
-- Once the import finishes, come back and run everything BELOW this line.
-- ============================================================================

-- 3. The real table the website reads from, with slugs generated
--    automatically from the bank/branch/district/state names.
create table if not exists branches (
  id bigint generated always as identity primary key,
  ifsc text unique not null,
  bank_name text not null,
  branch text not null,
  address text,
  city text,
  district text not null,
  state text not null,
  contact text,
  micr text,
  swift text,
  upi boolean default false,
  neft boolean default false,
  rtgs boolean default false,
  imps boolean default false,
  bank_slug text generated always as (slugify(bank_name)) stored,
  district_slug text generated always as (slugify(district)) stored,
  state_slug text generated always as (slugify(state)) stored,
  branch_slug text generated always as (slugify(branch) || '-' || lower(ifsc)) stored
);

-- If `branches` already existed from an earlier run of this file (before the
-- `swift` column was added), this adds it without touching existing rows.
alter table branches add column if not exists swift text;

create index if not exists idx_branches_ifsc on branches (ifsc);
create index if not exists idx_branches_bank on branches (bank_slug);
create index if not exists idx_branches_bank_state on branches (bank_slug, state_slug);
create index if not exists idx_branches_bank_state_district
  on branches (bank_slug, state_slug, district_slug);

-- 4. Copy + clean the imported CSV data into the real table.
--    Safe to re-run: it skips IFSC codes that are already present.
insert into branches (ifsc, bank_name, branch, address, city, district, state, contact, micr, swift, upi, neft, rtgs, imps)
select
  upper(trim(r."IFSC")),
  smart_initcap(r."BANK"),
  initcap(trim(r."BRANCH")),
  initcap(trim(r."ADDRESS")),
  initcap(trim(r."CITY")),
  initcap(trim(r."DISTRICT")),
  initcap(trim(r."STATE")),
  trim(r."CONTACT"),
  nullif(trim(r."MICR"), ''),
  nullif(upper(trim(r."SWIFT")), ''),
  lower(trim(r."UPI")) in ('true', 't', '1', 'yes'),
  lower(trim(r."NEFT")) in ('true', 't', '1', 'yes'),
  lower(trim(r."RTGS")) in ('true', 't', '1', 'yes'),
  lower(trim(r."IMPS")) in ('true', 't', '1', 'yes')
from raw_ifsc r
where r."IFSC" is not null
  and trim(r."IFSC") <> ''
on conflict (ifsc) do nothing;

-- If you already ran the import once before the `swift` column existed, this
-- backfills SWIFT codes for branches already in `branches` without
-- re-importing anything or duplicating rows.
update branches b
set swift = nullif(upper(trim(r."SWIFT")), '')
from raw_ifsc r
where upper(trim(r."IFSC")) = b.ifsc
  and b.swift is null
  and nullif(upper(trim(r."SWIFT")), '') is not null;

-- 4b. One-time fix-up for data already imported before smart_initcap()
--     existed (e.g. bank_name = "Hdfc Bank" instead of "HDFC Bank"). Safe to
--     re-run — it's a no-op once every row is already correctly cased.
update branches
set bank_name = smart_initcap(bank_name)
where bank_name <> smart_initcap(bank_name);

-- 5. Summary views that power the bank/state/district listing pages and the
--    cascading dropdowns, pre-aggregated so the website never has to count
--    180,000+ rows on every page load.
create or replace view bank_summary as
select bank_slug as slug, bank_name as name, count(*)::int as branch_count
from branches
group by bank_slug, bank_name
order by bank_name;

create or replace view state_summary as
select bank_slug, state_slug as slug, state as name, count(*)::int as branch_count
from branches
group by bank_slug, state_slug, state
order by state;

create or replace view district_summary as
select bank_slug, state_slug, district_slug as slug, district as name, count(*)::int as branch_count
from branches
group by bank_slug, state_slug, district_slug, district
order by district;

-- 6. Security: allow anyone to READ (search the site), nobody to write.
--    This is what makes it safe to use the public "anon" key in the website.
alter table branches enable row level security;

drop policy if exists "Public read access" on branches;
create policy "Public read access" on branches
  for select using (true);

-- Views inherit the security of their underlying table automatically.

-- 7a. SWIFT fallback view — most Indian bank branches don't have their own
--     SWIFT code (only the bank's head office / forex-authorised branches
--     do). When a branch has no SWIFT of its own, the website falls back to
--     showing the bank's head-office SWIFT code instead (clearly labelled
--     as "bank fallback, not this branch's own" in the UI).
--     This picks ONE branch per bank that already has a real swift value in
--     the `swift` column, preferring branches that look like a head/
--     principal/corporate office. It relies entirely on SWIFT values already
--     present in `branches.swift` — it never invents a code. If a bank has
--     zero branches with a real SWIFT value, it simply won't appear here,
--     and the website will correctly show "Not available" for it.
create or replace view bank_swift_fallback as
select distinct on (bank_slug)
  bank_slug,
  swift as fallback_swift,
  branch as fallback_branch
from branches
where swift is not null
order by
  bank_slug,
  case
    when branch ilike '%head office%' then 0
    when branch ilike '%principal office%' then 0
    when branch ilike '%corporate office%' then 1
    when branch ilike '%main branch%' then 1
    when branch ilike '%regional office%' then 2
    else 3
  end,
  branch;

-- 7b. Quick sanity check — run this after importing data to see how much
--     real SWIFT coverage you actually have. If `banks_with_swift` is 0,
--     your imported CSV's SWIFT column was empty and you need a real SWIFT
--     data source (see the website chat for options) before this feature
--     will show anything besides "Not available".
-- select
--   count(*) filter (where swift is not null) as branches_with_own_swift,
--   count(distinct bank_slug) filter (where swift is not null) as banks_with_swift,
--   count(distinct bank_slug) as total_banks
-- from branches;

-- 7. Once you've confirmed the site works, you can free up space by
--    clearing the staging table (the real data now lives in `branches`):
-- truncate raw_ifsc;

-- ============================================================================
-- 8. Gold/Silver rate history — powers the price chart and day-by-day table
--    on the gold-rate/silver-rate pages. One row per calendar day, storing
--    the national spot rate (per gram, INR). Each city page derives its own
--    figure by applying its small multiplier from lib/live-rates.ts to
--    these same national values — so this one small table is all the
--    history storage the whole feature needs, regardless of how many
--    cities you add.
-- ============================================================================
create table if not exists metal_rate_history (
  rate_date date primary key,
  gold_24k_per_gram numeric not null,
  silver_per_gram numeric not null,
  recorded_at timestamptz not null default now()
);

alter table metal_rate_history enable row level security;

drop policy if exists "Public read access" on metal_rate_history;
create policy "Public read access" on metal_rate_history
  for select using (true);

-- Row insertion happens only via the app's daily cron route using the
-- service_role key (which bypasses RLS), never from the browser — so no
-- insert/update policy is defined here on purpose.

-- Daily snapshot of the OpenFacet Diamond Composite Index (DCX), so the
-- diamond price pages can show a real weekly / monthly / yearly trend chart
-- instead of only the upstream feed's 24h number. Same cron + RLS pattern
-- as metal_rate_history above.
create table if not exists diamond_rate_history (
  rate_date date primary key,
  dcx_usd numeric not null,
  dcx_inr numeric not null,
  fx_rate numeric not null,
  recorded_at timestamptz not null default now()
);

alter table diamond_rate_history enable row level security;

drop policy if exists "Public read access" on diamond_rate_history;
create policy "Public read access" on diamond_rate_history
  for select using (true);

