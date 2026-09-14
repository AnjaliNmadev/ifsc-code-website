import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import PopularCalculatorsSidebar from '@/components/PopularCalculatorsSidebar';
import DiamondPriceCalculator from '@/components/calculators/DiamondPriceCalculator';
import MetalRateBarChart from '@/components/MetalRateBarChart';
import { faqSchema } from '@/lib/schema';
import { RATE_CITIES, type CityMeta } from '@/lib/metal-rates';
import {
  cityCaratTable,
  cityShapeTable,
  diamondCityFaqs,
  diamondIndexForCity,
} from '@/lib/diamond-price';

interface DiamondRatePageProps {
  city: CityMeta;
}

export default function DiamondRatePage({ city }: DiamondRatePageProps) {
  const index = diamondIndexForCity(city.slug);
  const caratTable = cityCaratTable(city.slug);
  const shapeTable = cityShapeTable(city.slug);
  const oneCaratBaseline = caratTable.find((c) => c.carat === 1.0)?.price ?? caratTable[0].price;
  const faqs = diamondCityFaqs(city.name);

  const caratChartData = caratTable.map((c) => ({ label: `${c.carat}ct`, value: c.price }));
  const cityCompareData = RATE_CITIES.slice(0, 12).map((c) => ({
    label: c.name,
    value: Math.round(oneCaratBaseline * (diamondIndexForCity(c.slug) / index)),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(faqs)} />
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Breadcrumbs
            items={[
              { name: 'Diamond Price Guide', href: '/diamond-price' },
              { name: city.name, href: `/diamond-price/${city.slug}` },
            ]}
          />

          <div className="flex gap-6 border-b border-ink-200 text-sm font-semibold">
            <Link href={`/gold-rate/${city.slug}`} className="-mb-px border-b-2 border-transparent pb-2 text-ink-400 hover:text-ink-600">
              Gold Rates
            </Link>
            <Link href={`/silver-rate/${city.slug}`} className="-mb-px border-b-2 border-transparent pb-2 text-ink-400 hover:text-ink-600">
              Silver Rates
            </Link>
            <span className="-mb-px border-b-2 border-trust-600 pb-2 text-trust-700">Diamond Prices</span>
          </div>

          <h1 className="mt-6 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Diamond Price Guide in {city.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-600">
            Indicative diamond price reference for {city.name} by carat weight, shape, and the
            4Cs — plus a price estimator. Diamonds don&rsquo;t have a daily spot rate like gold or
            silver, so treat the figures below as a starting point, not a live quote.
          </p>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800">
              Not a live market rate
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              Every diamond is individually graded, so there is no equivalent of gold/silver&rsquo;s
              daily spot price for {city.name} or any other city. Figures below combine an
              illustrative national base-price model with a general {city.name} market index
              ({index.toFixed(2)}×) — they will not exactly match any specific stone&rsquo;s actual
              price. Always get a jeweller&rsquo;s quote and a certified (GIA/IGI) appraisal.
            </p>
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Indicative Diamond Price by Carat in {city.name}
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Round-brilliant, Very Good cut, SI clarity, I-J colour stone — illustrative reference
              only.
            </p>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-4">
              <MetalRateBarChart data={caratChartData} color="#7c3aed" valuePrefix="₹" />
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">Carat</th>
                    <th className="px-4 py-3">Indicative price in {city.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {caratTable.map((row) => (
                    <tr key={row.carat}>
                      <td className="px-4 py-3 font-medium text-ink-900">{row.carat} ct</td>
                      <td className="px-4 py-3 text-ink-600">₹{row.price.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8">
            <DiamondPriceCalculator cityIndex={index} cityName={city.name} />
          </div>

          <div className="mt-8">
            <AdSlot variant="top-banner" />
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Diamond Types (Shapes) and Their Price in {city.name}
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Indicative 1-carat, Very Good cut, SI clarity, I-J colour price by shape. Round
              Brilliant is the baseline — fancy shapes are usually priced somewhat lower per carat.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">Shape</th>
                    <th className="px-4 py-3">Note</th>
                    <th className="px-4 py-3">Indicative 1ct price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {shapeTable.map((row) => (
                    <tr key={row.shape}>
                      <td className="px-4 py-3 font-medium text-ink-900">{row.shape}</td>
                      <td className="px-4 py-3 text-ink-600">{row.note}</td>
                      <td className="px-4 py-3 text-ink-600">₹{row.price.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* All-city comparison */}
          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Diamond Price Index Across Major Cities
            </h2>
            <p className="mt-2 text-base leading-relaxed text-ink-600">
              An indicative 1-carat baseline price across major Indian cities, scaled from {city.name}&rsquo;s
              own reference price. Tap a city to see its full diamond price guide.
            </p>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-4">
              <MetalRateBarChart data={cityCompareData} color="#7c3aed" valuePrefix="₹" />
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">City</th>
                    <th className="px-4 py-3">Indicative 1ct price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {RATE_CITIES.map((c) => {
                    const price = Math.round(oneCaratBaseline * (diamondIndexForCity(c.slug) / index));
                    return (
                      <tr key={c.slug} className={c.slug === city.slug ? 'bg-trust-50' : ''}>
                        <td className="px-4 py-3 font-medium text-ink-900">
                          <Link href={`/diamond-price/${c.slug}`} className="hover:text-trust-700 hover:underline">
                            {c.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-ink-600">₹{price.toLocaleString('en-IN')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-8">
            <AdSlot variant="post-result-native" />
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              What decides diamond prices in {city.name}
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              <p>
                Unlike gold and silver, diamonds have no fungible commodity price. Each stone is
                priced individually off the 4Cs — Carat, Cut, Colour, and Clarity — plus its
                certification. On top of that, local retail factors nudge the price you&rsquo;ll
                actually be quoted in {city.name}:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Proximity to India&rsquo;s diamond cutting and trading hubs (Surat, Mumbai), which affects wholesale sourcing cost.</li>
                <li>Local jeweller overheads, rent, and competition among retailers in {city.name}.</li>
                <li>Whether the stone is natural or lab-grown, which can change the price by 60-80%.</li>
                <li>Certification (GIA/IGI), fluorescence, polish, and symmetry, which aren&rsquo;t captured by carat/cut/colour/clarity alone.</li>
              </ul>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Certification: what to check before buying in {city.name}
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Ask for a GIA or IGI certificate — the two most widely trusted labs.</li>
                <li>Verify the certificate&rsquo;s report number on the certifying lab&rsquo;s own website.</li>
                <li>Check whether the certificate states the stone is natural or lab-grown.</li>
                <li>Get an itemised invoice showing the stone&rsquo;s 4Cs, certificate number, and price separately from making charges.</li>
              </ul>
            </div>
          </section>

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
            This page is an educational reference guide only. It does not reflect live market
            pricing, is not sourced from any real-time data feed, and does not constitute a
            valuation, appraisal, or investment advice. Diamond prices vary significantly by
            individual stone characteristics, certification, and seller. Please consult a certified
            gemologist or jeweller in {city.name} for an actual valuation.
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <PopularCalculatorsSidebar />
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="font-display text-base font-bold text-ink-900">Related trackers</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href={`/gold-rate/${city.slug}`} className="text-sm font-medium text-ink-600 hover:text-trust-700">
                  Gold rate in {city.name}
                </Link>
              </li>
              <li>
                <Link href={`/silver-rate/${city.slug}`} className="text-sm font-medium text-ink-600 hover:text-trust-700">
                  Silver rate in {city.name}
                </Link>
              </li>
              <li>
                <Link href="/diamond-price" className="text-sm font-medium text-ink-600 hover:text-trust-700">
                  Diamond price guide (overview)
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
