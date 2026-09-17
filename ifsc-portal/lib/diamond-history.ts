import { supabase } from './supabase';

/**
 * DIAMOND PRICE HISTORY
 * ---------------------
 * The OpenFacet DCX feed (lib/live-diamond-rates.ts) only reports a single
 * 24h trend number, so a longer-range chart has to be built from our own
 * daily snapshots. The cron route at /api/cron/snapshot-rates writes one row
 * per day into `diamond_rate_history`; this module reads them back.
 *
 * A freshly-deployed site has no rows yet, so every function here returns an
 * empty array rather than throwing — callers should render a "history is
 * still building up" state instead of an error.
 */

export type TrendRange = '1W' | '1M' | '1Y';

export const TREND_RANGES: { key: TrendRange; label: string; days: number }[] = [
  { key: '1W', label: '1 Week', days: 7 },
  { key: '1M', label: '1 Month', days: 30 },
  { key: '1Y', label: '1 Year', days: 365 },
];

export interface DiamondHistoryPoint {
  date: string; // YYYY-MM-DD
  dcxUsd: number;
  dcxInr: number;
}

/**
 * Returns daily snapshots for the last `days` days, oldest first so charts
 * draw left-to-right chronologically.
 */
export async function getDiamondHistory(days: number): Promise<DiamondHistoryPoint[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('diamond_rate_history')
    .select('rate_date, dcx_usd, dcx_inr')
    .gte('rate_date', sinceStr)
    .order('rate_date', { ascending: true })
    .limit(400);

  if (error || !data) return [];

  return data.map((row) => ({
    date: row.rate_date as string,
    dcxUsd: Number(row.dcx_usd),
    dcxInr: Number(row.dcx_inr),
  }));
}

/**
 * Fetches every range the chart can switch between in one go, so the client
 * component can toggle 1W / 1M / 1Y instantly without another round trip.
 * The 1Y query is a superset of the others, so this slices locally from a
 * single fetch instead of running three separate queries.
 */
export async function getAllDiamondTrendRanges(): Promise<Record<TrendRange, DiamondHistoryPoint[]>> {
  const yearly = await getDiamondHistory(365);

  function sliceLastDays(points: DiamondHistoryPoint[], days: number): DiamondHistoryPoint[] {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    return points.filter((p) => p.date >= cutoffStr);
  }

  return {
    '1W': sliceLastDays(yearly, 7),
    '1M': sliceLastDays(yearly, 30),
    '1Y': yearly,
  };
}

/** Percentage change between the first and last point of a series. */
export function changePctFor(points: DiamondHistoryPoint[]): number | null {
  if (points.length < 2) return null;
  const first = points[0].dcxInr;
  const last = points[points.length - 1].dcxInr;
  if (!first) return null;
  return ((last - first) / first) * 100;
}
