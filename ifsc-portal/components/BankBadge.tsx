import { Landmark } from 'lucide-react';

interface ColorPair {
  bg: string;
  text: string;
}

const FALLBACK_PALETTE: ColorPair[] = [
  { bg: 'bg-trust-700', text: 'text-white' },
  { bg: 'bg-teal-600', text: 'text-white' },
  { bg: 'bg-ink-800', text: 'text-white' },
  { bg: 'bg-trust-500', text: 'text-white' },
  { bg: 'bg-teal-700', text: 'text-white' },
];

/**
 * A fixed, distinct color per well-known bank — so the same bank always
 * shows the same badge color across the site, instead of a color picked
 * randomly from the bank's name. Matched case-insensitively against
 * whatever the database has stored for that bank's name.
 */
const BANK_COLORS: { keyword: string; color: ColorPair }[] = [
  { keyword: 'state bank of india', color: { bg: 'bg-blue-700', text: 'text-white' } },
  { keyword: 'hdfc bank', color: { bg: 'bg-red-700', text: 'text-white' } },
  { keyword: 'icici bank', color: { bg: 'bg-orange-600', text: 'text-white' } },
  { keyword: 'punjab national bank', color: { bg: 'bg-rose-800', text: 'text-white' } },
  { keyword: 'axis bank', color: { bg: 'bg-pink-800', text: 'text-white' } },
  { keyword: 'bank of baroda', color: { bg: 'bg-orange-700', text: 'text-white' } },
  { keyword: 'canara bank', color: { bg: 'bg-sky-700', text: 'text-white' } },
  { keyword: 'kotak mahindra bank', color: { bg: 'bg-red-600', text: 'text-white' } },
  { keyword: 'union bank of india', color: { bg: 'bg-orange-800', text: 'text-white' } },
  { keyword: 'idbi bank', color: { bg: 'bg-emerald-800', text: 'text-white' } },
  { keyword: 'indian bank', color: { bg: 'bg-teal-800', text: 'text-white' } },
  { keyword: 'yes bank', color: { bg: 'bg-blue-800', text: 'text-white' } },
  { keyword: 'indusind bank', color: { bg: 'bg-rose-700', text: 'text-white' } },
  { keyword: 'central bank of india', color: { bg: 'bg-red-800', text: 'text-white' } },
  { keyword: 'bank of india', color: { bg: 'bg-amber-700', text: 'text-white' } },
  { keyword: 'uco bank', color: { bg: 'bg-indigo-800', text: 'text-white' } },
  { keyword: 'bank of maharashtra', color: { bg: 'bg-lime-700', text: 'text-white' } },
  { keyword: 'idfc first bank', color: { bg: 'bg-purple-700', text: 'text-white' } },
  { keyword: 'federal bank', color: { bg: 'bg-emerald-700', text: 'text-white' } },
  { keyword: 'south indian bank', color: { bg: 'bg-green-800', text: 'text-white' } },
  { keyword: 'karur vysya bank', color: { bg: 'bg-amber-800', text: 'text-white' } },
  { keyword: 'rbl bank', color: { bg: 'bg-violet-700', text: 'text-white' } },
  { keyword: 'punjab and sind bank', color: { bg: 'bg-rose-900', text: 'text-white' } },
  { keyword: 'karnataka bank', color: { bg: 'bg-yellow-700', text: 'text-white' } },
];

function colorFor(name: string): ColorPair {
  const lower = name.toLowerCase();
  const match = BANK_COLORS.find((entry) => lower.includes(entry.keyword));
  if (match) return match.color;
  // Deterministic fallback for any bank not in the curated list above —
  // same name always maps to the same fallback color.
  const index = name.charCodeAt(0) % FALLBACK_PALETTE.length;
  return FALLBACK_PALETTE[index];
}

function initialsFor(name: string): string {
  const words = name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function BankBadge({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const color = colorFor(name);
  const sizeClasses =
    size === 'lg'
      ? 'h-14 w-14'
      : size === 'sm'
      ? 'h-9 w-9'
      : 'h-11 w-11';
  const iconSize = size === 'lg' ? 26 : size === 'sm' ? 16 : 20;

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl font-display font-bold ${color.bg} ${color.text} ${sizeClasses}`}
      title={name}
      aria-label={name}
    >
      {/* A bank/landmark glyph in the bank's brand color, rather than a plain first letter. */}
      <Landmark size={iconSize} strokeWidth={2.25} aria-hidden="true" />
      <span className="sr-only">{initialsFor(name)}</span>
    </span>
  );
}
