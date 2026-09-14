/**
 * DIAMOND PRICE REFERENCE DATA
 * ----------------------------
 * Unlike gold and silver, diamonds have no single public spot price. Every
 * polished diamond is unique — its price depends on the "4Cs" (Carat,
 * Cut, Colour, Clarity) plus certification and market conditions — so there
 * is no equivalent of a daily LBMA/MCX gold-style benchmark to pull a "live
 * rate" from.
 *
 * The numbers below are a simplified, illustrative multiplier model built
 * from widely-known, publicly-documented diamond pricing patterns (larger
 * carat weights command a steep premium per carat; better clarity/colour
 * grades cost more). They are NOT live market data, NOT sourced from any
 * real-time feed, and should be treated as a rough starting point only.
 * Always get a certified appraisal (GIA/IGI report) and a jeweller quote for
 * an actual transaction.
 */

export const CARAT_WEIGHTS = [0.3, 0.5, 0.7, 1.0, 1.5, 2.0, 3.0] as const;

export const CLARITY_GRADES = [
  { grade: 'FL/IF', label: 'Flawless / Internally Flawless', multiplier: 1.8 },
  { grade: 'VVS1-VVS2', label: 'Very, Very Slightly Included', multiplier: 1.4 },
  { grade: 'VS1-VS2', label: 'Very Slightly Included', multiplier: 1.15 },
  { grade: 'SI1-SI2', label: 'Slightly Included', multiplier: 1.0 },
  { grade: 'I1', label: 'Included', multiplier: 0.65 },
] as const;

export const COLOR_GRADES = [
  { grade: 'D-F', label: 'Colourless', multiplier: 1.35 },
  { grade: 'G-H', label: 'Near Colourless', multiplier: 1.1 },
  { grade: 'I-J', label: 'Near Colourless (faint tint)', multiplier: 1.0 },
  { grade: 'K-M', label: 'Faint Yellow', multiplier: 0.75 },
] as const;

export const CUT_GRADES = [
  { grade: 'Excellent', multiplier: 1.15 },
  { grade: 'Very Good', multiplier: 1.0 },
  { grade: 'Good', multiplier: 0.88 },
  { grade: 'Fair', multiplier: 0.72 },
] as const;

/**
 * Diamond "shapes" (often loosely called types) and how their price per
 * carat typically compares to a Round Brilliant of the same carat/clarity/
 * colour/cut. Round Brilliant is the baseline (1.0) because it wastes the
 * most rough material in cutting and is the most in-demand shape, so it
 * commands the highest price per carat; fancy shapes are usually cut from
 * rough more efficiently and are priced somewhat lower per carat. These are
 * illustrative, widely-documented market tendencies, not a fixed formula.
 */
export const DIAMOND_SHAPES = [
  { shape: 'Round Brilliant', multiplier: 1.0, note: 'Most popular; maximum brilliance; highest price per carat' },
  { shape: 'Oval', multiplier: 0.92, note: 'Elongates the finger; strong brilliance' },
  { shape: 'Princess', multiplier: 0.9, note: 'Square modern cut; less rough wastage than round' },
  { shape: 'Cushion', multiplier: 0.88, note: 'Rounded corners; soft vintage look' },
  { shape: 'Radiant', multiplier: 0.89, note: 'Square/rectangular with trimmed corners' },
  { shape: 'Pear', multiplier: 0.87, note: 'Teardrop shape; combines round and marquise' },
  { shape: 'Marquise', multiplier: 0.86, note: 'Elongated shape; maximises visual size per carat' },
  { shape: 'Emerald', multiplier: 0.85, note: 'Step-cut; emphasises clarity over sparkle' },
  { shape: 'Asscher', multiplier: 0.84, note: 'Square step-cut; vintage Art Deco look' },
  { shape: 'Heart', multiplier: 0.83, note: 'Romantic symbolic shape; harder to cut symmetrically' },
] as const;

export function shapeMultiplierFor(shape: string): number {
  return DIAMOND_SHAPES.find((s) => s.shape === shape)?.multiplier ?? 1;
}

/**
 * Illustrative base price per carat (₹, for a round-brilliant, SI clarity,
 * I-J colour, Very Good cut stone) at each carat weight — this is where the
 * well-documented "price per carat rises steeply with size" effect is
 * modelled in, since larger rough diamonds are exponentially rarer.
 * These are indicative reference points only, not a live price feed.
 */
export const BASE_PRICE_PER_CARAT: Record<number, number> = {
  0.3: 28000,
  0.5: 45000,
  0.7: 65000,
  1.0: 110000,
  1.5: 160000,
  2.0: 230000,
  3.0: 340000,
};

/** Finds the closest defined carat weight to interpolate a base rate for any input weight. */
export function basePricePerCaratFor(carat: number): number {
  const weights = Object.keys(BASE_PRICE_PER_CARAT)
    .map(Number)
    .sort((a, b) => a - b);

  if (carat <= weights[0]) return BASE_PRICE_PER_CARAT[weights[0]];
  if (carat >= weights[weights.length - 1]) return BASE_PRICE_PER_CARAT[weights[weights.length - 1]];

  for (let i = 0; i < weights.length - 1; i++) {
    const lo = weights[i];
    const hi = weights[i + 1];
    if (carat >= lo && carat <= hi) {
      const t = (carat - lo) / (hi - lo);
      return BASE_PRICE_PER_CARAT[lo] + t * (BASE_PRICE_PER_CARAT[hi] - BASE_PRICE_PER_CARAT[lo]);
    }
  }
  return BASE_PRICE_PER_CARAT[1.0];
}

export function estimateDiamondPrice(params: {
  carat: number;
  clarityMultiplier: number;
  colorMultiplier: number;
  cutMultiplier: number;
  shapeMultiplier?: number;
  cityIndex?: number;
}): { low: number; high: number; mid: number } {
  const base = basePricePerCaratFor(params.carat) * params.carat;
  const combined =
    params.clarityMultiplier *
    params.colorMultiplier *
    params.cutMultiplier *
    (params.shapeMultiplier ?? 1) *
    (params.cityIndex ?? 1);
  const mid = base * combined;
  // A wide ± band, since real transaction prices for a given grade combination
  // still vary a lot by certifier, fluorescence, polish/symmetry, and retailer margin.
  return { low: Math.round(mid * 0.8), high: Math.round(mid * 1.25), mid: Math.round(mid) };
}

/**
 * DIAMOND CITY INDEX
 * ------------------
 * Diamonds have no per-city wholesale benchmark the way gold/silver do —
 * every stone is individually priced. This index only approximates how a
 * city's typical *retail* diamond price tends to sit relative to the
 * national baseline (1.0), based on well-known, publicly documented market
 * structure: Surat and Mumbai are India's diamond cutting/trading hubs with
 * the most competitive retail pricing, while smaller retail-only markets
 * usually carry a modest premium for transport and lower trade volume.
 * These are illustrative reference numbers only, not a live or verified feed.
 */
export const CITY_DIAMOND_INDEX: Record<string, number> = {
  surat: 0.94,
  mumbai: 0.97,
  ahmedabad: 0.98,
  delhi: 1.0,
  bangalore: 1.01,
  chennai: 1.02,
  hyderabad: 1.0,
  kolkata: 1.0,
  jaipur: 0.99,
  pune: 1.0,
};

export function diamondIndexForCity(citySlug: string): number {
  return CITY_DIAMOND_INDEX[citySlug] ?? 1.03; // smaller markets: modest default premium
}

/** Indicative per-carat reference price table for a given city, at a fixed
 * baseline grade (Very Good cut, SI clarity, I-J colour, Round Brilliant). */
export function cityCaratTable(citySlug: string) {
  const index = diamondIndexForCity(citySlug);
  return CARAT_WEIGHTS.map((c) => ({
    carat: c,
    price: Math.round(basePricePerCaratFor(c) * c * index),
  }));
}

/** Indicative 1-carat baseline-grade price by shape, for a given city. */
export function cityShapeTable(citySlug: string) {
  const index = diamondIndexForCity(citySlug);
  const base = basePricePerCaratFor(1.0) * 1.0;
  return DIAMOND_SHAPES.map((s) => ({
    shape: s.shape,
    note: s.note,
    price: Math.round(base * s.multiplier * index),
  }));
}

export function diamondCityFaqs(cityName: string) {
  return [
    {
      question: `Is there a "live diamond rate" for ${cityName}?`,
      answer:
        `No. Unlike gold or silver, no exchange publishes a single daily spot price for diamonds, so ${cityName} does not have a "live" per-gram rate the way gold and silver do. The figures on this page are illustrative reference points based on typical carat, cut, colour, and clarity pricing patterns, adjusted by a general local-market index — not a live feed.`,
    },
    {
      question: `Why do diamond prices in ${cityName} differ from other cities?`,
      answer:
        'Retail diamond pricing varies city to city mainly because of proximity to India\u2019s cutting and trading hubs (Surat and Mumbai typically see the most competitive pricing), transport and overheads, local jeweller margins, and demand. This is different from gold/silver, where the underlying commodity price is identical everywhere and only a small local premium is added.',
    },
    ...DIAMOND_FAQS,
  ];
}

export const DIAMOND_FAQS = [
  {
    question: 'Why isn\u2019t there a "live diamond rate" like gold or silver?',
    answer:
      'Gold and silver are fungible commodities — one gram of 24K gold is identical to any other, so a single global spot price applies everywhere. Diamonds are the opposite: no two polished diamonds are identical, so price depends on the specific combination of carat, cut, colour, and clarity (the "4Cs") of that individual stone, plus its certification. There is no equivalent daily benchmark rate.',
  },
  {
    question: 'What are the 4Cs of a diamond?',
    answer:
      'Carat (weight), Cut (how well it\u2019s proportioned and polished, which affects sparkle), Colour (graded D to Z, with D being colourless and most valuable), and Clarity (how free it is of internal/external inclusions, graded from Flawless to Included).',
  },
  {
    question: 'Why does price per carat jump so much at higher carat weights?',
    answer:
      'Larger rough diamonds of gem quality are exponentially rarer than smaller ones, so price per carat rises steeply with size rather than scaling linearly — a 2-carat diamond typically costs well more than twice a comparable 1-carat stone.',
  },
  {
    question: 'What certification should I look for?',
    answer:
      'Reports from GIA (Gemological Institute of America) or IGI (International Gemological Institute) are the most widely trusted certifications globally and in India. Always ask for the certificate and verify the report number on the certifying lab\u2019s website before buying.',
  },
  {
    question: 'Are lab-grown diamonds priced the same as natural diamonds?',
    answer:
      'No. Lab-grown diamonds are chemically and optically identical to natural diamonds but are typically priced significantly lower — often 60-80% less than a comparable natural diamond of the same 4Cs — because they aren\u2019t naturally rare. Always confirm whether a stone is natural or lab-grown before comparing prices.',
  },
  {
    question: 'Is this price estimator accurate for an actual purchase?',
    answer:
      'No — treat it as a rough starting point only. Actual retail prices depend on the specific stone\u2019s certification, fluorescence, polish and symmetry grades, the jeweller\u2019s margin, and current market conditions. Always get a quote and a certified appraisal from a jeweller before buying or selling.',
  },
];
