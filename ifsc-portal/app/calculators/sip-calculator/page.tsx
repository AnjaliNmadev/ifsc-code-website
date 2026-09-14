import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import SipCalculator from '@/components/calculators/SipCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `SIP Calculator — Estimate Mutual Fund SIP Returns | ${SITE_NAME}`,
  description:
    'Free online SIP calculator. Enter your monthly investment, expected return, and tenure to instantly estimate the maturity value of your mutual fund SIP.',
  alternates: { canonical: buildCanonical(['calculators', 'sip-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is a SIP?',
    answer:
      'A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals, usually monthly, instead of investing a lump sum all at once.',
  },
  {
    question: 'How is SIP maturity value calculated?',
    answer:
      'SIP maturity value uses the future value of an annuity formula, compounding your monthly investment at the expected rate of return over the investment period.',
  },
  {
    question: 'Are SIP returns guaranteed?',
    answer:
      'No. Mutual fund returns depend on market performance and are never guaranteed. This calculator assumes a constant annual return purely for estimation purposes.',
  },
];

export default function SipCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        SIP Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Estimate how much your monthly mutual fund SIP could grow to, based on your investment
        amount, expected return, and time horizon.
      </p>

      <div className="mt-8">
        <SipCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the SIP calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter the amount you plan to invest every month, the return you expect the fund to
            generate annually, and how many years you intend to stay invested. The calculator
            compounds your contributions monthly to project a maturity value, along with the
            total amount invested and the estimated wealth gained.
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
