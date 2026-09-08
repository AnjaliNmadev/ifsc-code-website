import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import GratuityCalculator from '@/components/calculators/GratuityCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Gratuity Calculator — Calculate Your Gratuity Amount | ${SITE_NAME}`,
  description:
    'Free gratuity calculator. Enter your last drawn salary and years of service to estimate the gratuity amount payable to you.',
  alternates: { canonical: buildCanonical(['calculators', 'gratuity-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'Who is eligible for gratuity?',
    answer:
      'Employees who have completed at least 5 years of continuous service with an employer covered under the Payment of Gratuity Act, 1972 are eligible, except in cases of death or disablement, where the 5-year rule does not apply.',
  },
  {
    question: 'How is gratuity calculated?',
    answer:
      'Gratuity is calculated as (last drawn basic salary + DA ÷ 26) × 15 × number of years of service, for employees covered under the Payment of Gratuity Act.',
  },
  {
    question: 'Is gratuity taxable?',
    answer:
      'Gratuity received by government employees is fully tax-exempt. For others, gratuity up to ₹20,00,000 is tax-exempt over their lifetime; any amount above this limit is taxable as salary income.',
  },
];

export default function GratuityCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Gratuity Calculator', href: '/calculators/gratuity-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Gratuity Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Calculate the gratuity amount you&rsquo;re entitled to based on your last drawn salary and
        total years of service.
      </p>

      <div className="mt-8">
        <GratuityCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the gratuity calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your last drawn basic salary plus dearness allowance and your total years of
            service. The calculator applies the standard statutory formula to estimate your
            gratuity payout, and flags if it exceeds the tax-exemption ceiling.
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
