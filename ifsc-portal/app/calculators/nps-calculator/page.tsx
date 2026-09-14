import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import NpsCalculator from '@/components/calculators/NpsCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `NPS Calculator — Estimate Your Pension Corpus | ${SITE_NAME}`,
  description:
    'Free NPS calculator. Estimate your National Pension System corpus at retirement, the lump sum you can withdraw, and your expected monthly pension.',
  alternates: { canonical: buildCanonical(['calculators', 'nps-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'How much of my NPS corpus can I withdraw as a lump sum?',
    answer:
      'At retirement (age 60), you can withdraw up to 60% of your NPS corpus as a tax-free lump sum. The remaining at least 40% must be used to purchase an annuity that provides you a regular pension.',
  },
  {
    question: 'How is the NPS monthly pension decided?',
    answer:
      'Your monthly pension depends on the size of the annuity corpus and the annuity rate offered by the insurance company you choose at the time of retirement, which can vary.',
  },
  {
    question: 'Can I withdraw my entire NPS corpus if it is small?',
    answer:
      'Yes. If your total NPS corpus at retirement is ₹5,00,000 or less, you are allowed to withdraw the entire amount as a lump sum without being required to purchase an annuity.',
  },
];

export default function NpsCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'NPS Calculator', href: '/calculators/nps-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        NPS Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate your National Pension System (NPS) corpus at retirement, along with your lump sum
        withdrawal and expected monthly pension.
      </p>

      <div className="mt-8">
        <NpsCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the NPS calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your monthly contribution, current age, and expected rate of return until you
            turn 60. The calculator projects your total NPS corpus, splits it into your lump sum
            withdrawal and annuity purchase based on the percentage you choose, and estimates your
            monthly pension from the annuity.
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
