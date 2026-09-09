export interface CityMeta {
  slug: string;
  name: string;
}

export const RATE_CITIES: CityMeta[] = [
  { slug: 'bangalore', name: 'Bangalore' },
  { slug: 'chennai', name: 'Chennai' },
  { slug: 'delhi', name: 'Delhi' },
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'kolkata', name: 'Kolkata' },
  { slug: 'mumbai', name: 'Mumbai' },
];

/**
 * Indicative rates only \u2014 gold and silver prices move through the day and vary
 * slightly by jeweller due to local taxes and making charges. These figures
 * are a manually-updated snapshot (see RATES_LAST_UPDATED below) and are not
 * a live feed. To show true real-time rates, wire this file up to a metals
 * price API (e.g. GoldAPI.io, MetalpriceAPI, or a data vendor your bullion
 * partner provides) and replace the static values with an API call.
 */
export const RATES_LAST_UPDATED = '9 September 2026';

interface GoldCityRate {
  gold24k: number; // per gram
  gold22k: number; // per gram
  gold18k: number; // per gram
}

interface SilverCityRate {
  silverPerGram: number;
  silverPerKg: number;
}

export const GOLD_RATES: Record<string, GoldCityRate> = {
  mumbai: { gold24k: 15535, gold22k: 14240, gold18k: 11651 },
  delhi: { gold24k: 15595, gold22k: 14295, gold18k: 11696 },
  chennai: { gold24k: 15635, gold22k: 14335, gold18k: 11726 },
  bangalore: { gold24k: 15545, gold22k: 14245, gold18k: 11659 },
  hyderabad: { gold24k: 15535, gold22k: 14240, gold18k: 11651 },
  kolkata: { gold24k: 15535, gold22k: 14240, gold18k: 11651 },
};

export const SILVER_RATES: Record<string, SilverCityRate> = {
  mumbai: { silverPerGram: 250, silverPerKg: 250000 },
  delhi: { silverPerGram: 250, silverPerKg: 250000 },
  chennai: { silverPerGram: 262, silverPerKg: 261900 },
  bangalore: { silverPerGram: 262, silverPerKg: 261900 },
  hyderabad: { silverPerGram: 262, silverPerKg: 261900 },
  kolkata: { silverPerGram: 250, silverPerKg: 250000 },
};

export function getCity(slug: string): CityMeta | undefined {
  return RATE_CITIES.find((c) => c.slug === slug);
}

export const GOLD_FAQS = [
  {
    question: 'Why do gold rates differ from city to city?',
    answer:
      'Gold itself is priced off the same international bullion benchmark everywhere, but the final retail rate you see varies slightly by city because of local taxes, jeweller association rates, transport and octroi costs, and local demand.',
  },
  {
    question: 'What is the difference between 24K, 22K, and 18K gold?',
    answer:
      '24K gold is about 99.9% pure and is the reference rate quoted daily, but it is too soft for everyday jewellery. 22K (about 91.6% pure) is the standard for most Indian gold jewellery, while 18K (75% pure) is common in lighter, diamond-studded, or Western-style jewellery.',
  },
  {
    question: 'Does the quoted gold rate include making charges and GST?',
    answer:
      'No. The per-gram rate shown here is the base metal rate only. Jewellers separately add making charges (a percentage or flat fee for crafting the piece) and 3% GST on the final billed value, so the amount you pay at the counter will be higher than the base rate.',
  },
  {
    question: 'How can I verify the purity of gold I am buying?',
    answer:
      'Look for BIS hallmarking on the piece, which certifies the purity (e.g. "916" for 22K). Buying only from BIS-certified jewellers and asking for a purity certificate along with your bill is the safest way to confirm what you are paying for.',
  },
];

export const SILVER_FAQS = [
  {
    question: 'What causes silver prices to change daily?',
    answer:
      'Silver prices track international bullion markets and are influenced by global demand (including industrial use in electronics and solar panels), the value of the rupee against the dollar, and domestic import duties.',
  },
  {
    question: 'Is the silver rate shown per gram or per kg?',
    answer:
      'Silver is conventionally quoted per kilogram in the Indian bullion market, though retailers also display a per-gram rate for convenience when you are buying smaller items like coins or utensils.',
  },
  {
    question: 'Does the silver rate include GST and making charges?',
    answer:
      'No. The rate shown is the base bullion rate. Silver jewellery, coins, and articles attract 3% GST, and crafted items also carry additional making charges over and above the metal rate.',
  },
  {
    question: 'Is 999 silver the same as sterling silver?',
    answer:
      'No. 999 (fine) silver is about 99.9% pure and is used mainly for investment bars and coins because it is too soft for daily-use items. Sterling silver (925) is 92.5% pure, alloyed with other metals for strength, and is the standard used for jewellery and silverware.',
  },
];
