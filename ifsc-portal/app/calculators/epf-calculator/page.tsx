import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import EpfCalculator from '@/components/calculators/EpfCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `EPF Calculator — Estimate Your Provident Fund Corpus | ${SITE_NAME}`,
  description:
    'Free EPF calculator. Estimate your Employee Provident Fund corpus at retirement based on your basic salary, current age, and expected EPF interest rate.',
  alternates: { canonical: buildCanonical(['calculators', 'epf-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'How much does an employee contribute to EPF?',
    answer:
      'Employees typically contribute 12% of basic salary plus dearness allowance to EPF every month, matched by an equal 12% contribution from the employer.',
  },
  {
    question: 'Does the entire employer contribution go into EPF?',
    answer:
      'No. Out of the employer\u2019s 12% contribution, 8.33% (subject to a wage ceiling) is diverted to the Employee Pension Scheme (EPS), and only the remaining amount adds to your EPF corpus.',
  },
  {
    question: 'Is EPF withdrawal taxable?',
    answer:
      'EPF withdrawal is tax-free if made after 5 years of continuous service. Withdrawals before 5 years may attract tax and TDS, with some exceptions.',
  },
];

export default function EpfCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'EPF Calculator', href: '/calculators/epf-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        EPF Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Project how much your Employee Provident Fund (EPF) balance could grow to by the time you
        retire.
      </p>

      <div className="mt-8">
        <EpfCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the EPF calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your current basic salary plus DA, your existing EPF balance, your current age,
            your planned retirement age, and the expected EPF interest rate. The calculator
            compounds your monthly employee and employer contributions to estimate your total
            corpus at retirement.
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
