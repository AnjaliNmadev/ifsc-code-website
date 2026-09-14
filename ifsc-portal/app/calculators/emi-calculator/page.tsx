import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import EmiCalculator from '@/components/calculators/EmiCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `EMI Calculator — Calculate Loan EMI Online | ${SITE_NAME}`,
  description:
    'Free online EMI calculator. Enter your loan amount, interest rate, and tenure to instantly calculate your monthly EMI, total interest, and total repayment.',
  alternates: { canonical: buildCanonical(['calculators', 'emi-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is EMI?',
    answer:
      'EMI (Equated Monthly Installment) is the fixed amount you pay each month towards a loan, covering both principal and interest, until the loan is fully repaid.',
  },
  {
    question: 'How is EMI calculated?',
    answer:
      'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly installments.',
  },
  {
    question: 'Does a lower interest rate always mean a lower EMI?',
    answer:
      'Generally yes, for the same loan amount and tenure. But a longer tenure can also lower your EMI even at the same rate — though it increases the total interest you pay over the life of the loan.',
  },
];

export default function EmiCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        EMI Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Calculate your monthly loan installment, total interest payable, and total repayment
        amount for any home, car, or personal loan.
      </p>

      <div className="mt-8">
        <EmiCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the EMI calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter the loan amount you want to borrow, the annual interest rate offered by your
            bank, and the repayment tenure in years. The calculator instantly works out your
            fixed monthly installment using the standard reducing-balance EMI formula that banks
            use, along with the total interest you&rsquo;ll pay over the life of the loan.
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
