import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { faqSchema } from '@/lib/schema';
import { RATES_LAST_UPDATED, type CityMeta } from '@/lib/metal-rates';

interface Faq {
  question: string;
  answer: string;
}

interface RateRow {
  label: string;
  value: string;
}

interface MetalRatePageProps {
  metal: 'Gold' | 'Silver';
  city: CityMeta;
  path: string; // e.g. gold-rate-mumbai
  headline: string; // e.g. "₹14,240 per gram (22K)"
  rows: RateRow[];
  intro: string;
  faqs: Faq[];
}

export default function MetalRatePage({ metal, city, path, headline, rows, intro, faqs }: MetalRatePageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(faqs)} />
      <Breadcrumbs items={[{ name: `${metal} Rate in ${city.name}`, href: `/${path}` }]} />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        {metal} Rate Today in {city.name}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-600">{intro}</p>

      <div className="mt-6 rounded-2xl border border-trust-200 bg-trust-50 p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-trust-700">
            {city.name} &mdash; today&rsquo;s rate
          </p>
          <p className="text-xs text-ink-500">Updated {RATES_LAST_UPDATED}</p>
        </div>
        <p className="mt-2 font-display text-2xl font-extrabold text-ink-900">{headline}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-trust-100">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="py-2 pr-4 font-semibold text-ink-800">{row.label}</td>
                  <td className="py-2 text-ink-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-500">
          Rates are indicative, exclude GST and making charges, and can vary by jeweller. Confirm
          the exact rate with your jeweller before buying or selling.
        </p>
      </div>

      <div className="mt-8">
        <AdSlot variant="top-banner" />
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            What decides the {metal.toLowerCase()} rate in {city.name}
          </h2>
          <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
            <p>
              {metal} traded in {city.name}, like every Indian city, is priced off the same
              international bullion benchmark, converted to rupees at the prevailing exchange
              rate. On top of that base price, local factors nudge the retail rate up or down.
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>International spot prices for {metal.toLowerCase()}, which move with global demand, the US dollar, and interest-rate expectations.</li>
              <li>The rupee-to-dollar exchange rate, since {metal.toLowerCase()} is imported and priced in dollars internationally.</li>
              <li>Import duty and local levies, which are applied uniformly but can shift the landed cost.</li>
              <li>City-specific factors such as local jeweller association rates, transport cost, and demand during the wedding and festive season.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold text-ink-900">
            {metal} rate vs price you pay at the jeweller
          </h2>
          <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
            <p>
              The rate shown above is the base bullion rate per gram. What you actually pay at a
              jewellery store includes this base rate plus making charges (typically a percentage
              of the metal value, or a flat per-gram fee for the craftsmanship) and 3% GST applied
              on the final invoice value, so always ask for a full price breakup before buying.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-4">
          {faqs.map((faq) => (
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
      </section>

      <p className="mt-10 text-xs leading-relaxed text-ink-400">
        Rates on this page are for general information only and are not live market data. They do
        not constitute investment advice — please verify current rates with a certified jeweller
        or bullion dealer before transacting.
      </p>
    </div>
  );
}
