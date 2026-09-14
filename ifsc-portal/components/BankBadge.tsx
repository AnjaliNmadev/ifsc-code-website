const PALETTE = [
  { bg: 'bg-trust-700', text: 'text-white' },
  { bg: 'bg-teal-600', text: 'text-white' },
  { bg: 'bg-ink-800', text: 'text-white' },
  { bg: 'bg-trust-500', text: 'text-white' },
  { bg: 'bg-teal-700', text: 'text-white' },
];

/**
 * Approximate brand colors for well-known Indian banks, keyed by a keyword
 * that's matched against the bank name (case-insensitive, "includes" match —
 * same pattern used in lib/utils.ts's pickPopularBanks). These are used as a
 * solid-color badge background, not a copied logo graphic, so the badge
 * reads as "that bank's color" at a glance even without a logo image.
 * Any bank not in this list falls back to the rotating PALETTE above.
 */
const BRAND_COLORS: { keyword: string; hex: string }[] = [
  { keyword: 'state bank of india', hex: '#22409A' },
  { keyword: 'hdfc bank', hex: '#004C8F' },
  { keyword: 'icici bank', hex: '#F58220' },
  { keyword: 'punjab national bank', hex: '#A91B0D' },
  { keyword: 'axis bank', hex: '#97144D' },
  { keyword: 'bank of baroda', hex: '#F26522' },
  { keyword: 'canara bank', hex: '#004990' },
  { keyword: 'kotak mahindra bank', hex: '#ED1C24' },
  { keyword: 'union bank of india', hex: '#004C97' },
  { keyword: 'idbi bank', hex: '#003DA5' },
  { keyword: 'indian bank', hex: '#00693E' },
  { keyword: 'yes bank', hex: '#003DA5' },
  { keyword: 'indusind bank', hex: '#A6192E' },
  { keyword: 'central bank of india', hex: '#1B3F8B' },
  { keyword: 'bank of india', hex: '#E4572E' },
  { keyword: 'uco bank', hex: '#0055A4' },
];

function brandColorFor(name: string): string | null {
  const lower = name.toLowerCase();
  const match = BRAND_COLORS.find((b) => lower.includes(b.keyword));
  return match ? match.hex : null;
}

function colorFor(name: string) {
  const index = name.charCodeAt(0) % PALETTE.length;
  return PALETTE[index];
}

function initialsFor(name: string): string {
  const words = name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function BankBadge({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const brandHex = brandColorFor(name);
  const fallback = colorFor(name);
  const sizeClasses =
    size === 'lg'
      ? 'h-14 w-14 text-lg'
      : size === 'sm'
      ? 'h-9 w-9 text-xs'
      : 'h-11 w-11 text-sm';

  return (
    <span
      style={brandHex ? { backgroundColor: brandHex } : undefined}
      className={`flex shrink-0 items-center justify-center rounded-xl font-display font-bold text-white ${sizeClasses} ${
        brandHex ? '' : fallback.bg
      }`}
    >
      {initialsFor(name)}
    </span>
  );
}
