import { NextRequest, NextResponse } from 'next/server';
import { getSpotRates } from '@/lib/live-rates';
import { getLiveDiamondIndex } from '@/lib/live-diamond-rates';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Runs once a day (see vercel.json "crons") to snapshot the day's gold and
 * silver spot rate into metal_rate_history, so the price chart and 10-day
 * table on the gold/silver rate pages have real data to show over time.
 *
 * Protected by CRON_SECRET so random visitors can't trigger writes: Vercel
 * automatically sends this as a Bearer token on scheduled invocations if
 * CRON_SECRET is set in your project's environment variables. You can also
 * call it manually (e.g. to backfill today) with:
 *   curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://yoursite.com/api/cron/snapshot-rates
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: 'Supabase admin client not configured (missing SUPABASE_SERVICE_ROLE_KEY).' },
      { status: 500 }
    );
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC

  // Both feeds are snapshotted independently: if gold/silver is down but the
  // diamond index is up (or vice versa), we still record the one that worked
  // instead of losing both days of history.
  const [spot, diamond] = await Promise.all([getSpotRates(), getLiveDiamondIndex()]);

  const metals: { written: boolean; reason?: string } = { written: false };
  const diamonds: { written: boolean; reason?: string } = { written: false };

  // Don't write a fallback/stale value into history — better to skip a day
  // than to record a wrong number.
  if (!spot.isLive) {
    metals.reason = 'Gold/silver live feed unavailable';
  } else {
    const { error } = await admin.from('metal_rate_history').upsert(
      {
        rate_date: today,
        gold_24k_per_gram: spot.gold24kPerGram,
        silver_per_gram: spot.silverPerGram,
      },
      { onConflict: 'rate_date' }
    );
    if (error) metals.reason = error.message;
    else metals.written = true;
  }

  if (!diamond.isLive) {
    diamonds.reason = 'Diamond index (DCX) feed unavailable';
  } else {
    const { error } = await admin.from('diamond_rate_history').upsert(
      {
        rate_date: today,
        dcx_usd: diamond.dcxUsd,
        dcx_inr: diamond.dcxInr,
        fx_rate: diamond.fxRate,
      },
      { onConflict: 'rate_date' }
    );
    if (error) diamonds.reason = error.message;
    else diamonds.written = true;
  }

  return NextResponse.json({
    ok: metals.written || diamonds.written,
    date: today,
    metals,
    diamonds,
  });
}
