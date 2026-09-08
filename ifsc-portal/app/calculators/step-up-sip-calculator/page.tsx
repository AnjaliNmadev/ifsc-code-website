import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import StepUpSipCalculator from '@/components/calculators/StepUpSipCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Step-Up SIP Calculator — Growing SIP Returns | ${SITE_NAME}`,
  description:
    'Free step-up SIP calculator. See how increasing your monthly SIP investment every year, in line with your income growth, changes your final maturity value.',
  alternates: { canonical: buildCanonical(['calculators', 'step-up-sip-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is a step-up SIP?',
    answer:
      'A step-up (or top-up) SIP automatically increases your monthly investment amount by a fixed percentage every year, so your contributions grow along with your income.',
  },
  {
    question: 'Why does a step-up SIP grow faster than a regular SIP?',
    answer:
      'Because you invest more money each successive year, both your total contributions and the amount compounding at the expected return are higher than a flat, unchanging monthly SIP.',
  },
  {
    question: 'What step-up percentage should I choose?',
    answer:
      'Many investors align their step-up with their expected annual salary hike, commonly 5-15%, though the right number depends on your own income growth and savings capacity.',
  },
];

export default function StepUpSipCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Step-Up SIP Calculator', href: '/calculators/step-up-sip-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Step-Up SIP Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Calculate how much faster your mutual fund investments could grow when you increase your
        SIP amount by a fixed percentage every year.
      </p>

      <div className="mt-8">
        <StepUpSipCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the step-up SIP calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your starting monthly investment, the annual step-up percentage, your expected
            rate of return, and the total investment period. The calculator simulates your
            investment month by month, increasing the contribution amount at the start of every
            year, to project the final maturity value.
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
