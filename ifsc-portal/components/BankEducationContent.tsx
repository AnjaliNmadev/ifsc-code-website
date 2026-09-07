import JsonLd from './JsonLd';
import { faqSchema } from '@/lib/schema';

export default function BankEducationContent({ bankName }: { bankName: string }) {
  const faqs = [
    {
      question: `What is the eligibility to open an account with ${bankName}?`,
      answer: `Generally, any Indian citizen aged 18 or above with a valid, government-recognized proof of identity and address can open an account with ${bankName}. Minors can have an account opened on their behalf by a parent or legal guardian.`,
    },
    {
      question: `What documents are needed to open a ${bankName} account?`,
      answer: `Commonly required documents include proof of identity (Aadhaar, Passport, Driving Licence, or Voter ID), proof of address, a PAN card, and recent passport-size photographs. Exact requirements can vary by account type, so check with your nearest branch.`,
    },
    {
      question: `What do I need to transfer money to a ${bankName} account?`,
      answer: `You need the receiver's full name, their ${bankName} account number, and the IFSC code of their specific branch, along with the amount you want to send. You can look up the correct branch and IFSC code using the search tools on this page.`,
    },
  ];

  return (
    <section className="mt-12 space-y-8">
      <JsonLd data={faqSchema(faqs)} />

      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          About {bankName} IFSC codes
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
          Every {bankName} branch has its own unique 11-character IFSC code, assigned by the
          Reserve Bank of India. The first four characters of the code identify {bankName}, the
          fifth character is always zero, and the last six characters identify the specific
          branch. You will need the exact branch IFSC code — not just the bank name — to complete
          an NEFT, RTGS, or IMPS transfer.
        </p>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Steps to open a {bankName} account
        </h2>
        <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-600">
          <li>Visit your nearest {bankName} branch or start an application on the bank&rsquo;s official website or app.</li>
          <li>Choose the account type that fits your needs (savings, current, salary, etc.).</li>
          <li>Submit proof of identity and address, a PAN card, and recent photographs.</li>
          <li>Make the initial deposit required for that account type, if applicable.</li>
          <li>Complete in-person or video KYC verification as guided by the bank.</li>
        </ol>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-ink-200 bg-white p-4 open:border-trust-300"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-ink-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
