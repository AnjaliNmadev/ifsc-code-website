import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdvanceTaxCalculator from '@/components/calculators/AdvanceTaxCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Advance Tax Calculator — Quarterly Due Dates & Installments | ${SITE_NAME}`,
  description:
    'Free advance tax calculator. Enter your estimated annual tax liability to get the exact quarterly installment amounts and due dates.',
  alternates: { canonical: buildCanonical(['calculators', 'advance-tax-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'Who needs to pay advance tax?',
    answer:
      'Any taxpayer whose total tax liability for the financial year, after TDS, is expected to exceed ₹10,000 must pay advance tax in installments during the year rather than as a single payment at filing time.',
  },
  {
    question: 'What happens if I miss an advance tax installment?',
    answer:
      'Missing or underpaying an installment attracts interest under Sections 234B and 234C on the shortfall, calculated for the period of delay.',
  },
  {
    question: 'Are senior citizens required to pay advance tax?',
    answer:
      'Resident senior citizens (60 years or older) who do not have income from business or profession are exempt from paying advance tax.',
  },
];

export default function AdvanceTaxCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Advance Tax Calculator', href: '/calculators/advance-tax-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Advance Tax Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Get the exact quarterly installment amounts and due dates for paying your advance tax on
        time.
      </p>

      <div className="mt-8">
        <AdvanceTaxCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the advance tax calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your estimated total tax liability for the financial year. The calculator splits
            it into the four cumulative installments prescribed by the Income Tax Department — 15%
            by 15 June, 45% by 15 September, 75% by 15 December, and 100% by 15 March — and shows
            both the installment amount and the running cumulative total for each due date.
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
