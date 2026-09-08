export type CalculatorCategory = 'income-tax' | 'financial-planning' | 'other';

export interface CalculatorMeta {
  slug: string;
  name: string;
  shortDescription: string;
  category: CalculatorCategory;
}

export const CALCULATOR_CATEGORIES: { key: CalculatorCategory; label: string }[] = [
  { key: 'income-tax', label: 'Income Tax Calculators' },
  { key: 'financial-planning', label: 'Financial Planning Calculators' },
  { key: 'other', label: 'Other Calculators' },
];

export const CALCULATORS: CalculatorMeta[] = [
  // Income Tax Calculators
  {
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    shortDescription: 'Estimate your income tax liability under the new and old tax regimes.',
    category: 'income-tax',
  },
  {
    slug: 'advance-tax-calculator',
    name: 'Advance Tax Calculator',
    shortDescription: 'Get your quarterly advance tax installment schedule and due dates.',
    category: 'income-tax',
  },
  {
    slug: 'hra-calculator',
    name: 'HRA Calculator',
    shortDescription: 'Calculate how much of your House Rent Allowance is tax-exempt.',
    category: 'income-tax',
  },
  {
    slug: 'capital-gains-calculator',
    name: 'Capital Gains Calculator',
    shortDescription: 'Estimate short-term and long-term capital gains tax on your investments.',
    category: 'income-tax',
  },
  {
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    shortDescription: 'Convert your CTC into estimated monthly and annual take-home salary.',
    category: 'income-tax',
  },
  // Financial Planning Calculators
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    shortDescription: 'Estimate the future value of your monthly mutual fund SIP investments.',
    category: 'financial-planning',
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    shortDescription: 'Calculate your monthly loan EMI, total interest, and total repayment.',
    category: 'financial-planning',
  },
  {
    slug: 'step-up-sip-calculator',
    name: 'Step-Up SIP Calculator',
    shortDescription: 'Calculate SIP returns when you increase your monthly investment every year.',
    category: 'financial-planning',
  },
  {
    slug: 'fd-calculator',
    name: 'FD Calculator',
    shortDescription: 'Estimate the maturity value and interest earned on a fixed deposit.',
    category: 'financial-planning',
  },
  {
    slug: 'rd-calculator',
    name: 'RD Calculator',
    shortDescription: 'Estimate the maturity value of a monthly recurring deposit.',
    category: 'financial-planning',
  },
  {
    slug: 'savings-calculator',
    name: 'Savings Calculator',
    shortDescription: 'Project how a lump sum plus regular monthly savings can grow over time.',
    category: 'financial-planning',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortDescription: 'Quickly calculate simple interest on any principal amount.',
    category: 'financial-planning',
  },
  // Other Calculators
  {
    slug: 'retirement-planning-calculator',
    name: 'Retirement Planning Calculator',
    shortDescription: 'Estimate the retirement corpus you need and the monthly SIP to get there.',
    category: 'other',
  },
  {
    slug: 'ppf-calculator',
    name: 'PPF Calculator',
    shortDescription: 'Estimate the maturity value of your Public Provident Fund investments.',
    category: 'other',
  },
  {
    slug: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    shortDescription: 'Calculate the gratuity amount payable based on your salary and service.',
    category: 'other',
  },
  {
    slug: 'epf-calculator',
    name: 'EPF Calculator',
    shortDescription: 'Project your Employee Provident Fund corpus at retirement.',
    category: 'other',
  },
  {
    slug: 'swp-calculator',
    name: 'SWP Calculator',
    shortDescription: 'See how long a lump sum lasts with regular systematic withdrawals.',
    category: 'other',
  },
  {
    slug: 'nps-calculator',
    name: 'NPS Calculator',
    shortDescription: 'Estimate your National Pension System corpus, lump sum, and monthly pension.',
    category: 'other',
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorMeta[] {
  return CALCULATORS.filter((c) => c.category === category);
}

/**
 * Shared income-tax slab logic (FY 2024-25 / AY 2025-26 rates), used by both
 * the Income Tax Calculator and the Salary (CTC to in-hand) Calculator so the
 * two tools always stay in sync. These are simplified, informational
 * estimates — they exclude surcharge, marginal relief, and age-based senior
 * citizen slabs. Always verify against the latest rates before filing.
 */

interface TaxSlab {
  upto: number;
  rate: number;
}

const NEW_REGIME_SLABS: TaxSlab[] = [
  { upto: 300000, rate: 0 },
  { upto: 700000, rate: 0.05 },
  { upto: 1000000, rate: 0.1 },
  { upto: 1200000, rate: 0.15 },
  { upto: 1500000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

const OLD_REGIME_SLABS: TaxSlab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 0.05 },
  { upto: 1000000, rate: 0.2 },
  { upto: Infinity, rate: 0.3 },
];

function slabTax(taxableIncome: number, slabs: TaxSlab[]): number {
  let tax = 0;
  let lastLimit = 0;
  for (const slab of slabs) {
    if (taxableIncome <= lastLimit) break;
    const amountInSlab = Math.min(taxableIncome, slab.upto) - lastLimit;
    tax += amountInSlab * slab.rate;
    lastLimit = slab.upto;
  }
  return tax;
}

export const NEW_REGIME_STANDARD_DEDUCTION = 75000;
export const OLD_REGIME_STANDARD_DEDUCTION = 50000;

/** Returns tax payable (including 4% health & education cess) under the new regime. */
export function computeNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 700000) return 0; // Section 87A rebate
  const tax = slabTax(taxableIncome, NEW_REGIME_SLABS);
  return tax * 1.04;
}

/** Returns tax payable (including 4% health & education cess) under the old regime. */
export function computeOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 500000) return 0; // Section 87A rebate
  const tax = slabTax(taxableIncome, OLD_REGIME_SLABS);
  return tax * 1.04;
}
