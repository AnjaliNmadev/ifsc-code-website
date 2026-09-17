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
 * BEYOND THE 4Cs
 * --------------
 * Carat/Cut/Colour/Clarity get all the attention, but a GIA/IGI report also
 * grades Fluorescence, Polish and Symmetry — and all three visibly move the
 * price a buyer is actually quoted. The multipliers below reflect
 * widely-documented trade tendencies, not a fixed formula:
 *
 *  - Fluorescence: how much the stone glows under UV light. On higher colour
 *    grades (D-F) strong blue fluorescence is usually discounted because it
 *    can make the stone look hazy/milky; on lower colour grades (I-J and
 *    below) faint-to-medium fluorescence can actually mask the yellow tint
 *    and is sometimes neutral or mildly positive. None/Faint is the trade
 *    default and is treated as the 1.0 baseline here.
 *  - Polish: the quality of the finish on each facet surface. Poor polish
 *    scatters light and dulls sparkle.
 *  - Symmetry: how precisely the facets align and meet. Poor symmetry
 *    misdirects light and is visible to a trained eye.
 *
 * Polish and Symmetry are graded on the same GIA scale (Excellent → Poor)
 * and individually have a smaller price impact than Cut, but together they
 * routinely account for a meaningful swing — which is exactly why a stone
 * with identical 4Cs can be quoted at noticeably different prices.
 */
export const FLUORESCENCE_GRADES = [
  { grade: 'None', multiplier: 1.0, note: 'No glow under UV — the trade default and safest resale choice' },
  { grade: 'Faint', multiplier: 0.99, note: 'Barely detectable; almost no price impact' },
  { grade: 'Medium', multiplier: 0.95, note: 'Noticeable under UV; mild discount, more on high colour grades' },
  { grade: 'Strong', multiplier: 0.89, note: 'Can look hazy in sunlight on D-F stones; clear discount' },
  { grade: 'Very Strong', multiplier: 0.83, note: 'Largest discount; risk of a visibly milky or oily look' },
] as const;

export const POLISH_GRADES = [
  { grade: 'Excellent', multiplier: 1.04, note: 'Flawless facet finish; maximum light return' },
  { grade: 'Very Good', multiplier: 1.0, note: 'Trade baseline; no visible effect to the naked eye' },
  { grade: 'Good', multiplier: 0.96, note: 'Minor surface marks under magnification' },
  { grade: 'Fair', multiplier: 0.9, note: 'Visible dullness; noticeably discounted' },
  { grade: 'Poor', multiplier: 0.82, note: 'Sparkle clearly affected; hardest to resell' },
] as const;

export const SYMMETRY_GRADES = [
  { grade: 'Excellent', multiplier: 1.04, note: 'Precisely aligned facets; crisp, even sparkle pattern' },
  { grade: 'Very Good', multiplier: 1.0, note: 'Trade baseline; misalignment not visible unaided' },
  { grade: 'Good', multiplier: 0.96, note: 'Slight misalignment; small discount' },
  { grade: 'Fair', multiplier: 0.9, note: 'Light leakage from off-centre facets' },
  { grade: 'Poor', multiplier: 0.82, note: 'Visibly uneven; significant discount' },
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

/**
 * Fluorescence interacts with colour rather than acting independently: on a
 * colourless D-F stone a strong glow is a real defect (hazy look) and is
 * discounted harder, while on a tinted I-J or K-M stone the same glow can
 * offset the yellow and is barely penalised. This adjusts the flat
 * fluorescence multiplier for the colour grade it's paired with, so the
 * estimator reflects how the trade actually prices the combination.
 */
export function adjustedFluorescenceMultiplier(
  fluorescenceMultiplier: number,
  colorGrade: string
): number {
  const discount = 1 - fluorescenceMultiplier; // 0 for None, grows with strength
  if (discount <= 0) return fluorescenceMultiplier;
  const weightByColor: Record<string, number> = {
    'D-F': 1.35, // colourless: penalised hardest
    'G-H': 1.0,
    'I-J': 0.55, // tint-masking partly offsets the discount
    'K-M': 0.3,
  };
  const weight = weightByColor[colorGrade] ?? 1;
  return 1 - discount * weight;
}

export function estimateDiamondPrice(params: {
  carat: number;
  clarityMultiplier: number;
  colorMultiplier: number;
  cutMultiplier: number;
  shapeMultiplier?: number;
  /** Fluorescence multiplier — pass it through adjustedFluorescenceMultiplier()
   * first if you know the colour grade, since the two interact. */
  fluorescenceMultiplier?: number;
  polishMultiplier?: number;
  symmetryMultiplier?: number;
  cityIndex?: number;
  /** Live scale factor from lib/live-diamond-rates.ts, tracking the
   * OpenFacet Diamond Composite Index's 24h trend. Defaults to 1 (no
   * live adjustment) so this keeps working if a caller doesn't pass one. */
  liveScaleFactor?: number;
}): { low: number; high: number; mid: number } {
  const base = basePricePerCaratFor(params.carat) * params.carat * (params.liveScaleFactor ?? 1);
  const combined =
    params.clarityMultiplier *
    params.colorMultiplier *
    params.cutMultiplier *
    (params.shapeMultiplier ?? 1) *
    (params.fluorescenceMultiplier ?? 1) *
    (params.polishMultiplier ?? 1) *
    (params.symmetryMultiplier ?? 1) *
    (params.cityIndex ?? 1);
  const mid = base * combined;
  // Still a ± band, since real transaction prices vary by certifier and
  // retailer margin — but slightly tighter than before, because
  // fluorescence, polish and symmetry are now modelled explicitly instead
  // of being lumped into this uncertainty range.
  return { low: Math.round(mid * 0.85), high: Math.round(mid * 1.2), mid: Math.round(mid) };
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
 * baseline grade (Very Good cut, SI clarity, I-J colour, Round Brilliant).
 * Pass `liveScaleFactor` (from lib/live-diamond-rates.ts) to nudge the
 * whole table by the live market index's 24h trend; defaults to 1. */
export function cityCaratTable(citySlug: string, liveScaleFactor = 1) {
  const index = diamondIndexForCity(citySlug);
  return CARAT_WEIGHTS.map((c) => ({
    carat: c,
    price: Math.round(basePricePerCaratFor(c) * c * index * liveScaleFactor),
  }));
}

/** Indicative 1-carat baseline-grade price by shape, for a given city. */
export function cityShapeTable(citySlug: string, liveScaleFactor = 1) {
  const index = diamondIndexForCity(citySlug);
  const base = basePricePerCaratFor(1.0) * 1.0 * liveScaleFactor;
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
        `Not per-stone. Unlike gold or silver, no exchange publishes a single daily spot price for an individual diamond, so ${cityName} does not have a "live" per-gram rate the way gold and silver do. The figures on this page combine typical carat, cut, colour, and clarity pricing patterns with a general local-market index, and are automatically nudged each day by a live diamond market index's 24-hour trend — but they still won't match a specific stone's actual quote.`,
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
  {
    question: 'Does fluorescence increase or decrease a diamond\u2019s price?',
    answer:
      'It depends on the colour grade. On colourless D-F stones, strong or very strong blue fluorescence is usually discounted — it can make the diamond look hazy or milky in sunlight. On lower colour grades like I-J or K-M, the same fluorescence can visually offset the yellow tint, so the discount is much smaller and some buyers even prefer it. None or Faint fluorescence is the trade default and is generally the safest choice for resale.',
  },
  {
    question: 'How much do polish and symmetry affect diamond price?',
    answer:
      'Individually each has a smaller effect than Cut, but together they add up to a meaningful difference. Polish grades the finish on each facet surface and symmetry grades how precisely the facets align — poor grades in either scatter or leak light and visibly dull the stone. A "Triple Excellent" (3EX) diamond, meaning Excellent cut, polish and symmetry, commands a premium and resells most easily. Dropping polish and symmetry from Excellent to Very Good is usually invisible to the naked eye and saves money; dropping to Fair or Poor is a false economy.',
  },
  {
    question: 'Can I see a diamond price trend over weeks or months?',
    answer:
      'Yes. The trend chart on this page can be switched between 1 week, 1 month, and 1 year views. It is built from a daily snapshot of the diamond market composite index, so the longer ranges fill in over time as more snapshots are recorded. It tracks broad market direction, not any individual stone.',
  },
  {
    question: 'Does this page update automatically?',
    answer:
      'Yes. The reference numbers on this page are automatically nudged up or down each day using the OpenFacet Diamond Composite Index (DCX) \u2014 a free, real-time benchmark built from public GIA-certified diamond listings \u2014 converted from USD to INR and refreshed roughly every 30 minutes. This keeps the table moving with real market conditions, but it still isn\u2019t a quote for any specific stone.',
  },
];
