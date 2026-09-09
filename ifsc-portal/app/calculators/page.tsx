import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Calculator } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CALCULATORS } from '@/lib/calculators';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Free Financial Calculators | ${SITE_NAME}`,
  description:
    'Free EMI, Fixed Deposit, Recurring Deposit, and Simple Interest calculators to help you plan loans and savings.',
  alternates: { canonical: buildCanonical(['calculators']) },
};

export default function CalculatorsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Calculators', href: '/calculators' }]} />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Financial Calculators
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Free tools to help you plan loans, deposits, and savings — no sign-up required.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group flex items-start gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-trust-400 hover:shadow-lg"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trust-50 text-trust-700">
              <Calculator size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-bold text-ink-900">{calc.name}</p>
              <p className="mt-1 text-sm text-ink-500">{calc.shortDescription}</p>
            </div>
            <ArrowRight
              size={20}
              className="mt-1 shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:text-trust-600"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
