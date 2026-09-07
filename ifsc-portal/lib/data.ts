import { supabase, isSupabaseConfigured } from './supabase';
import type { BankSummary, BranchRecord, DistrictSummary, StateSummary } from './types';

/**
 * DATA ENGINE (Supabase-backed)
 * ------------------------------
 * All functions here read from the Supabase Postgres database set up by
 * /supabase/schema.sql, which holds the full national IFSC dataset
 * (~180,000+ branches from the razorpay/ifsc public dataset).
 *
 * Every function fails soft: if Supabase isn't configured yet (no env vars)
 * or a query errors, it logs a warning and returns an empty result instead
 * of crashing the page — so the site still renders (just with no listings)
 * until the database is connected.
 */

function mapRow(row: any): BranchRecord {
  return {
    ifsc: row.ifsc,
    bankName: row.bank_name,
    bankSlug: row.bank_slug,
    branch: row.branch,
    branchSlug: row.branch_slug,
    address: row.address ?? '',
    city: row.city ?? '',
    district: row.district,
    districtSlug: row.district_slug,
    state: row.state,
    stateSlug: row.state_slug,
    contact: row.contact || 'Not available',
    micr: row.micr,
    upi: Boolean(row.upi),
    neft: Boolean(row.neft),
    rtgs: Boolean(row.rtgs),
    imps: Boolean(row.imps),
  };
}

function warnIfUnconfigured(fn: string) {
  if (!isSupabaseConfigured) {
    console.warn(
      `[data] ${fn}() called but Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`
    );
  }
}

export async function getAllBanks(): Promise<BankSummary[]> {
  warnIfUnconfigured('getAllBanks');
  const { data, error } = await supabase.from('bank_summary').select('*').order('name');
  if (error || !data) {
    if (error) console.error('getAllBanks error:', error.message);
    return [];
  }
  return data.map((r) => ({ name: r.name, slug: r.slug, branchCount: r.branch_count }));
}

export async function getBank(bankSlug: string): Promise<BankSummary | null> {
  const { data, error } = await supabase
    .from('bank_summary')
    .select('*')
    .eq('slug', bankSlug)
    .maybeSingle();
  if (error || !data) return null;
  return { name: data.name, slug: data.slug, branchCount: data.branch_count };
}

export async function getStatesForBank(bankSlug: string): Promise<StateSummary[]> {
  const { data, error } = await supabase
    .from('state_summary')
    .select('*')
    .eq('bank_slug', bankSlug)
    .order('name');
  if (error || !data) return [];
  return data.map((r) => ({ name: r.name, slug: r.slug, branchCount: r.branch_count }));
}

export async function getState(bankSlug: string, stateSlug: string): Promise<StateSummary | null> {
  const { data, error } = await supabase
    .from('state_summary')
    .select('*')
    .eq('bank_slug', bankSlug)
    .eq('slug', stateSlug)
    .maybeSingle();
  if (error || !data) return null;
  return { name: data.name, slug: data.slug, branchCount: data.branch_count };
}

export async function getDistrictsForState(
  bankSlug: string,
  stateSlug: string
): Promise<DistrictSummary[]> {
  const { data, error } = await supabase
    .from('district_summary')
    .select('*')
    .eq('bank_slug', bankSlug)
    .eq('state_slug', stateSlug)
    .order('name');
  if (error || !data) return [];
  return data.map((r) => ({ name: r.name, slug: r.slug, branchCount: r.branch_count }));
}

export async function getDistrict(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string
): Promise<DistrictSummary | null> {
  const { data, error } = await supabase
    .from('district_summary')
    .select('*')
    .eq('bank_slug', bankSlug)
    .eq('state_slug', stateSlug)
    .eq('slug', districtSlug)
    .maybeSingle();
  if (error || !data) return null;
  return { name: data.name, slug: data.slug, branchCount: data.branch_count };
}

export async function getBranchesForDistrict(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string
): Promise<BranchRecord[]> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('bank_slug', bankSlug)
    .eq('state_slug', stateSlug)
    .eq('district_slug', districtSlug)
    .order('branch');
  if (error || !data) return [];
  return data.map(mapRow);
}

export async function getBranch(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string,
  branchSlug: string
): Promise<BranchRecord | null> {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('bank_slug', bankSlug)
    .eq('state_slug', stateSlug)
    .eq('district_slug', districtSlug)
    .eq('branch_slug', branchSlug)
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data);
}

export async function getBranchByIfsc(ifsc: string): Promise<BranchRecord | null> {
  const normalized = ifsc.trim().toUpperCase();
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('ifsc', normalized)
    .maybeSingle();
  if (error || !data) return null;
  return mapRow(data);
}
