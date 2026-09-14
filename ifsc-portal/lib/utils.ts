/** Turns "State Bank of India" into "state-bank-of-india". */
export function slugify(value: string): string {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Turns "state-bank-of-india" into "State Bank Of India" for display fallbacks. */
export function unslugify(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function isValidIfsc(code: string): boolean {
  return /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(code.trim());
}

export function normalizeIfsc(code: string): string {
  return code.trim().toUpperCase();
}

export function buildWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export const SITE_NAME = 'IFSC Finder';
export const SITE_DESCRIPTION =
  'Look up any Indian bank branch IFSC code, MICR code, and address instantly, or browse every bank by state, district, and branch.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example-ifsc-finder.vercel.app';

/**
 * Well-known banks, in the order they should appear first on the homepage —
 * matched case-insensitively against whatever the database has stored for
 * that bank's name (e.g. "State Bank Of India" or "STATE BANK OF INDIA"
 * both match "state bank of india").
 */
const POPULAR_BANK_KEYWORDS = [
  'state bank of india',
  'hdfc bank',
  'icici bank',
  'punjab national bank',
  'axis bank',
  'bank of baroda',
  'canara bank',
  'kotak mahindra bank',
  'union bank of india',
  'idbi bank',
  'indian bank',
  'yes bank',
  'indusind bank',
  'central bank of india',
  'bank of india',
  'uco bank',
];

/**
 * Picks up to `limit` banks for a "Popular Banks" grid: well-known banks
 * first (in the priority order above), then fills any remaining slots with
 * the rest of the banks alphabetically.
 */
export function pickPopularBanks<T extends { name: string; slug: string }>(
  banks: T[],
  limit: number
): T[] {
  const remaining = [...banks];
  const picked: T[] = [];

  for (const keyword of POPULAR_BANK_KEYWORDS) {
    if (picked.length >= limit) break;
    const index = remaining.findIndex((b) => b.name.toLowerCase().includes(keyword));
    if (index !== -1) {
      picked.push(remaining[index]);
      remaining.splice(index, 1);
    }
  }

  for (const bank of remaining) {
    if (picked.length >= limit) break;
    picked.push(bank);
  }

  return picked;
}
