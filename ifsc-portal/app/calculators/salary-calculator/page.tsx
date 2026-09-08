import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';
import AdSlot from '@/components/AdSlot';
import { buildCanonical } from '@/lib/seo';
import { faqSchema, type FaqItem } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Salary Calculator — CTC to In-Hand Take-Home Salary | ${SITE_NAME}`,
  description:
    'Free salary calculator. Convert your annual CTC into estimated monthly and annual take-home salary after PF, professional tax, and income tax.',
  alternates: { canonical: buildCanonical(['calculators', 'salary-calculator']) },
};

const FAQS: FaqItem[] = [
  {
    question: 'What is the difference between CTC and take-home salary?',
    answer:
      'CTC (Cost to Company) is the total amount your employer spends on you annually, including your salary and employer contributions like PF. Take-home salary is what actually lands in your bank account each month, after deductions like employee PF, professional tax, and income tax.',
  },
  {
    question: 'Why is my take-home salary lower than my CTC divided by 12?',
    answer:
      'Because CTC includes the employer\u2019s PF contribution, which never reaches your bank account, along with your own PF contribution, professional tax, and income tax — all of which reduce what you actually receive.',
  },
  {
    question: 'Does this calculator account for bonuses or variable pay?',
    answer:
      'No, this is a simplified estimate based on a fixed CTC, a chosen basic salary percentage, and standard EPF and tax rules. Your actual in-hand salary may differ based on your company\u2019s specific salary structure and any variable pay components.',
  },
];

export default function SalaryCalculatorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(FAQS)} />
      <Breadcrumbs
        items={[
          { name: 'Calculators', href: '/calculators' },
          { name: 'Salary Calculator', href: '/calculators/salary-calculator' },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Salary Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Convert your annual CTC into an estimated monthly and annual take-home salary, after PF,
        professional tax, and income tax deductions.
      </p>

      <div className="mt-8">
        <SalaryCalculator />
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            How the salary calculator works
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-600">
            Enter your annual CTC, what percentage of it is basic salary, your professional tax,
            and your preferred tax regime. The calculator works out the employer and employee EPF
            contributions, applies the relevant standard deduction and income tax slabs, and shows
            your estimated take-home salary — both monthly and annually.
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
