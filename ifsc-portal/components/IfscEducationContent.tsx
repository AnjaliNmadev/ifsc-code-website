import JsonLd from './JsonLd';
import { faqSchema, type FaqItem } from '@/lib/schema';

const FAQS: FaqItem[] = [
  {
    question: 'What is an IFSC code?',
    answer:
      'IFSC stands for Indian Financial System Code. It is a unique 11-character alphanumeric code assigned by the Reserve Bank of India to every bank branch in India. It is required for electronic fund transfers such as NEFT, RTGS, and IMPS.',
  },
  {
    question: 'Is the IFSC code the same as the branch code?',
    answer:
      'No. The IFSC code is an 11-character code where the last 6 characters represent the branch code, but the two are not identical. The IFSC also encodes the bank identifier and a fixed zero as the fifth character.',
  },
  {
    question: 'What is a MICR code?',
    answer:
      'MICR (Magnetic Ink Character Recognition) is a 9-digit code used to speed up cheque clearing. The first 3 digits represent the city, the next 3 the bank, and the last 3 the branch.',
  },
  {
    question: 'Where can I find my IFSC code?',
    answer:
      'Your IFSC code is printed on your bank passbook and on every cheque leaf issued by your bank. You can also look it up here by searching your bank, state, and district, or by entering your branch name.',
  },
  {
    question: 'Do I need the IFSC code for IMPS transfers too?',
    answer:
      'Yes. NEFT, RTGS, and IMPS all require the beneficiary\u2019s correct IFSC code along with their account number to route the transfer to the right bank branch.',
  },
];

const CHARGES = [
  { amount: 'Up to ₹10,000', neft: '₹2.50', rtgs: 'Not applicable (min. ₹2 lakh)', imps: '₹5.00' },
  { amount: '₹10,000 – ₹2 lakh', neft: '₹15.00', rtgs: '₹26', imps: '₹10.00' },
  { amount: 'Above ₹2 lakh', neft: '₹25.00', rtgs: '₹51', imps: '₹15.00' },
];

export default function IfscEducationContent() {
  return (
    <section className="mt-16 space-y-10">
      <JsonLd data={faqSchema(FAQS)} />

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">What is an IFSC code?</h2>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-600">
          IFSC (Indian Financial System Code) is a unique 11-character alphanumeric code that the
          Reserve Bank of India assigns to every bank branch in the country. The first four
          characters identify the bank, the fifth character is always zero, and the last six
          characters identify the specific branch. Any electronic fund transfer — NEFT, RTGS, or
          IMPS — needs the correct IFSC code of the receiving branch to go through.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">How to find an IFSC code</h2>
        <ul className="mt-3 max-w-3xl space-y-2 text-base leading-relaxed text-ink-600">
          <li>• Check your bank passbook or any cheque leaf issued by your bank — the IFSC is printed on it.</li>
          <li>• Use the search box at the top of this page if you already know the code, to confirm the branch it belongs to.</li>
          <li>• Use the bank → state → district → branch browser above if you only know the branch name and location.</li>
        </ul>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">Benefits of an IFSC code</h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink-600">
            <li>• Uniquely identifies a bank and its exact branch anywhere in India.</li>
            <li>• Removes ambiguity and errors from electronic fund transfers.</li>
            <li>• Makes NEFT, RTGS, and IMPS transfers fast and accurate.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">Benefits of a MICR code</h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600">
            MICR (Magnetic Ink Character Recognition) enables banks to process cheques faster and
            with fewer errors, using magnetic-ink printed characters that clearing machines can
            read automatically. It is a 9-digit code: the first 3 digits represent the city, the
            next 3 the bank, and the last 3 the branch.
          </p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Typical transfer charges by amount
        </h2>
        <p className="mt-2 max-w-3xl text-base text-ink-500">
          These are indicative ranges — each bank sets its own charges within RBI limits, and
          NEFT/IMPS are free at most banks today. Always confirm with your bank.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full min-w-[480px] text-left text-base">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">NEFT</th>
                <th className="px-4 py-3">RTGS</th>
                <th className="px-4 py-3">IMPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {CHARGES.map((row) => (
                <tr key={row.amount}>
                  <td className="px-4 py-3 font-medium text-ink-800">{row.amount}</td>
                  <td className="px-4 py-3 text-ink-600">{row.neft}</td>
                  <td className="px-4 py-3 text-ink-600">{row.rtgs}</td>
                  <td className="px-4 py-3 text-ink-600">{row.imps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-400">
          NEFT: 8 AM–7 PM (weekdays) · RTGS: 9 AM–4:30 PM (weekdays) · IMPS: 24×7, all days.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Difference between IFSC and MICR code
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full min-w-[480px] text-left text-base">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">IFSC Code</th>
                <th className="px-4 py-3">MICR Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-600">
              <tr>
                <td className="px-4 py-3">Used for electronic fund transfers (NEFT/RTGS/IMPS)</td>
                <td className="px-4 py-3">Used to speed up cheque clearing</td>
              </tr>
              <tr>
                <td className="px-4 py-3">11-character alphanumeric code</td>
                <td className="px-4 py-3">9-digit numeric code</td>
              </tr>
              <tr>
                <td className="px-4 py-3">First 4 characters identify the bank</td>
                <td className="px-4 py-3">First 3 digits identify the city</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Last 6 characters identify the branch</td>
                <td className="px-4 py-3">Last 3 digits identify the branch</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  );
}
