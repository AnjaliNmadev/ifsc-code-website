import { supabase } from './supabase';

export interface HistoryPoint {
  date: string; // YYYY-MM-DD
  gold24kPerGram: number;
  silverPerGram: number;
}

/**
 * Returns up to `days` most recent daily snapshots, oldest first (so charts
 * draw left-to-right chronologically). Returns an empty array if the table
 * is empty or unreachable — callers should treat that as "no history yet"
 * rather than an error, since the cron job may not have run yet on a
 * freshly-deployed site.
 */
export async function getRecentMetalHistory(days = 10): Promise<HistoryPoint[]> {
  const { data, error } = await supabase
    .from('metal_rate_history')
    .select('rate_date, gold_24k_per_gram, silver_per_gram')
    .order('rate_date', { ascending: false })
    .limit(days);

  if (error || !data) return [];

  return data
    .map((row) => ({
      date: row.rate_date as string,
      gold24kPerGram: Number(row.gold_24k_per_gram),
      silverPerGram: Number(row.silver_per_gram),
    }))
    .reverse();
}
