/**
 * LIVE DIAMOND MARKET INDEX
 * -------------------------
 * Diamonds still don't have a single per-stone "spot price" the way gold
 * and silver do (see lib/diamond-price.ts for why) — but there IS a free,
 * keyless, real-time diamond market benchmark we can use to make this
 * page auto-update: OpenFacet's Diamond Composite Index (DCX).
 *
 *   https://openfacet.net/en/api-docs/
 *   https://data.openfacet.net/index.json
 *
 * DCX is a model-based composite per-carat USD benchmark built from public
 * retail listings, refreshed roughly once a day, with a 24h % trend. It is
 * NOT a quote for any specific stone (see the disclaimer on their site),
 * so instead of pretending it matches our illustrative carat/clarity/
 * colour/cut table exactly, we use its 24h trend to nudge that whole
 * table up or down by the same %. That keeps every number on this page
 * internally consistent while making the page genuinely move with a real,
 * live market feed instead of sitting static forever.
 *
 * USD -> INR conversion uses Frankfurter (https://frankfurter.app), a free
 * keyless API backed by European Central Bank reference rates.
 *
 * Everything here is cached (Next.js fetch revalidation) and falls back to
 * safe static defaults if either upstream API is unreachable, so the page
 * always renders.
 */

export interface LiveDiamondIndex {
  /** OpenFacet's composite per-carat price, in USD. */
  dcxUsd: number;
  /** OpenFacet's composite per-carat price, converted to INR. */
  dcxInr: number;
  /** 24h % change reported by OpenFacet (e.g. 0.13 = +0.13%). */
  trend24h: number;
  /** USD -> INR rate used for the conversion above. */
  fxRate: number;
  /** Multiplier to apply on top of the static illustrative base-price
   * table so it tracks the live 24h trend, clamped to a sane range so a
   * single day's move can't swing the whole table unrealistically. */
  scaleFactor: number;
  asOf: string;
  isLive: boolean;
}

// Used only if the live feeds are unreachable at request time, so the page
// still renders sensible numbers instead of crashing.
const FALLBACK: LiveDiamondIndex = {
  dcxUsd: 3550,
  dcxInr: 3550 * 88.5,
  trend24h: 0,
  fxRate: 88.5,
  scaleFactor: 1,
  asOf: 'reference values (live feed unavailable)',
  isLive: false,
};

// A single day's real diamond-market move is rarely more than a couple of
// percent; clamp defensively so a bad/garbled upstream value can't distort
// every price on the page.
const MAX_DAILY_SWING_PCT = 5;

async function getUsdInrRate(): Promise<number> {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR', {
      next: { revalidate: 1800 }, // 30 minutes
    });
    if (!res.ok) return FALLBACK.fxRate;
    const data = await res.json();
    const rate = data?.rates?.INR;
    return typeof rate === 'number' && rate > 0 ? rate : FALLBACK.fxRate;
  } catch {
    return FALLBACK.fxRate;
  }
}

interface OpenFacetIndexResponse {
  dcx?: number;
  trend?: number;
  ts?: string;
}

async function getDcxSnapshot(): Promise<{ dcxUsd: number; trend24h: number; ts: string } | null> {
  try {
    const res = await fetch('https://data.openfacet.net/index.json', {
      next: { revalidate: 1800 }, // 30 minutes; upstream itself snapshots ~daily
    });
    if (!res.ok) return null;
    const data: OpenFacetIndexResponse = await res.json();
    if (typeof data.dcx !== 'number') return null;
    return {
      dcxUsd: data.dcx,
      trend24h: typeof data.trend === 'number' ? data.trend : 0,
      ts: data.ts ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function getLiveDiamondIndex(): Promise<LiveDiamondIndex> {
  const [fxRate, snapshot] = await Promise.all([getUsdInrRate(), getDcxSnapshot()]);

  if (!snapshot) return { ...FALLBACK, fxRate };

  const clampedTrend = Math.max(Math.min(snapshot.trend24h, MAX_DAILY_SWING_PCT), -MAX_DAILY_SWING_PCT);
  const scaleFactor = 1 + clampedTrend / 100;
  const dcxInr = snapshot.dcxUsd * fxRate;

  return {
    dcxUsd: snapshot.dcxUsd,
    dcxInr,
    trend24h: snapshot.trend24h,
    fxRate,
    scaleFactor,
    asOf: new Date(snapshot.ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    isLive: true,
  };
}
