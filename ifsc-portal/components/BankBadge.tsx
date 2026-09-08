const PALETTE = [
  { bg: 'bg-trust-700', text: 'text-white' },
  { bg: 'bg-teal-600', text: 'text-white' },
  { bg: 'bg-ink-800', text: 'text-white' },
  { bg: 'bg-trust-500', text: 'text-white' },
  { bg: 'bg-teal-700', text: 'text-white' },
];

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
  const color = colorFor(name);
  const sizeClasses =
    size === 'lg'
      ? 'h-14 w-14 text-lg'
      : size === 'sm'
      ? 'h-9 w-9 text-xs'
      : 'h-11 w-11 text-sm';

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl font-display font-bold ${color.bg} ${color.text} ${sizeClasses}`}
    >
      {initialsFor(name)}
    </span>
  );
}
