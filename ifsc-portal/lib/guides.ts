export type GuideCategory = 'capital-gains' | 'other-income' | 'personal-finance';

export interface GuideMeta {
  slug: string;
  title: string;
  shortDescription: string;
  category: GuideCategory;
}

export const GUIDE_CATEGORIES: { key: GuideCategory; label: string }[] = [
  { key: 'capital-gains', label: 'Capital Gains Guide' },
  { key: 'other-income', label: 'Other Income Guides' },
  { key: 'personal-finance', label: 'Personal Finance Guides' },
];

export const GUIDES: GuideMeta[] = [
  // Capital Gains Guide
  {
    slug: 'capital-gains-income',
    title: 'Capital Gains Tax',
    shortDescription: 'What capital gains are, how they are classified, and how they are taxed in India.',
    category: 'capital-gains',
  },
  {
    slug: 'long-term-capital-gains-ltcg-tax',
    title: 'LTCG Tax',
    shortDescription: 'Long-term capital gains tax rates, holding periods, and exemptions explained.',
    category: 'capital-gains',
  },
  {
    slug: 'short-term-capital-gains-stcg-tax',
    title: 'STCG Tax',
    shortDescription: 'Short-term capital gains tax rates and how they differ across asset types.',
    category: 'capital-gains',
  },
  {
    slug: 'section-54-capital-gains-exemption',
    title: 'Capital Gains Exemption',
    shortDescription: 'How Sections 54, 54F, and 54EC let you save tax on capital gains from property.',
    category: 'capital-gains',
  },
  {
    slug: 'cost-inflation-index',
    title: 'Cost Inflation Index',
    shortDescription: 'What the Cost Inflation Index is and where it still applies after Budget 2024.',
    category: 'capital-gains',
  },
  {
    slug: 'short-term-capital-gain-on-shares',
    title: 'STCG Tax on Shares',
    shortDescription: 'How short-term capital gains on listed shares and equity funds are taxed.',
    category: 'capital-gains',
  },
  {
    slug: 'long-term-capital-gains-on-shares',
    title: 'LTCG Tax on Shares',
    shortDescription: 'How long-term capital gains on listed shares and equity funds are taxed.',
    category: 'capital-gains',
  },
  // Other Income Guides
  {
    slug: 'other-income-sources',
    title: 'Income From Other Sources',
    shortDescription: 'What counts as "income from other sources" and how it is taxed.',
    category: 'other-income',
  },
  {
    slug: 'salary-income',
    title: 'Income From Salary',
    shortDescription: 'How salary income is defined, its components, and applicable deductions.',
    category: 'other-income',
  },
  {
    slug: 'how-to-save-tax-in-new-tax-regime',
    title: 'How to Save Tax in New Regime',
    shortDescription: 'The limited but useful ways to reduce your tax outgo under the new regime.',
    category: 'other-income',
  },
  {
    slug: 'income-tax-savings',
    title: 'How to Save Tax in Old Regime',
    shortDescription: 'Deductions and exemptions available to reduce tax under the old regime.',
    category: 'other-income',
  },
  {
    slug: 'income-tax-for-nri',
    title: 'NRI Income Tax',
    shortDescription: 'How residential status affects which income of an NRI is taxable in India.',
    category: 'other-income',
  },
  {
    slug: 'how-are-gifts-taxed',
    title: 'Gift Tax',
    shortDescription: 'When gifts of money or property are taxable, and when they are fully exempt.',
    category: 'other-income',
  },
  // Personal Finance Guides
  {
    slug: 'pan-card',
    title: 'PAN Card',
    shortDescription: 'What a PAN card is, why it matters, and how to apply for one.',
    category: 'personal-finance',
  },
  {
    slug: 'aadhaar-card',
    title: 'Aadhaar Card',
    shortDescription: 'What Aadhaar is, what it is used for, and how to update your details.',
    category: 'personal-finance',
  },
  {
    slug: 'ration-card',
    title: 'Ration Card',
    shortDescription: 'Types of ration cards in India and how they are used beyond subsidised food.',
    category: 'personal-finance',
  },
  {
    slug: 'upi-unified-payments-interface',
    title: 'UPI',
    shortDescription: 'How UPI works, its transaction limits, and how it differs from NEFT and IMPS.',
    category: 'personal-finance',
  },
  {
    slug: 'neft-national-electronic-funds-transfer',
    title: 'NEFT',
    shortDescription: 'How NEFT transfers work, settlement timing, and applicable limits.',
    category: 'personal-finance',
  },
  {
    slug: 'imps-immediate-payment-service',
    title: 'IMPS',
    shortDescription: 'How IMPS enables instant, 24x7 fund transfers and how it compares to NEFT/RTGS.',
    category: 'personal-finance',
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: GuideCategory): GuideMeta[] {
  return GUIDES.filter((g) => g.category === category);
}
