import rawBranches from '@/data/branches.json';
import type { BankSummary, BranchRecord, DistrictSummary, StateSummary } from './types';
import { slugify } from './utils';

/**
 * DATA ENGINE
 * -----------
 * This app ships with a small, real-shaped SAMPLE dataset (data/branches.json)
 * covering a handful of banks/states/districts/branches, so the entire site
 * — routing, static generation, the cascading dropdowns, and SEO pages — is
 * fully wired and works out of the box with zero backend.
 *
 * There is no free, public, hierarchical "list all branches" API for Indian
 * banks (only reverse single-code lookup APIs like Razorpay's exist — see
 * lib/api.ts). To scale this to the full national dataset without adding a
 * backend server, replace data/branches.json with a full IFSC dataset
 * (several open-source JSON/CSV IFSC datasets exist on GitHub) — the shape
 * only needs to match BranchRecord below. Everything in this file is
 * dataset-size agnostic and will keep working unchanged.
 */

const branches: BranchRecord[] = (rawBranches as any[]).map((b) => ({
  ifsc: b.ifsc,
  bankName: b.bankName,
  bankSlug: slugify(b.bankName),
  branch: b.branch,
  branchSlug: `${slugify(b.branch)}-${b.ifsc.toLowerCase()}`,
  address: b.address,
  city: b.city,
  district: b.district,
  districtSlug: slugify(b.district),
  state: b.state,
  stateSlug: slugify(b.state),
  contact: b.contact,
  micr: b.micr ?? null,
  upi: Boolean(b.upi),
  neft: Boolean(b.neft),
  rtgs: Boolean(b.rtgs),
  imps: Boolean(b.imps),
}));

export function getAllBranches(): BranchRecord[] {
  return branches;
}

export function getAllBanks(): BankSummary[] {
  const map = new Map<string, BankSummary>();
  for (const b of branches) {
    const existing = map.get(b.bankSlug);
    if (existing) {
      existing.branchCount += 1;
    } else {
      map.set(b.bankSlug, { name: b.bankName, slug: b.bankSlug, branchCount: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getBank(bankSlug: string): BankSummary | null {
  return getAllBanks().find((b) => b.slug === bankSlug) ?? null;
}

export function getStatesForBank(bankSlug: string): StateSummary[] {
  const map = new Map<string, StateSummary>();
  for (const b of branches) {
    if (b.bankSlug !== bankSlug) continue;
    const existing = map.get(b.stateSlug);
    if (existing) {
      existing.branchCount += 1;
    } else {
      map.set(b.stateSlug, { name: b.state, slug: b.stateSlug, branchCount: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getState(bankSlug: string, stateSlug: string): StateSummary | null {
  return getStatesForBank(bankSlug).find((s) => s.slug === stateSlug) ?? null;
}

export function getDistrictsForState(bankSlug: string, stateSlug: string): DistrictSummary[] {
  const map = new Map<string, DistrictSummary>();
  for (const b of branches) {
    if (b.bankSlug !== bankSlug || b.stateSlug !== stateSlug) continue;
    const existing = map.get(b.districtSlug);
    if (existing) {
      existing.branchCount += 1;
    } else {
      map.set(b.districtSlug, { name: b.district, slug: b.districtSlug, branchCount: 1 });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getDistrict(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string
): DistrictSummary | null {
  return getDistrictsForState(bankSlug, stateSlug).find((d) => d.slug === districtSlug) ?? null;
}

export function getBranchesForDistrict(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string
): BranchRecord[] {
  return branches
    .filter(
      (b) => b.bankSlug === bankSlug && b.stateSlug === stateSlug && b.districtSlug === districtSlug
    )
    .sort((a, b) => a.branch.localeCompare(b.branch));
}

export function getBranch(
  bankSlug: string,
  stateSlug: string,
  districtSlug: string,
  branchSlug: string
): BranchRecord | null {
  return (
    branches.find(
      (b) =>
        b.bankSlug === bankSlug &&
        b.stateSlug === stateSlug &&
        b.districtSlug === districtSlug &&
        b.branchSlug === branchSlug
    ) ?? null
  );
}

export function getBranchByIfsc(ifsc: string): BranchRecord | null {
  const normalized = ifsc.trim().toUpperCase();
  return branches.find((b) => b.ifsc === normalized) ?? null;
}
