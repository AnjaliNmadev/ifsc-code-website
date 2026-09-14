import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import SavingsCalculator from '@/components/calculators/SavingsCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Savings Calculator — Project Your Future Savings | ${SITE_NAME}`,
  description:
    'Free savings calculator. Combine an initial lump sum with regular monthly savings to project how much your money could grow to over time.',
  alternates: { canonical: buildCanonical(['calculators', 'savings-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What does this savings calculator show?',
    answer:
      'It projects the future value of your savings by combining a one-time initial amount with regular monthly deposits, compounded monthly at your expected rate of return.',
  },
  {
    question: 'Can I use this for any savings goal?',
    answer:
      'Yes — it works for general savings planning such as an emergency fund, a down payment, or any other goal where you save a lump sum plus a fixed amount every month.',
  },
  {
    question: 'What rate of return should I assume?',
    answer:
      'Use a conservative rate for a savings account or FD (around 5-7%), or a higher rate only if you plan to invest the money in market-linked instruments, which carry more risk.',
  },
];

export default function SavingsCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Savings Calculator', href: '/calculators/savings-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Savings Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        See how a starting amount plus consistent monthly savings can grow over time, at a rate of
        return you choose.
      </p>

      <div className="mt-8">
        <SavingsCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the savings calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter any amount you&rsquo;re starting with, how much you plan to save every month,
            your expected annual rate of return, and the number of years you&rsquo;ll keep saving.
            The calculator compounds both the lump sum and the monthly deposits to estimate the
            total value at the end of the period.
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
