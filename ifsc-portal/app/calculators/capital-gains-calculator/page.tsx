import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import CapitalGainsCalculator from '@/components/calculators/CapitalGainsCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Capital Gains Tax Calculator — LTCG & STCG | ${SITE_NAME}`,
  description:
    'Free capital gains calculator. Estimate short-term and long-term capital gains tax on equity, property, gold, and other investments.',
  alternates: { canonical: buildCanonical(['calculators', 'capital-gains-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the difference between STCG and LTCG?',
    answer:
      'Short-term capital gains (STCG) apply when an asset is sold before the long-term holding threshold — 12 months for listed equity, 24 months for other assets like property and gold. Long-term capital gains (LTCG) apply beyond that threshold and are usually taxed at a lower rate.',
  },
  {
    question: 'Is there any exemption on long-term capital gains from equity?',
    answer:
      'Yes. Long-term capital gains from listed equity and equity mutual funds up to ₹1,25,000 in a financial year are exempt from tax; only the amount above this threshold is taxed at 12.5%.',
  },
  {
    question: 'How is capital gains tax on property calculated?',
    answer:
      'Property held for 24 months or more is taxed as long-term capital gain at a flat 12.5% (without indexation, as per the rules effective from 23 July 2024). Property sold before 24 months is taxed as short-term capital gain at your income tax slab rate.',
  },
];

export default function CapitalGainsCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Capital Gains Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate the short-term or long-term capital gains tax on your equity, property, gold, or
        other investments.
      </p>

      <div className="mt-8">
        <CapitalGainsCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the capital gains calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Choose your asset type, enter the purchase and sale price, and specify how long you
            held the asset. The calculator determines whether the gain is short-term or long-term
            based on the applicable holding period threshold, then applies the correct tax rate —
            including the LTCG exemption for equity — to estimate your tax and net gain after tax.
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
