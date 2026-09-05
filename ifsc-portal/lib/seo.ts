import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './utils';
import type { BranchRecord } from './types';

export function buildCanonical(pathSegments: string[]): string {
  const path = pathSegments.filter(Boolean).join('/');
  return `${SITE_URL}${path ? `/${path}` : ''}`;
}

export function homeMetadata(): Metadata {
  const title = `${SITE_NAME} — Instant IFSC, MICR & Bank Branch Lookup`;
  const description =
    'Find any Indian bank branch IFSC code, MICR code, and full address in seconds. Search by code or browse bank, state, district, and branch.';
  const canonical = buildCanonical([]);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function bankMetadata(bankName: string, bankSlug: string, branchCount: number): Metadata {
  const title = `${bankName} IFSC Codes — All Branches by State & District | ${SITE_NAME}`;
  const description = `Browse all ${branchCount.toLocaleString(
    'en-IN'
  )} listed ${bankName} branches by state and district. Get IFSC code, MICR code, and address for any ${bankName} branch.`;
  const canonical = buildCanonical([bankSlug]);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: 'website' },
  };
}

export function stateMetadata(
  bankName: string,
  stateName: string,
  bankSlug: string,
  stateSlug: string,
  branchCount: number
): Metadata {
  const title = `${bankName} IFSC Codes in ${stateName} — All Districts | ${SITE_NAME}`;
  const description = `Find IFSC and MICR codes for ${branchCount.toLocaleString(
    'en-IN'
  )} ${bankName} branches across ${stateName}, organized by district.`;
  const canonical = buildCanonical([bankSlug, stateSlug]);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: 'website' },
  };
}

export function districtMetadata(
  bankName: string,
  stateName: string,
  districtName: string,
  bankSlug: string,
  stateSlug: string,
  districtSlug: string,
  branchCount: number
): Metadata {
  const title = `${bankName} IFSC Codes in ${districtName}, ${stateName} | ${SITE_NAME}`;
  const description = `List of ${branchCount} ${bankName} branch${
    branchCount === 1 ? '' : 'es'
  } in ${districtName}, ${stateName}, with IFSC code, MICR code, and address for each branch.`;
  const canonical = buildCanonical([bankSlug, stateSlug, districtSlug]);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: 'website' },
  };
}

export function branchMetadata(branch: BranchRecord): Metadata {
  const title = `${branch.bankName} ${branch.branch} IFSC Code: ${branch.ifsc} | ${SITE_NAME}`;
  const description = `IFSC code for ${branch.bankName}, ${branch.branch} branch, ${branch.district}, ${branch.state} is ${branch.ifsc}. MICR code, address, and contact details included.`;
  const canonical = buildCanonical([
    branch.bankSlug,
    branch.stateSlug,
    branch.districtSlug,
    branch.branchSlug,
  ]);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
