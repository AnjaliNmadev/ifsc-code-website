/**
 * LIVE GOLD & SILVER RATES
 * ------------------------
 * Fetches the current XAU (gold) and XAG (silver) spot price, converted to
 * INR per gram, from xaus.com's free, keyless public API:
 *
 *   https://xaus.com/api/v1/spot?currency=INR&unit=gram&compact=1
 *
 * No API key or registration is required (see https://github.com/misix-git/xaus-api).
 * The national spot rate is the same for the whole country; the small
 * city-to-city difference you see on real bullion sites comes from local
 * jeweller-association premiums, transport cost, and local taxes rather than
 * a different "wholesale" price. CITY_MULTIPLIERS below applies a small,
 * realistic adjustment on top of the live national rate to approximate that
 * — replace it with real per-city data from your bullion data vendor if you
 * have one.
 *
 * Results are cached for 30 minutes (Next.js fetch revalidation) so every
 * page load doesn't hit the upstream API.
 */

export interface SpotRates {
  gold24kPerGram: number;
  silverPerGram: number;
  asOf: string;
  isLive: boolean;
}

// Small, realistic city premiums/discounts relative to the national spot
// rate, based on typical patterns reported across Indian bullion markets
// (southern metros usually run marginally higher than northern/western ones).
const CITY_MULTIPLIERS: Record<string, number> = {
  mumbai: 1.0,
  delhi: 1.004,
  chennai: 1.007,
  bangalore: 1.001,
  hyderabad: 1.0,
  kolkata: 1.0,
};

// Fallback used only if the live API is unreachable at request time, so the
// page still renders something sensible instead of crashing.
const FALLBACK: SpotRates = {
  gold24kPerGram: 15535,
  silverPerGram: 250,
  asOf: '9 September 2026 (fallback — live feed unavailable)',
  isLive: false,
};

export async function getSpotRates(): Promise<SpotRates> {
  try {
    const res = await fetch('https://xaus.com/api/v1/spot?currency=INR&unit=gram&compact=1', {
      next: { revalidate: 1800 }, // 30 minutes
    });
    if (!res.ok) return FALLBACK;
    const data = await res.json();

    const gold = data?.xau?.price;
    const silver = data?.xag?.price;
    const asOf = data?.updated_at || data?.data_state?.as_of;
    const status = data?.data_state?.status;

    if (typeof gold !== 'number' || typeof silver !== 'number') return FALLBACK;

    return {
      gold24kPerGram: gold,
      silverPerGram: silver,
      asOf: asOf ? new Date(asOf).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'just now',
      isLive: status !== 'stale' && status !== 'unavailable',
    };
  } catch {
    return FALLBACK;
  }
}

export interface CityGoldRate {
  citySlug: string;
  gold24k: number;
  gold22k: number;
  gold18k: number;
}

export interface CitySilverRate {
  citySlug: string;
  silverPerGram: number;
  silverPerKg: number;
}

export function goldRateForCity(citySlug: string, spot: SpotRates): CityGoldRate {
  const multiplier = CITY_MULTIPLIERS[citySlug] ?? 1;
  const gold24k = Math.round(spot.gold24kPerGram * multiplier);
  return {
    citySlug,
    gold24k,
    gold22k: Math.round(gold24k * 0.916),
    gold18k: Math.round(gold24k * 0.75),
  };
}

export function silverRateForCity(citySlug: string, spot: SpotRates): CitySilverRate {
  const multiplier = CITY_MULTIPLIERS[citySlug] ?? 1;
  const silverPerGram = Math.round(spot.silverPerGram * multiplier);
  return {
    citySlug,
    silverPerGram,
    silverPerKg: silverPerGram * 1000,
  };
}
