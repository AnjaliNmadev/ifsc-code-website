import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import MetalWeightCalculator from '@/components/calculators/MetalWeightCalculator';
import MetalRateBarChart from '@/components/MetalRateBarChart';
import PopularCalculatorsSidebar from '@/components/PopularCalculatorsSidebar';
import { faqSchema } from '@/lib/schema';
import { RATE_CITIES, type CityMeta } from '@/lib/metal-rates';
import { GOLD_MARKET_AREAS } from '@/lib/city-market-notes';

interface Faq {
  question: string;
  answer: string;
}

interface RateRow {
  label: string;
  value: string;
}

interface CityCompareRow {
  city: CityMeta;
  primaryValue: string;
  secondaryValue: string;
}

interface MetalRatePageProps {
  metal: 'Gold' | 'Silver';
  city: CityMeta;
  path: string;
  headline: string;
  rows: RateRow[];
  intro: string;
  faqs: Faq[];
  asOf: string;
  isLive: boolean;
  compareRows: CityCompareRow[];
  compareHeaders: [string, string];
  weightCalculatorRates: Record<string, number>;
  purityChartData: { label: string; value: number }[];
}

export default function MetalRatePage({
  metal,
  city,
  path,
  headline,
  rows,
  intro,
  faqs,
  asOf,
  isLive,
  compareRows,
  compareHeaders,
  weightCalculatorRates,
  purityChartData,
}: MetalRatePageProps) {
  const marketAreas = GOLD_MARKET_AREAS[city.slug];
  const topCompareCities = compareRows.filter((r) => r.city.slug !== city.slug).slice(0, 8);
  const cityChartData = [
    {
      label: city.name,
      value: parseFloat(
        (compareRows.find((r) => r.city.slug === city.slug)?.primaryValue || '0').replace(/[^0-9.]/g, '')
      ),
    },
    ...topCompareCities.slice(0, 5).map((r) => ({
      label: r.city.name,
      value: parseFloat(r.primaryValue.replace(/[^0-9.]/g, '')),
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(faqs)} />
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Breadcrumbs items={[{ name: `${metal} Rate in ${city.name}`, href: `/${path}` }]} />

          <div className="flex gap-6 border-b border-ink-200 text-sm font-semibold">
            {metal === 'Gold' ? (
              <span className="-mb-px border-b-2 border-trust-600 pb-2 text-trust-700">Gold Rates</span>
            ) : (
              <Link
                href={`/gold-rate-${city.slug}`}
                className="-mb-px border-b-2 border-transparent pb-2 text-ink-400 hover:text-ink-600"
              >
                Gold Rates
              </Link>
            )}
            {metal === 'Silver' ? (
              <span className="-mb-px border-b-2 border-trust-600 pb-2 text-trust-700">Silver Rates</span>
            ) : (
              <Link
                href={`/silver-rate-${city.slug}`}
                className="-mb-px border-b-2 border-transparent pb-2 text-ink-400 hover:text-ink-600"
              >
                Silver Rates
              </Link>
            )}
          </div>

          <h1 className="mt-6 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            {metal} Rate Today in {city.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-600">{intro}</p>

          <div className="mt-6 rounded-2xl border border-trust-200 bg-trust-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-trust-700">
                {city.name} &mdash; today&rsquo;s rate
              </p>
              <p className="flex items-center gap-1.5 text-xs text-ink-500">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-amber-500'}`}
                />
                {isLive ? 'Live' : 'Cached'} &middot; Updated {asOf}
              </p>
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
              Rate is sourced from a live international bullion feed and converted to INR; it excludes
              GST and making charges and can vary slightly by jeweller. Confirm the exact rate before
              buying or selling.
            </p>
          </div>

          <section className="mt-8">
            <h2 className="font-display text-xl font-extrabold text-ink-900">
              {metal} rate by purity in {city.name}
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Today&rsquo;s rate per gram across the purities shown above.
            </p>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-4">
              <MetalRateBarChart data={purityChartData} />
            </div>
          </section>

          <div className="mt-8">
            <MetalWeightCalculator metal={metal} ratesPerGram={weightCalculatorRates} />
          </div>

          <div className="mt-8">
            <AdSlot variant="top-banner" />
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              {metal} Rate Across Major Cities Today
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-600">
              Compare today&rsquo;s {metal.toLowerCase()} rate in {city.name} with other major Indian
              cities. Tap a city to see its full rate page.
            </p>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-4">
              <MetalRateBarChart data={cityChartData} color="#1d4ed8" />
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">{compareHeaders[0]}</th>
                    <th className="px-4 py-3">{compareHeaders[1]}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {compareRows.map((row) => (
                    <tr key={row.city.slug} className={row.city.slug === city.slug ? 'bg-trust-50' : ''}>
                      <td className="px-4 py-3 font-medium text-ink-900">
                        <Link
                          href={`/${metal === 'Gold' ? 'gold' : 'silver'}-rate-${row.city.slug}`}
                          className="hover:text-trust-700 hover:underline"
                        >
                          {row.city.name}
                        </Link>
                        <span className="ml-1.5 text-xs font-normal text-ink-400">{row.city.state}</span>
                      </td>
                      <td className="px-4 py-3 text-ink-600">{row.primaryValue}</td>
                      <td className="px-4 py-3 text-ink-600">{row.secondaryValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                What decides the {metal.toLowerCase()} rate in {city.name}
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                <p>
                  {metal} traded in {city.name}, like every Indian city, is priced off the same
                  international bullion benchmark, converted to rupees at the prevailing exchange
                  rate. On top of that base price, a handful of local factors nudge the retail rate up
                  or down.
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>International spot prices for {metal.toLowerCase()}, which move with global demand, the US dollar, and interest-rate expectations.</li>
                  <li>The rupee-to-dollar exchange rate, since {metal.toLowerCase()} is imported and priced in dollars internationally.</li>
                  <li>Import duty and GST, which are applied nationally but flow straight through to the local rate.</li>
                  <li>City-specific factors such as local jeweller-association rates, transport cost, and demand during the wedding and festive season in {city.state}.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                How the {metal.toLowerCase()} rate is calculated
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                {metal === 'Gold' ? (
                  <>
                    <p>
                      The headline rate you see is the base metal price, before making charges and
                      final GST. Jewellers start from the 24K (999 purity) rate and scale it down for
                      lower purities: 22K gold is about 91.6% of the 24K rate, and 18K gold is about
                      75% of it. GST of 3% is then added on the gold value.
                    </p>
                    <p>
                      Making charges &mdash; the cost of labour and design &mdash; are added separately
                      and vary widely by jeweller and design complexity, from simple machine-made
                      chains to elaborate bridal sets, so always ask for a full price breakup rather
                      than accepting a single &ldquo;total price&rdquo;.
                    </p>
                  </>
                ) : (
                  <p>
                    Silver is conventionally quoted per kilogram in the Indian bullion market. The
                    base rate reflects 999 (fine) silver; jewellery and utensils in 925 sterling
                    silver are priced off the same base rate adjusted for purity, plus making charges
                    and 3% GST on the final invoice value.
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                How to check {metal.toLowerCase()} purity before buying
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                {metal === 'Gold' ? (
                  <>
                    <p>
                      BIS hallmarking has been mandatory for gold jewellery sold in India since 2021.
                      A genuine hallmarked piece carries the BIS triangular logo, the purity grade
                      (916 for 22K, 750 for 18K, 999 for 24K), the jeweller&rsquo;s identification mark,
                      and a six-digit alphanumeric HUID code.
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      <li>Ask to see the hallmark and HUID on the piece before purchase.</li>
                      <li>Verify the HUID instantly using the BIS Care mobile app.</li>
                      <li>Prefer BIS-certified jewellers and insist on an itemised invoice showing metal weight, purity, rate, and making charges separately.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      BIS hallmarking also covers silver, though it is less universally enforced than
                      for gold. A hallmarked silver item carries the BIS mark along with a purity
                      grade &mdash; 999 for fine silver bars and coins, or 925 for sterling silver
                      jewellery and utensils.
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      <li>Ask for the BIS hallmark on coins, bars, and jewellery wherever available.</li>
                      <li>For unmarked items, a reputed jeweller can verify purity using an XRF (karat) analyser before you buy.</li>
                      <li>Insist on an itemised bill showing weight, purity, rate, and making charges separately.</li>
                    </ul>
                  </>
                )}
              </div>
            </section>

            {marketAreas && (
              <section>
                <h2 className="font-display text-2xl font-extrabold text-ink-900">
                  Where to buy {metal.toLowerCase()} in {city.name}
                </h2>
                <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                  <p>
                    {city.name} has several well-established jewellery and bullion markets, including{' '}
                    {marketAreas.join(', ')}, alongside branded showrooms and organised retail chains
                    across the city. Many jewellers also offer digital {metal.toLowerCase()} and online
                    ordering with store pickup.
                  </p>
                  <p>
                    Whichever route you choose, compare the live rate, ask for a clear GST and making
                    charge breakup, and confirm BIS hallmarking before paying.
                  </p>
                </div>
              </section>
            )}

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                Documents and tax when buying {metal.toLowerCase()} in {city.name}
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                <p>
                  Every purchase should come with a proper tax invoice showing the {metal.toLowerCase()}{' '}
                  value, making charges, and GST as separate line items. Cash payments above ₹2 lakh
                  require the seller to record your PAN, as per income tax rules that apply nationwide,
                  including in {city.name}.
                </p>
                <p>
                  A 3% GST applies to the {metal.toLowerCase()} value on every purchase; making charges
                  attract an additional 5% GST. Keep the invoice safely &mdash; it is needed for resale,
                  exchange, insurance claims, and to establish your cost of acquisition if you sell the{' '}
                  {metal.toLowerCase()} later and need to compute capital gains.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                Festival and wedding-season demand in {city.state}
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                <p>
                  Like most of India, {metal.toLowerCase()} buying in {city.name} picks up sharply
                  around Akshaya Tritiya, Dhanteras, and Diwali, and again through the wedding season
                  that follows. Local jewellers typically stock up ahead of these periods, and retail
                  premiums can move slightly higher during peak weeks purely due to demand, even when
                  the underlying bullion rate hasn&rsquo;t changed much.
                </p>
                <p>
                  Buying a few weeks before a major festival, rather than in the final days, is one of
                  the simplest ways to avoid paying an avoidable demand-driven premium.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-extrabold text-ink-900">
                {metal} as an investment
              </h2>
              <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
                <p>
                  Beyond jewellery, many investors buy {metal.toLowerCase()} purely for its store-of-value
                  role in a portfolio, without the making charges that come with crafted pieces.
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    <strong>Physical {metal.toLowerCase()}:</strong> coins and bars from banks or
                    reputed jewellers &mdash; easy to buy and sell locally, but involves storage and
                    making/breaking charges.
                  </li>
                  <li>
                    <strong>Digital {metal.toLowerCase()}:</strong> buy in small amounts via apps,
                    backed by physical metal held by the provider, with the option of physical
                    delivery later.
                  </li>
                  {metal === 'Gold' && (
                    <li>
                      <strong>Gold ETFs / Sovereign Gold Bonds:</strong> traded on the stock exchange
                      or held in demat form, avoiding storage hassles entirely.
                    </li>
                  )}
                </ul>
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
            Rates on this page are sourced from a third-party live market data feed for general
            information only and do not constitute investment advice. Please verify current rates
            with a certified jeweller or bullion dealer before transacting.
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <PopularCalculatorsSidebar />
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="font-display text-base font-bold text-ink-900">
              {metal === 'Gold' ? 'Silver' : 'Gold'} rate in {city.name}
            </p>
            <Link
              href={`/${metal === 'Gold' ? 'silver' : 'gold'}-rate-${city.slug}`}
              className="mt-2 inline-block text-sm font-semibold text-trust-700 hover:underline"
            >
              Check {metal === 'Gold' ? 'silver' : 'gold'} rate in {city.name} →
            </Link>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="font-display text-base font-bold text-ink-900">Other cities</p>
            <ul className="mt-3 space-y-2">
              {RATE_CITIES.filter((c) => c.slug !== city.slug)
                .slice(0, 10)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${metal === 'Gold' ? 'gold' : 'silver'}-rate-${c.slug}`}
                      className="text-sm font-medium text-ink-600 hover:text-trust-700"
                    >
                      {metal} rate in {c.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
