import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PpfCalculator from '@/components/calculators/PpfCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `PPF Calculator — Estimate PPF Maturity Value | ${SITE_NAME}`,
  description:
    'Free PPF calculator. Enter your yearly contribution and interest rate to estimate the maturity value of your Public Provident Fund account.',
  alternates: { canonical: buildCanonical(['calculators', 'ppf-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the maximum I can invest in PPF every year?',
    answer:
      'You can invest a minimum of ₹500 and a maximum of ₹1,50,000 in a PPF account in any financial year.',
  },
  {
    question: 'What is the lock-in period for PPF?',
    answer:
      'PPF has a mandatory lock-in period of 15 years, which can be extended in blocks of 5 years after maturity, with or without further contributions.',
  },
  {
    question: 'Is PPF interest taxable?',
    answer:
      'No. PPF enjoys Exempt-Exempt-Exempt (EEE) tax status — your contribution, the interest earned, and the maturity amount are all fully tax-free.',
  },
];

export default function PpfCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        PPF Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate the maturity value of your Public Provident Fund (PPF) account based on your
        yearly contribution and the prevailing interest rate.
      </p>

      <div className="mt-8">
        <PpfCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the PPF calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter how much you plan to invest each year, the current PPF interest rate, and your
            investment tenure. The calculator compounds your contributions annually — the way PPF
            interest is actually credited — to project your maturity value, total investment, and
            interest earned.
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
