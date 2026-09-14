import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import HraCalculator from '@/components/calculators/HraCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `HRA Calculator — Calculate Tax-Exempt HRA | ${SITE_NAME}`,
  description:
    'Free HRA calculator. Enter your basic salary, HRA received, and rent paid to find out how much of your House Rent Allowance is tax-exempt.',
  alternates: { canonical: buildCanonical(['calculators', 'hra-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'How is HRA exemption calculated?',
    answer:
      'The exempt HRA is the lowest of three amounts: the actual HRA received, rent paid minus 10% of basic salary, or 50% of basic salary for metro cities (40% for non-metro cities).',
  },
  {
    question: 'Can I claim HRA exemption under the new tax regime?',
    answer:
      'No. HRA exemption is only available under the old tax regime. The new regime does not allow this deduction.',
  },
  {
    question: 'Which cities count as metro for HRA purposes?',
    answer:
      'Delhi, Mumbai, Kolkata, and Chennai are treated as metro cities for HRA exemption, qualifying for the higher 50% limit. All other cities use the 40% limit.',
  },
];

export default function HraCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'HRA Calculator', href: '/calculators/hra-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        HRA Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Find out how much of your House Rent Allowance is exempt from tax under the old tax
        regime.
      </p>

      <div className="mt-8">
        <HraCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the HRA calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your monthly basic salary, the HRA you receive, the rent you actually pay, and
            whether you live in a metro city. The calculator applies the standard three-way HRA
            exemption rule to show you the exempt and taxable portions of your HRA, both monthly
            and annually.
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
