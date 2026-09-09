export interface CalculatorMeta {
  slug: string;
  name: string;
  shortDescription: string;
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    shortDescription: 'Calculate your monthly loan EMI, total interest, and total repayment.',
  },
  {
    slug: 'fd-calculator',
    name: 'FD Calculator',
    shortDescription: 'Estimate the maturity value and interest earned on a fixed deposit.',
  },
  {
    slug: 'rd-calculator',
    name: 'RD Calculator',
    shortDescription: 'Estimate the maturity value of a monthly recurring deposit.',
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    shortDescription: 'Quickly calculate simple interest on any principal amount.',
  },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
