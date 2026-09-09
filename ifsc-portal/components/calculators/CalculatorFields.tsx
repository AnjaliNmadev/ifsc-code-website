'use client';

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

export function NumberField({ label, value, onChange, min = 0, max, step = 1, suffix }: NumberFieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink-700">{label}</span>
      <div className="relative">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ''}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className="w-full rounded-xl border border-ink-200 bg-ink-50 py-3 pl-4 pr-14 text-base font-semibold text-ink-900 outline-none transition focus:border-trust-500 focus:bg-white focus:ring-2 focus:ring-trust-100"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-400">
            {suffix}
          </span>
        )}
      </div>
      {typeof max === 'number' && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-200 accent-trust-600"
        />
      )}
    </label>
  );
}

export function ResultStat({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 ${emphasis ? 'bg-trust-700' : 'bg-white'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${emphasis ? 'text-trust-100' : 'text-ink-400'}`}>
        {label}
      </p>
      <p className={`mt-1 font-display text-xl font-extrabold ${emphasis ? 'text-white' : 'text-ink-900'}`}>
        {value}
      </p>
    </div>
  );
}

export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return '₹0';
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}
