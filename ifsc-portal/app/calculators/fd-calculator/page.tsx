import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import FdCalculator from '@/components/calculators/FdCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `FD Calculator — Fixed Deposit Maturity Calculator | ${SITE_NAME}`,
  description:
    'Free online FD calculator. Enter your deposit amount, interest rate, and tenure to instantly calculate your fixed deposit maturity value and interest earned.',
  alternates: { canonical: buildCanonical(['calculators', 'fd-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'How is FD interest calculated?',
    answer:
      'Most Indian banks compound FD interest quarterly by default: Maturity Amount = P × (1 + r/n)^(n×t), where P is your deposit, r is the annual rate, n is the number of compounding periods per year, and t is the tenure in years.',
  },
  {
    question: 'Does compounding frequency really make a difference?',
    answer:
      'Yes — more frequent compounding (e.g. monthly vs yearly) results in a slightly higher maturity amount for the same rate and tenure, because interest starts earning interest sooner.',
  },
  {
    question: 'Is FD interest taxable?',
    answer:
      'Yes, interest earned on fixed deposits is taxable as per your income tax slab, and banks deduct TDS if the interest exceeds the threshold set by the Income Tax Department in a financial year.',
  },
];

export default function FdCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'FD Calculator', href: '/calculators/fd-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Fixed Deposit (FD) Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate how much your fixed deposit will be worth at maturity, based on your deposit
        amount, interest rate, tenure, and compounding frequency.
      </p>

      <div className="mt-8">
        <FdCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the FD calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your deposit amount, the interest rate your bank offers, the tenure, and how
            often interest is compounded (most Indian banks use quarterly compounding by
            default). The calculator instantly shows your maturity amount and the total interest
            you&rsquo;ll earn.
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
