import JsonLd from './JsonLd';
import { faqSchema, type FaqItem } from '@/lib/schema';

const FAQS: FaqItem[] = [
  {
    question: 'What is a SWIFT code?',
    answer:
      'A SWIFT code (also called a BIC, or Bank Identifier Code) is an 8 or 11-character code that uniquely identifies a bank and branch anywhere in the world. It is used to route international wire transfers between banks, unlike IFSC, which is only used for domestic transfers within India.',
  },
  {
    question: 'What do the characters in a SWIFT code mean?',
    answer:
      'The first 4 characters are the bank code, the next 2 are the ISO country code, the following 2 are the location code, and an optional final 3 characters identify a specific branch. When those last 3 characters are left out (or shown as "XXX"), the code refers to the bank\u2019s head office.',
  },
  {
    question: 'Is SWIFT code the same as IFSC code?',
    answer:
      'No. IFSC is an 11-character code used only for domestic transfers within India (NEFT, RTGS, IMPS). SWIFT/BIC is an international standard used to route cross-border wire transfers and identifies a bank globally, not just within one country.',
  },
  {
    question: 'Do all bank branches have their own SWIFT code?',
    answer:
      'No. Most banks route international wire transfers through one designated SWIFT code, usually the head office or an international-transactions branch, rather than issuing a SWIFT code to every local branch the way IFSC codes are issued.',
  },
  {
    question: 'How do I find my SWIFT code?',
    answer:
      'Enter your IFSC code in the checker above to look up your branch\u2019s SWIFT code where one is on file, check your bank passbook or a recent international transfer receipt, or ask your bank directly.',
  },
  {
    question: 'What does an 8-character vs. 11-character SWIFT code mean?',
    answer:
      'Both refer to the same bank. An 8-character code identifies the bank and its head office; the 11-character version adds a 3-character branch code for a specific branch. If a bank has no specific branch code, "XXX" is used, which is functionally identical to the 8-character form.',
  },
];

export default function SwiftEducationContent() {
  return (
    <section className="mt-16 space-y-10">
      <JsonLd data={faqSchema(FAQS)} />

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">What is a SWIFT code?</h2>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-600">
          SWIFT (Society for Worldwide Interbank Financial Telecommunication) codes, also called
          BIC (Bank Identifier Codes), are the global standard for identifying banks in
          international wire transfers. A SWIFT code is 8 or 11 characters: a 4-letter bank code,
          a 2-letter country code, a 2-character location code, and an optional 3-character branch
          code. Where IFSC identifies an exact branch for domestic Indian transfers, SWIFT
          identifies a bank (and sometimes a specific branch) for cross-border payments anywhere
          in the world.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          How to check your SWIFT code
        </h2>
        <ul className="mt-3 max-w-3xl space-y-2 text-base leading-relaxed text-ink-600">
          <li>
            • Already have a SWIFT/BIC code? Enter it above to instantly validate its format and
            see its bank, country, location, and branch breakdown.
          </li>
          <li>
            • Only have your IFSC code? Enter that instead — the tool looks up your branch and
            shows its SWIFT code where one is on file.
          </li>
          <li>• You can also check your bank passbook, a past international transfer receipt, or your bank&rsquo;s website.</li>
        </ul>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            SWIFT code structure
          </h2>
          <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink-600">
            <li>• Characters 1–4: Bank code (letters only)</li>
            <li>• Characters 5–6: Country code (ISO 3166-1)</li>
            <li>• Characters 7–8: Location code (letters or digits)</li>
            <li>• Characters 9–11: Branch code (optional; &ldquo;XXX&rdquo; = head office)</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            When you need a SWIFT code
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-600">
            You&rsquo;ll be asked for a SWIFT code whenever you receive money from abroad, send an
            international wire transfer, or set up a foreign currency account. Domestic transfers
            within India — NEFT, RTGS, and IMPS — use the IFSC code instead, not SWIFT.
          </p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Difference between SWIFT and IFSC code
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full min-w-[480px] text-left text-base">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">SWIFT / BIC Code</th>
                <th className="px-4 py-3">IFSC Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-600">
              <tr>
                <td className="px-4 py-3">Used for international wire transfers</td>
                <td className="px-4 py-3">Used for domestic transfers (NEFT/RTGS/IMPS)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">8 or 11-character alphanumeric code</td>
                <td className="px-4 py-3">Always 11 characters</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Identifies a bank globally, by country</td>
                <td className="px-4 py-3">Identifies an exact branch within India</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Usually shared by one head office / few branches</td>
                <td className="px-4 py-3">Unique to every individual branch</td>
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
