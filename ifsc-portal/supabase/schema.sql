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
  upi boolean default false,
  neft boolean default false,
  rtgs boolean default false,
  imps boolean default false,
  bank_slug text generated always as (slugify(bank_name)) stored,
  district_slug text generated always as (slugify(district)) stored,
  state_slug text generated always as (slugify(state)) stored,
  branch_slug text generated always as (slugify(branch) || '-' || lower(ifsc)) stored
);

create index if not exists idx_branches_ifsc on branches (ifsc);
create index if not exists idx_branches_bank on branches (bank_slug);
create index if not exists idx_branches_bank_state on branches (bank_slug, state_slug);
create index if not exists idx_branches_bank_state_district
  on branches (bank_slug, state_slug, district_slug);

-- 4. Copy + clean the imported CSV data into the real table.
--    Safe to re-run: it skips IFSC codes that are already present.
insert into branches (ifsc, bank_name, branch, address, city, district, state, contact, micr, upi, neft, rtgs, imps)
select
  upper(trim(r."IFSC")),
  initcap(trim(r."BANK")),
  initcap(trim(r."BRANCH")),
  initcap(trim(r."ADDRESS")),
  initcap(trim(r."CITY")),
  initcap(trim(r."DISTRICT")),
  initcap(trim(r."STATE")),
  trim(r."CONTACT"),
  nullif(trim(r."MICR"), ''),
  lower(trim(r."UPI")) in ('true', 't', '1', 'yes'),
  lower(trim(r."NEFT")) in ('true', 't', '1', 'yes'),
  lower(trim(r."RTGS")) in ('true', 't', '1', 'yes'),
  lower(trim(r."IMPS")) in ('true', 't', '1', 'yes')
from raw_ifsc r
where r."IFSC" is not null
  and trim(r."IFSC") <> ''
on conflict (ifsc) do nothing;

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

-- 7. Once you've confirmed the site works, you can free up space by
--    clearing the staging table (the real data now lives in `branches`):
-- truncate raw_ifsc;
