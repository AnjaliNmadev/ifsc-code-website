import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import RdCalculator from '@/components/calculators/RdCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `RD Calculator — Recurring Deposit Maturity Calculator | ${SITE_NAME}`,
  description:
    'Free online RD calculator. Enter your monthly deposit, interest rate, and tenure to instantly estimate your recurring deposit maturity value.',
  alternates: { canonical: buildCanonical(['calculators', 'rd-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is a Recurring Deposit (RD)?',
    answer:
      'An RD is a savings scheme where you deposit a fixed amount every month for a chosen tenure and earn interest on it, similar to a fixed deposit but with monthly contributions instead of a lump sum.',
  },
  {
    question: 'How is RD maturity value calculated?',
    answer:
      'Banks typically compound RD interest quarterly, even though deposits are monthly. This calculator uses the standard approximate formula most banks and financial tools use for RDs.',
  },
  {
    question: 'Can I withdraw an RD before maturity?',
    answer:
      'Most banks allow premature withdrawal of an RD, usually with a lower interest rate or a small penalty. Check your specific bank\u2019s terms before opening the account.',
  },
];

export default function RdCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'RD Calculator', href: '/calculators/rd-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Recurring Deposit (RD) Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate the maturity value of your recurring deposit based on your monthly contribution,
        interest rate, and tenure.
      </p>

      <div className="mt-8">
        <RdCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the RD calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter how much you plan to deposit every month, the interest rate your bank offers,
            and your tenure in months. The calculator estimates your total deposits, the interest
            you&rsquo;ll earn, and your final maturity amount.
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
