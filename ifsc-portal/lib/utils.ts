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
