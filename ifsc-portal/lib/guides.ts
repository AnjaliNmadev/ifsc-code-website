export interface GuideMeta {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
}

export const GUIDE_CATEGORIES = [
  { key: 'tax', label: 'Tax Guides' },
  { key: 'documents', label: 'PAN, Aadhaar & Documents' },
  { key: 'payments', label: 'Payment Systems' },
  { key: 'gold', label: 'Gold Prices' },
  { key: 'silver', label: 'Silver Prices' },
  { key: 'ipo', label: 'IPO' },
] as const;

export const GUIDES: GuideMeta[] = [
  {
    slug: 'long-term-capital-gains-tax',
    title: 'Long-Term Capital Gains (LTCG) Tax',
    shortDescription:
      'What LTCG tax is, current rates, exemption limits, and how it applies to shares, mutual funds, and property.',
    category: 'tax',
  },
  {
    slug: 'short-term-capital-gains-tax',
    title: 'Short-Term Capital Gains (STCG) Tax',
    shortDescription: 'How STCG differs from LTCG, applicable holding periods, and current tax rates.',
    category: 'tax',
  },
  {
    slug: 'other-income-sources',
    title: 'Income from Other Sources',
    shortDescription:
      'What counts as "income from other sources" under the Income Tax Act, and how it is taxed.',
    category: 'tax',
  },
  {
    slug: 'pan-card',
    title: 'PAN Card: Everything You Need to Know',
    shortDescription:
      'What a PAN card is, why it matters for banking, how to apply, and how to link it with Aadhaar.',
    category: 'documents',
  },
  {
    slug: 'aadhaar-card',
    title: 'Aadhaar Card: Everything You Need to Know',
    shortDescription:
      'What Aadhaar is used for, how to update your details, and how it connects to your bank account.',
    category: 'documents',
  },
  {
    slug: 'upi-payments-guide',
    title: 'UPI Payments: A Complete Guide',
    shortDescription: 'How UPI works, transaction limits, and how it differs from NEFT/IMPS.',
    category: 'payments',
  },
  {
    slug: 'neft-vs-rtgs-vs-imps',
    title: 'NEFT vs RTGS vs IMPS: What\u2019s the Difference?',
    shortDescription:
      'A side-by-side comparison of India\u2019s three main electronic fund transfer systems.',
    category: 'payments',
  },
  {
    slug: 'gold-rate-bangalore',
    title: 'Gold Rate in Bangalore',
    shortDescription: 'What drives the gold rate in Bangalore, how 22K and 24K prices differ, and how making charges and GST affect what you pay.',
    category: 'gold',
  },
  {
    slug: 'gold-rate-chennai',
    title: 'Gold Rate in Chennai',
    shortDescription: 'How gold is priced in Chennai, why Tamil Nadu rates often differ from other cities, and what to check before buying.',
    category: 'gold',
  },
  {
    slug: 'gold-rate-delhi',
    title: 'Gold Rate in Delhi',
    shortDescription: 'How the Delhi gold rate is set, the difference between 22K and 24K gold, and how to verify hallmark purity.',
    category: 'gold',
  },
  {
    slug: 'gold-rate-hyderabad',
    title: 'Gold Rate in Hyderabad',
    shortDescription: 'What determines Hyderabad\u2019s daily gold price, festival-season demand, and how to compare jeweller quotes.',
    category: 'gold',
  },
  {
    slug: 'gold-rate-kolkata',
    title: 'Gold Rate in Kolkata',
    shortDescription: 'How gold rates move in Kolkata, the role of import duty and rupee movement, and tips before you buy.',
    category: 'gold',
  },
  {
    slug: 'gold-rate-mumbai',
    title: 'Gold Rate in Mumbai',
    shortDescription: 'How Mumbai\u2019s gold rate is benchmarked, association-quoted prices, and what making charges and GST add to the bill.',
    category: 'gold',
  },
  {
    slug: 'silver-rate-bangalore',
    title: 'Silver Rate in Bangalore',
    shortDescription: 'What moves the silver rate in Bangalore, how it is priced per gram and per kg, and what to know before buying.',
    category: 'silver',
  },
  {
    slug: 'silver-rate-chennai',
    title: 'Silver Rate in Chennai',
    shortDescription: 'How silver is priced in Chennai, seasonal demand from jewellery and utensils, and how purity is verified.',
    category: 'silver',
  },
  {
    slug: 'silver-rate-delhi',
    title: 'Silver Rate in Delhi',
    shortDescription: 'How Delhi\u2019s silver rate is determined, the difference between silver bars, coins, and jewellery pricing.',
    category: 'silver',
  },
  {
    slug: 'silver-rate-hyderabad',
    title: 'Silver Rate in Hyderabad',
    shortDescription: 'What drives silver prices in Hyderabad, GST and making charges, and how to compare rates across sellers.',
    category: 'silver',
  },
  {
    slug: 'silver-rate-kolkata',
    title: 'Silver Rate in Kolkata',
    shortDescription: 'How silver is priced in Kolkata, factors that move the rate day to day, and buying tips.',
    category: 'silver',
  },
  {
    slug: 'silver-rate-mumbai',
    title: 'Silver Rate in Mumbai',
    shortDescription: 'How Mumbai\u2019s silver rate is benchmarked, global silver price linkage, and what affects your final bill.',
    category: 'silver',
  },
  {
    slug: 'what-is-grey-market-premium-gmp-ipo',
    title: 'What is Grey Market Premium (GMP) in an IPO?',
    shortDescription: 'What GMP means, how it is estimated, and why it is an unofficial and sometimes unreliable listing-day indicator.',
    category: 'ipo',
  },
  {
    slug: 'types-of-ipo',
    title: 'Types of IPO',
    shortDescription: 'Fixed price issues vs book-built issues, and how mainboard IPOs differ from SME IPOs.',
    category: 'ipo',
  },
  {
    slug: 'how-to-check-ipo-allotment-status',
    title: 'How to Check IPO Allotment Status',
    shortDescription: 'Step-by-step ways to check your IPO allotment via the registrar, exchange, or your broker.',
    category: 'ipo',
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(categoryKey: string): GuideMeta[] {
  return GUIDES.filter((g) => g.category === categoryKey);
}
