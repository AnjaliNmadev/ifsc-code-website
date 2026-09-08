import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import IncomeTaxCalculator from '@/components/calculators/IncomeTaxCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Income Tax Calculator (FY 2024-25) — New vs Old Regime | ${SITE_NAME}`,
  description:
    'Free income tax calculator for FY 2024-25. Compare your tax liability under the new and old tax regimes based on your income and deductions.',
  alternates: { canonical: buildCanonical(['calculators', 'income-tax-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the difference between the new and old tax regimes?',
    answer:
      'The new regime offers lower slab rates but removes most exemptions and deductions. The old regime has higher slab rates but lets you claim deductions such as 80C investments, 80D health insurance, and HRA exemption.',
  },
  {
    question: 'Is there a tax rebate available?',
    answer:
      'Yes. Under Section 87A, taxable income up to ₹7,00,000 in the new regime, or up to ₹5,00,000 in the old regime, attracts zero tax after the rebate.',
  },
  {
    question: 'What is the standard deduction for FY 2024-25?',
    answer:
      'Salaried individuals get a standard deduction of ₹75,000 under the new regime, and ₹50,000 under the old regime, before any other deductions are applied.',
  },
];

export default function IncomeTaxCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Income Tax Calculator', href: '/calculators/income-tax-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Income Tax Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate your income tax for FY 2024-25 and compare your liability under the new and old
        tax regimes.
      </p>

      <div className="mt-8">
        <IncomeTaxCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the income tax calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Select your preferred tax regime and enter your annual gross income. Under the old
            regime, you can also enter your total deductions (such as Section 80C, 80D, and HRA
            exemption). The calculator applies the applicable slab rates, the Section 87A rebate
            where eligible, and 4% health &amp; education cess to estimate your final tax payable.
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
