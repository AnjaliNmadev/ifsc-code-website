import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import SwpCalculator from '@/components/calculators/SwpCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `SWP Calculator — Systematic Withdrawal Plan | ${SITE_NAME}`,
  description:
    'Free SWP calculator. See how long your lump sum investment lasts with regular monthly withdrawals, and how much you end up withdrawing in total.',
  alternates: { canonical: buildCanonical(['calculators', 'swp-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is a Systematic Withdrawal Plan (SWP)?',
    answer:
      'An SWP lets you withdraw a fixed amount from your mutual fund investment at regular intervals, usually monthly, while the remaining balance stays invested and continues to earn returns.',
  },
  {
    question: 'What happens if my withdrawal rate is too high?',
    answer:
      'If your monthly withdrawal exceeds what your investment can sustain at its expected rate of return, the balance shrinks over time and can get exhausted before your intended withdrawal period ends.',
  },
  {
    question: 'Is SWP better than a fixed deposit for regular income?',
    answer:
      'SWPs can offer more tax-efficient regular income than FD interest for equity and hybrid mutual funds, since withdrawals are treated as a mix of capital and gains, but they also carry market risk that FDs don\u2019t.',
  },
];

export default function SwpCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'SWP Calculator', href: '/calculators/swp-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        SWP Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Find out how long a lump sum investment can sustain regular monthly withdrawals, based on
        your expected rate of return.
      </p>

      <div className="mt-8">
        <SwpCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the SWP calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your initial investment amount, how much you want to withdraw every month, your
            expected annual return, and the withdrawal period. The calculator simulates your
            balance month by month, showing your final balance (or when the fund would run out)
            and the total amount withdrawn.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-ink-200 bg-white p-4 open:border-trust-300"
              >
                <summary className="cursor-pointer list-none text-base font-bold text-ink-900">
                  {faq.question}
                </summary>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
