'use client';

import { useState } from 'react';
import PriceTrendChart from '@/components/PriceTrendChart';
import {
  TREND_RANGES,
  changePctFor,
  type DiamondHistoryPoint,
  type TrendRange,
} from '@/lib/diamond-history';

interface DiamondTrendChartProps {
  /** Pre-fetched series for every range, so switching tabs is instant. */
  series: Record<TrendRange, DiamondHistoryPoint[]>;
  /** The live 24h trend from the DCX feed, shown alongside the longer ranges. */
  trend24h: number;
  /** Local market index, so the chart can be shown in this city's terms. */
  cityIndex: number;
  cityName: string;
}

const PURPLE = '#7c3aed';

function formatDateLabel(date: string, range: TrendRange): string {
  const d = new Date(date);
  if (range === '1Y') {
    return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
  }
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function DiamondTrendChart({
  series,
  trend24h,
  cityIndex,
  cityName,
}: DiamondTrendChartProps) {
  const [range, setRange] = useState<TrendRange>('1M');

  const points = series[range] ?? [];
  // Scale the national index into this city's terms so the chart matches the
  // price tables above it rather than showing a different number.
  const scaled = points.map((p) => ({ date: p.date, value: Math.round(p.dcxInr * cityIndex) }));
  const changePct = changePctFor(points);

  const hasEnough = scaled.length >= 2;
  const first = scaled[0];
  const last = scaled[scaled.length - 1];

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-ink-900">
            Diamond price trend in {cityName}
          </p>
          <p className="mt-0.5 text-xs text-ink-500">
            Composite per-carat index (DCX), adjusted for {cityName}&rsquo;s local market
          </p>
        </div>
        <div className="flex rounded-lg border border-ink-200 bg-ink-50 p-0.5">
          {TREND_RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              aria-pressed={range === r.key}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                range === r.key
                  ? 'bg-white text-trust-700 shadow-sm'
                  : 'text-ink-500 hover:text-ink-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
        <span className="text-xs font-medium text-ink-500">
          24h:{' '}
          <span className={trend24h >= 0 ? 'font-bold text-green-700' : 'font-bold text-red-600'}>
            {trend24h >= 0 ? '▲' : '▼'} {Math.abs(trend24h).toFixed(2)}%
          </span>
        </span>
        {changePct !== null && (
          <span className="text-xs font-medium text-ink-500">
            {TREND_RANGES.find((r) => r.key === range)?.label}:{' '}
            <span className={changePct >= 0 ? 'font-bold text-green-700' : 'font-bold text-red-600'}>
              {changePct >= 0 ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
            </span>
          </span>
        )}
        {hasEnough && (
          <span className="text-xs text-ink-400">
            ₹{last.value.toLocaleString('en-IN')} / ct today
          </span>
        )}
      </div>

      <div className="mt-4">
        {hasEnough ? (
          <>
            <PriceTrendChart points={scaled} color={PURPLE} height={180} />
            <div className="mt-1 flex justify-between px-1 text-[11px] text-ink-400">
              <span>{formatDateLabel(first.date, range)}</span>
              <span>{formatDateLabel(last.date, range)}</span>
            </div>
          </>
        ) : (
          <div className="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-ink-50 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-ink-600">
              Not enough history for this range yet
            </p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-500">
              This chart is built from one snapshot per day, so it fills in over time. The 24h
              figure above is live from the market index right now — the 1-week view becomes useful
              after about a week of snapshots, and the 1-year view after a few months.
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-400">
        This tracks broad diamond-market movement, not any individual stone. A specific
        diamond&rsquo;s price still depends on its own 4Cs, fluorescence, polish, symmetry and
        certification — so this chart shows direction, not a quote.
      </p>
    </div>
  );
}
