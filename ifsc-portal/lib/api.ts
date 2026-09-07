import type { BranchRecord, RazorpayIfscResponse } from './types';
import { getBranchByIfsc } from './data';
import { normalizeIfsc, slugify } from './utils';

const PRIMARY_ENDPOINT = 'https://ifsc.razorpay.com';

/** Simple in-memory + sessionStorage cache so repeat lookups in a session are instant. */
const memoryCache = new Map<string, BranchRecord>();
const CACHE_PREFIX = 'ifsc-cache:';

function readFromClientCache(code: string): BranchRecord | null {
  if (memoryCache.has(code)) return memoryCache.get(code)!;
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_PREFIX + code);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BranchRecord;
    memoryCache.set(code, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function writeToClientCache(code: string, record: BranchRecord) {
  memoryCache.set(code, record);
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(CACHE_PREFIX + code, JSON.stringify(record));
  } catch {
    // sessionStorage can throw in private-browsing / quota-exceeded situations — safe to ignore.
  }
}

function mapRazorpayResponse(data: RazorpayIfscResponse): BranchRecord {
  return {
    ifsc: data.IFSC,
    bankName: data.BANK,
    bankSlug: slugify(data.BANK),
    branch: data.BRANCH,
    branchSlug: `${slugify(data.BRANCH)}-${data.IFSC.toLowerCase()}`,
    address: data.ADDRESS,
    city: data.CITY,
    district: data.DISTRICT,
    districtSlug: slugify(data.DISTRICT),
    state: data.STATE,
    stateSlug: slugify(data.STATE),
    contact: data.CONTACT || 'Not available',
    micr: data.MICR,
    upi: Boolean(data.UPI),
    neft: Boolean(data.NEFT),
    rtgs: Boolean(data.RTGS),
    imps: Boolean(data.IMPS),
  };
}

export class IfscLookupError extends Error {
  kind: 'not-found' | 'network' | 'invalid';
  constructor(kind: 'not-found' | 'network' | 'invalid', message: string) {
    super(message);
    this.kind = kind;
    this.name = 'IfscLookupError';
  }
}

/**
 * Resolves full branch details for an IFSC code.
 * Order of resolution:
 *   1. Session cache (instant, no network).
 *   2. Supabase database (the full ~180,000+ branch national dataset — see
 *      /supabase/schema.sql).
 *   3. Live Razorpay IFSC API (https://ifsc.razorpay.com/{code}) as a
 *      fallback for any brand-new code not yet in the database.
 * Any network failure degrades to a clean, typed error instead of throwing
 * an unhandled exception, so the UI can always render a friendly state.
 */
export async function lookupIfsc(rawCode: string): Promise<BranchRecord> {
  const code = normalizeIfsc(rawCode);

  const cached = readFromClientCache(code);
  if (cached) return cached;

  const local = await getBranchByIfsc(code);
  if (local) {
    writeToClientCache(code, local);
    return local;
  }

  try {
    const response = await fetch(`${PRIMARY_ENDPOINT}/${code}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (response.status === 404) {
      throw new IfscLookupError('not-found', `No branch found for IFSC ${code}.`);
    }

    if (!response.ok) {
      throw new IfscLookupError('network', `Lookup service returned status ${response.status}.`);
    }

    const data = (await response.json()) as RazorpayIfscResponse;
    const record = mapRazorpayResponse(data);
    writeToClientCache(code, record);
    return record;
  } catch (error) {
    if (error instanceof IfscLookupError) throw error;
    throw new IfscLookupError(
      'network',
      'Could not reach the IFSC lookup service. Please check your connection and try again.'
    );
  }
}
