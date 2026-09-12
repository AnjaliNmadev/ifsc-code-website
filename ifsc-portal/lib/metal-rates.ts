export interface CityMeta {
  slug: string;
  name: string;
  state: string;
}

/**
 * Major Indian cities covered by the gold/silver rate trackers. This list can
 * be extended further — every city here automatically gets its own
 * gold-rate-<slug> and silver-rate-<slug> page via the dynamic routes in
 * app/gold-rate-[city] and app/silver-rate-[city], so adding a new city is a
 * one-line addition rather than a new page file.
 */
export const RATE_CITIES: CityMeta[] = [
  // Metro cities
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  // Other major cities
  { slug: 'pune', name: 'Pune', state: 'Maharashtra' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
  { slug: 'surat', name: 'Surat', state: 'Gujarat' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh' },
  { slug: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh' },
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra' },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh' },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh' },
  { slug: 'patna', name: 'Patna', state: 'Bihar' },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat' },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu' },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala' },
  { slug: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala' },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { slug: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh' },
  { slug: 'nashik', name: 'Nashik', state: 'Maharashtra' },
  { slug: 'ludhiana', name: 'Ludhiana', state: 'Punjab' },
  { slug: 'amritsar', name: 'Amritsar', state: 'Punjab' },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh' },
  { slug: 'agra', name: 'Agra', state: 'Uttar Pradesh' },
  { slug: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh' },
  { slug: 'guwahati', name: 'Guwahati', state: 'Assam' },
  { slug: 'ranchi', name: 'Ranchi', state: 'Jharkhand' },
  { slug: 'raipur', name: 'Raipur', state: 'Chhattisgarh' },
  { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha' },
  { slug: 'mysore', name: 'Mysore', state: 'Karnataka' },
  { slug: 'madurai', name: 'Madurai', state: 'Tamil Nadu' },
];

export function getCity(slug: string): CityMeta | undefined {
  return RATE_CITIES.find((c) => c.slug === slug);
}

/**
 * Live gold/silver figures themselves come from lib/live-rates.ts (a
 * keyless public bullion API, refreshed automatically). This file just
 * keeps the static city list and the FAQ copy used across all city pages.
 */

export const GOLD_FAQS = [
  {
    question: 'Why do gold rates differ from city to city?',
    answer:
      'Gold itself is priced off the same international bullion benchmark everywhere, but the final retail rate you see varies slightly by city because of local jeweller association rates, transport and octroi costs, and local demand.',
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
  {
    question: 'How often does the gold rate on this page update?',
    answer:
      'The rate is pulled from a live bullion price feed and refreshed automatically roughly every 30 minutes, so it stays close to the current market price without needing a manual update.',
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
  {
    question: 'How often does the silver rate on this page update?',
    answer:
      'The rate is pulled from a live bullion price feed and refreshed automatically roughly every 30 minutes, so it stays close to the current market price without needing a manual update.',
  },
];
