import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import PopularCalculatorsSidebar from '@/components/PopularCalculatorsSidebar';
import DiamondPriceCalculator from '@/components/calculators/DiamondPriceCalculator';
import MetalRateBarChart from '@/components/MetalRateBarChart';
import DiamondTrendChart from '@/components/DiamondTrendChart';
import { faqSchema } from '@/lib/schema';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';
import {
  CARAT_WEIGHTS,
  CLARITY_GRADES,
  COLOR_GRADES,
  DIAMOND_FAQS,
  DIAMOND_SHAPES,
  basePricePerCaratFor,
} from '@/lib/diamond-price';
import { RATE_CITIES } from '@/lib/metal-rates';
import { getLiveDiamondIndex } from '@/lib/live-diamond-rates';
import { getAllDiamondTrendRanges } from '@/lib/diamond-history';

export const revalidate = 1800; // 30 minutes, matching the live diamond index feed

export const metadata: Metadata = {
  title: `Diamond Price Guide (Indicative) | ${SITE_NAME}`,
  description:
    'Understand how diamond prices work by carat, cut, colour, and clarity, with an indicative price estimator. Not a live market rate — diamonds have no single spot price like gold or silver.',
  alternates: { canonical: buildCanonical(['diamond-price']) },
};

export default async function DiamondPricePage() {
  const [liveIndex, history] = await Promise.all([
    getLiveDiamondIndex(),
    getAllDiamondTrendRanges(),
  ]);

  const caratChartData = CARAT_WEIGHTS.map((c) => ({
    label: `${c}ct`,
    value: Math.round(basePricePerCaratFor(c) * liveIndex.scaleFactor),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(DIAMOND_FAQS)} />
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Breadcrumbs items={[{ name: 'Diamond Price Guide', href: '/diamond-price' }]} />

          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Diamond Price Guide
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-600">
            Unlike gold and silver, diamonds don&rsquo;t have a single daily &ldquo;spot
            rate&rdquo;. This guide explains what actually drives a diamond&rsquo;s price and gives
            a rough, indicative estimate based on carat weight and the 4Cs.
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
              the figures below are automatically nudged by its 24h trend. It still won&rsquo;t
              match a specific stone&rsquo;s actual quote. Every diamond is individually graded, so
              there is no equivalent of gold/silver&rsquo;s per-stone spot price. Always get a
              jeweller&rsquo;s quote and a certified (GIA/IGI) appraisal before buying or selling.
            </p>
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Why there&rsquo;s no &ldquo;today&rsquo;s diamond rate&rdquo;
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              <p>
                Gold and silver are fungible: a gram of 24K gold today is chemically identical to
                any other gram of 24K gold, anywhere. That makes a single global spot price
                possible. A diamond is the opposite — no two stones are alike. Its value depends
                on the specific combination of Carat, Cut, Colour, and Clarity (the
                &ldquo;4Cs&rdquo;), plus factors like fluorescence, polish, symmetry, and its
                certifying lab. That&rsquo;s why the diamond trade quotes prices per stone (or via
                pricing guides like the Rapaport list, used mainly by trade professionals) rather
                than a single daily rate the public can check.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">The 4Cs explained</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">C</th>
                    <th className="px-4 py-3">What it measures</th>
                    <th className="px-4 py-3">Effect on price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink-900">Carat</td>
                    <td className="px-4 py-3 text-ink-600">The diamond&rsquo;s weight (1 carat = 0.2 grams).</td>
                    <td className="px-4 py-3 text-ink-600">Price per carat rises steeply as weight increases — larger stones are exponentially rarer.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink-900">Cut</td>
                    <td className="px-4 py-3 text-ink-600">How well the stone is proportioned and polished — this determines its sparkle.</td>
                    <td className="px-4 py-3 text-ink-600">An Excellent cut can command a meaningful premium over a Good or Fair cut of the same size.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink-900">Colour</td>
                    <td className="px-4 py-3 text-ink-600">Graded D (colourless) to Z (light yellow/brown).</td>
                    <td className="px-4 py-3 text-ink-600">Colourless (D-F) grades cost noticeably more than near-colourless or faintly tinted stones.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-ink-900">Clarity</td>
                    <td className="px-4 py-3 text-ink-600">How free the stone is of internal/external inclusions, from Flawless to Included.</td>
                    <td className="px-4 py-3 text-ink-600">Flawless/Internally Flawless stones carry a large premium; most jewellery uses VS-SI clarity for good value.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6">
            <DiamondTrendChart
              series={history}
              trend24h={liveIndex.trend24h}
              cityIndex={1}
              cityName="India"
            />
          </section>

          <section className="mt-8">
            <h2 className="font-display text-xl font-extrabold text-ink-900">
              Indicative price per carat by carat weight
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Illustrative reference points for a round-brilliant, Very Good cut, SI clarity, I-J
              colour stone — not a live or guaranteed price.
            </p>
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-4">
              <MetalRateBarChart data={caratChartData} color="#7c3aed" valuePrefix="₹" />
            </div>
          </section>

          <div className="mt-8">
            <DiamondPriceCalculator liveScaleFactor={liveIndex.scaleFactor} />
          </div>

          <div className="mt-8">
            <AdSlot variant="top-banner" />
          </div>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Diamond price by city
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              See an indicative diamond price guide, carat-wise table, shape-wise pricing, and a
              local price estimator for your city.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {RATE_CITIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/diamond-price/${c.slug}`}
                  className="rounded-lg border border-ink-200 bg-white px-3 py-2.5 text-sm font-medium text-ink-700 transition hover:border-trust-300 hover:text-trust-700"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Diamond types (shapes) and how they affect price
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Indicative relative price per carat by shape, compared to a Round Brilliant of the
              same carat/cut/colour/clarity (1.00×) — illustrative only.
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-ink-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <tr>
                    <th className="px-4 py-3">Shape</th>
                    <th className="px-4 py-3">Note</th>
                    <th className="px-4 py-3">Relative price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {DIAMOND_SHAPES.map((s) => (
                    <tr key={s.shape}>
                      <td className="px-4 py-3 font-medium text-ink-900">{s.shape}</td>
                      <td className="px-4 py-3 text-ink-600">{s.note}</td>
                      <td className="px-4 py-3 text-ink-600">{s.multiplier.toFixed(2)}×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              How clarity and colour move the price
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="overflow-x-auto rounded-xl border border-ink-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-4 py-3">Clarity grade</th>
                      <th className="px-4 py-3">Relative price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {CLARITY_GRADES.map((c) => (
                      <tr key={c.grade}>
                        <td className="px-4 py-3 font-medium text-ink-900">
                          {c.grade}
                          <span className="ml-1.5 text-xs font-normal text-ink-400">{c.label}</span>
                        </td>
                        <td className="px-4 py-3 text-ink-600">{c.multiplier.toFixed(2)}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto rounded-xl border border-ink-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-4 py-3">Colour grade</th>
                      <th className="px-4 py-3">Relative price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {COLOR_GRADES.map((c) => (
                      <tr key={c.grade}>
                        <td className="px-4 py-3 font-medium text-ink-900">
                          {c.grade}
                          <span className="ml-1.5 text-xs font-normal text-ink-400">{c.label}</span>
                        </td>
                        <td className="px-4 py-3 text-ink-600">{c.multiplier.toFixed(2)}×</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-500">
              &ldquo;Relative price&rdquo; is a multiplier against a baseline SI-clarity, I-J
              colour stone of the same carat weight — illustrative only.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Natural vs lab-grown diamonds
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              <p>
                Lab-grown diamonds have the same chemical composition and optical properties as
                natural diamonds but are grown in a controlled lab environment rather than formed
                underground over billions of years. Because they aren&rsquo;t naturally scarce, they
                are typically priced well below comparable natural diamonds of the same 4Cs — often
                significantly less. Always ask whether a stone is natural or lab-grown, and check
                that the certificate explicitly states this, before comparing prices.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Certification: what to check before buying
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Ask for a GIA or IGI certificate — the two most widely trusted labs.</li>
                <li>Verify the certificate&rsquo;s report number on the certifying lab&rsquo;s own website.</li>
                <li>Check whether the certificate states the stone is natural or lab-grown.</li>
                <li>Get an itemised invoice showing the stone&rsquo;s 4Cs, certificate number, and price separately from any setting/making charges.</li>
                <li>For a significant purchase, consider an independent appraisal in addition to the seller&rsquo;s certificate.</li>
              </ul>
            </div>
          </section>

          <div className="mt-8">
            <AdSlot variant="post-result-native" />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-4">
              {DIAMOND_FAQS.map((faq) => (
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
            This page is an educational reference guide only. The DCX figure above is pulled from
            a live diamond market index and used to nudge the illustrative table below, but
            neither reflects the price of any specific stone and neither constitutes a valuation,
            appraisal, or investment advice. Diamond prices vary significantly by individual stone
            characteristics, certification, and seller. Please consult a certified gemologist or
            jeweller for an actual valuation.
          </p>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <PopularCalculatorsSidebar />
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
            <p className="font-display text-base font-bold text-ink-900">Related trackers</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/gold-rate" className="text-sm font-medium text-ink-600 hover:text-trust-700">
                  Gold rate today
                </Link>
              </li>
              <li>
                <Link href="/silver-rate" className="text-sm font-medium text-ink-600 hover:text-trust-700">
                  Silver rate today
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
