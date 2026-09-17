import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import PageWithSidebar from '@/components/PageWithSidebar';
import DiamondPriceCalculator from '@/components/calculators/DiamondPriceCalculator';
import MetalRateBarChart from '@/components/MetalRateBarChart';
import DiamondTrendChart from '@/components/DiamondTrendChart';
import { faqSchema } from '@/lib/schema';
import { RATE_CITIES, type CityMeta } from '@/lib/metal-rates';
import type { LiveDiamondIndex } from '@/lib/live-diamond-rates';
import type { DiamondHistoryPoint, TrendRange } from '@/lib/diamond-history';
import {
  FLUORESCENCE_GRADES,
  POLISH_GRADES,
  SYMMETRY_GRADES,
  cityCaratTable,
  cityShapeTable,
  diamondCityFaqs,
  diamondIndexForCity,
} from '@/lib/diamond-price';

interface DiamondRatePageProps {
  city: CityMeta;
  liveIndex: LiveDiamondIndex;
  history: Record<TrendRange, DiamondHistoryPoint[]>;
}

export default function DiamondRatePage({ city, liveIndex, history }: DiamondRatePageProps) {
  const index = diamondIndexForCity(city.slug);
  const caratTable = cityCaratTable(city.slug, liveIndex.scaleFactor);
  const shapeTable = cityShapeTable(city.slug, liveIndex.scaleFactor);
  const oneCaratBaseline = caratTable.find((c) => c.carat === 1.0)?.price ?? caratTable[0].price;
  const faqs = diamondCityFaqs(city.name);

  const caratChartData = caratTable.map((c) => ({ label: `${c.carat}ct`, value: c.price }));
  const cityCompareData = RATE_CITIES.slice(0, 12).map((c) => ({
    label: c.name,
    value: Math.round(oneCaratBaseline * (diamondIndexForCity(c.slug) / index)),
  }));

  return (
    <PageWithSidebar citySlug={city.slug} cityName={city.name} current="diamond">
      <JsonLd data={faqSchema(faqs)} />
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

      <div className="mt-6 rounded-2xl border border-trust-200 bg-trust-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-trust-700">
            Diamond Market Index (DCX)
          </p>
          <p className="flex items-center gap-1.5 text-xs text-ink-500">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${liveIndex.isLive ? 'bg-green-500' : 'bg-amber-500'}`}
            />
            {liveIndex.isLive ? 'Live' : 'Cached'} &middot; Updated {liveIndex.asOf}
          </p>
        </div>
        <p className="mt-2 font-display text-lg font-extrabold text-ink-900">
          ${liveIndex.dcxUsd.toLocaleString('en-IN', { maximumFractionDigits: 0 })} / ct{' '}
          <span className="text-sm font-semibold text-ink-500">
            (₹{Math.round(liveIndex.dcxInr).toLocaleString('en-IN')} / ct)
          </span>{' '}
          <span className={liveIndex.trend24h >= 0 ? 'text-green-700' : 'text-red-600'}>
            {liveIndex.trend24h >= 0 ? '▲' : '▼'} {Math.abs(liveIndex.trend24h).toFixed(2)}% (24h)
          </span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-500">
          This composite index tracks overall diamond-market movement, not any single stone —
          the table below is automatically nudged by its 24h trend, then adjusted for{' '}
          {city.name}&rsquo;s local market index ({index.toFixed(2)}×). It still won&rsquo;t match a
          specific stone&rsquo;s actual quote. Always get a jeweller&rsquo;s quote and a certified
          (GIA/IGI) appraisal.
        </p>
      </div>

      <section className="mt-6">
        <DiamondTrendChart
          series={history}
          trend24h={liveIndex.trend24h}
          cityIndex={index}
          cityName={city.name}
        />
      </section>

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
        <DiamondPriceCalculator
          cityIndex={index}
          cityName={city.name}
          liveScaleFactor={liveIndex.scaleFactor}
        />
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
            <li>Certification (GIA/IGI), plus fluorescence, polish, and symmetry — covered in detail in the next section.</li>
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Beyond the 4Cs: Fluorescence, Polish &amp; Symmetry
        </h2>
        <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
          <p>
            Two diamonds with identical carat, cut, colour and clarity can still be quoted at
            noticeably different prices. The reason is usually these three grades, which appear
            on every GIA and IGI report but get far less attention than the 4Cs. All three are
            built into the estimator above.
          </p>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-ink-900">Fluorescence</h3>
        <p className="mt-1.5 text-base leading-relaxed text-ink-600">
          How much the stone glows (usually blue) under UV light. This is the one factor that
          cuts both ways: on a colourless D-F stone, strong fluorescence can make the diamond
          look hazy or milky in sunlight and is discounted; on a tinted I-J or K-M stone, the
          same glow can offset the yellow tint, so the discount is much smaller — occasionally
          it&rsquo;s even seen as a plus.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">What it means</th>
                <th className="px-4 py-3">Typical price effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {FLUORESCENCE_GRADES.map((row) => {
                const pct = Math.round((row.multiplier - 1) * 1000) / 10;
                return (
                  <tr key={row.grade}>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.grade}</td>
                    <td className="px-4 py-3 text-ink-600">{row.note}</td>
                    <td className={`px-4 py-3 font-medium ${pct < 0 ? 'text-red-600' : 'text-ink-500'}`}>
                      {pct === 0 ? 'Baseline' : `${pct.toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-ink-900">Polish</h3>
        <p className="mt-1.5 text-base leading-relaxed text-ink-600">
          The quality of the finish on each facet surface. Poor polish leaves microscopic marks
          that scatter light and dull the stone&rsquo;s sparkle, even when the cut proportions
          are good.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">What it means</th>
                <th className="px-4 py-3">Typical price effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {POLISH_GRADES.map((row) => {
                const pct = Math.round((row.multiplier - 1) * 1000) / 10;
                return (
                  <tr key={row.grade}>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.grade}</td>
                    <td className="px-4 py-3 text-ink-600">{row.note}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        pct < 0 ? 'text-red-600' : pct > 0 ? 'text-green-700' : 'text-ink-500'
                      }`}
                    >
                      {pct === 0 ? 'Baseline' : `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3 className="mt-6 font-display text-lg font-bold text-ink-900">Symmetry</h3>
        <p className="mt-1.5 text-base leading-relaxed text-ink-600">
          How precisely the facets are aligned and how exactly they meet. Off-centre or
          misshapen facets leak light out of the sides of the stone instead of returning it to
          your eye, which a trained eye can spot immediately.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-ink-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">What it means</th>
                <th className="px-4 py-3">Typical price effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {SYMMETRY_GRADES.map((row) => {
                const pct = Math.round((row.multiplier - 1) * 1000) / 10;
                return (
                  <tr key={row.grade}>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.grade}</td>
                    <td className="px-4 py-3 text-ink-600">{row.note}</td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        pct < 0 ? 'text-red-600' : pct > 0 ? 'text-green-700' : 'text-ink-500'
                      }`}
                    >
                      {pct === 0 ? 'Baseline' : `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-ink-600">
          <span className="font-bold text-ink-900">Practical tip:</span> &ldquo;Triple
          Excellent&rdquo; (or 3EX) means Excellent cut, polish and symmetry together — it
          commands a premium and resells most easily. If you&rsquo;re on a budget in{' '}
          {city.name}, dropping symmetry and polish from Excellent to Very Good is usually
          invisible to the naked eye and saves real money, whereas dropping either to Fair or
          Poor is a false economy.
        </p>
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
    </PageWithSidebar>
  );
}
