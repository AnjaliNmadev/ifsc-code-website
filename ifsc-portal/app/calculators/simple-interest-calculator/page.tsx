import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import SimpleInterestCalculator from '@/components/calculators/SimpleInterestCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Simple Interest Calculator | ${SITE_NAME}`,
  description:
    'Free online simple interest calculator. Enter your principal, interest rate, and time period to instantly calculate the interest earned and total amount.',
  alternates: { canonical: buildCanonical(['calculators', 'simple-interest-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is simple interest?',
    answer:
      'Simple interest is interest calculated only on the original principal amount, not on any interest already earned. It grows linearly over time, unlike compound interest.',
  },
  {
    question: 'What is the simple interest formula?',
    answer:
      'Simple Interest = (Principal × Rate × Time) / 100, where Rate is the annual interest rate and Time is in years.',
  },
  {
    question: 'When is simple interest used?',
    answer:
      'Simple interest is commonly used for short-term loans, certain fixed-term instruments, and as an easy way to estimate interest before comparing it against compound-interest products like FDs.',
  },
];

export default function SimpleInterestCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Simple Interest Calculator', href: '/calculators/simple-interest-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Simple Interest Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Quickly calculate the simple interest earned or payable on any principal amount, interest
        rate, and time period.
      </p>

      <div className="mt-8">
        <SimpleInterestCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the simple interest calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter the principal amount, the annual interest rate, and the time period in years.
            The calculator applies the standard simple interest formula to instantly show the
            interest earned and the total amount at the end of the period.
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
