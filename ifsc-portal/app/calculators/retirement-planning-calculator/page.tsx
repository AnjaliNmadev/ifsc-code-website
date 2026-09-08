import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import RetirementPlanningCalculator from '@/components/calculators/RetirementPlanningCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Retirement Planning Calculator — How Much You Need to Retire | ${SITE_NAME}`,
  description:
    'Free retirement planning calculator. Estimate the retirement corpus you need based on your current expenses and inflation, and the monthly SIP required to build it.',
  alternates: { canonical: buildCanonical(['calculators', 'retirement-planning-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'How much money do I need to retire comfortably?',
    answer:
      'It depends on your current monthly expenses, how many years until you retire, expected inflation, and how many years you expect to live after retirement. This calculator estimates the corpus needed to sustain your inflation-adjusted expenses throughout retirement.',
  },
  {
    question: 'Why does inflation matter so much for retirement planning?',
    answer:
      'Inflation erodes purchasing power over time, so an expense of ₹50,000 a month today could cost significantly more by the time you retire, and your retirement corpus needs to account for that growth, not just today\u2019s expenses.',
  },
  {
    question: 'What return should I assume for retirement savings?',
    answer:
      'A common approach is to assume a higher return (like equity-oriented returns) for the years before retirement while you\u2019re still investing, and a more conservative return for the years after retirement when capital preservation matters more.',
  },
];

export default function RetirementPlanningCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          {
            name: 'Retirement Planning Calculator',
            href: '/calculators/retirement-planning-calculator',
          },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Retirement Planning Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate how large a retirement corpus you need, and the monthly SIP required to build it,
        based on your current expenses and expected inflation.
      </p>

      <div className="mt-8">
        <RetirementPlanningCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the retirement planning calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your current age, planned retirement age, life expectancy, current monthly
            expenses, and expected inflation rate. The calculator projects your expenses forward
            to retirement age, estimates the total corpus needed to sustain those inflation-
            adjusted expenses for the rest of your life, and works out the monthly SIP you&rsquo;d
            need to invest to reach that corpus in time.
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
