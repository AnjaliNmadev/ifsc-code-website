import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators';

const POPULAR_SLUGS = [
  'simple-interest-calculator',
  'income-tax-calculator',
  'gratuity-calculator',
  'sip-calculator',
  'epf-calculator',
  'hra-calculator',
  'salary-calculator',
  'ppf-calculator',
  'rd-calculator',
  'swp-calculator',
];

/**
 * A compact "Popular Calculators" list for the sidebar of guide and rate
 * pages, similar to the quick-links panel seen on most tax/finance sites.
 * Pulls from the real CALCULATORS list rather than a hard-coded duplicate.
 */
export default function PopularCalculatorsSidebar() {
  const popular = POPULAR_SLUGS.map((slug) => CALCULATORS.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <p className="font-display text-base font-bold text-ink-900">Popular Calculators</p>
      <ul className="mt-3 divide-y divide-ink-100">
        {popular.map((calc) => (
          <li key={calc.slug}>
            <Link
              href={`/calculators/${calc.slug}`}
              className="block py-2.5 text-sm font-medium text-ink-600 transition hover:text-trust-700"
            >
              {calc.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/calculators"
        className="mt-2 inline-block text-sm font-semibold text-trust-700 hover:underline"
      >
        View all calculators →
      </Link>
    </div>
  );
}
