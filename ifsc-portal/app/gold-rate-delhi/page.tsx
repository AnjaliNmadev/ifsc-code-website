import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalRatePage from '@/components/MetalRatePage';
import { getCity, GOLD_RATES, GOLD_FAQS, RATES_LAST_UPDATED } from '@/lib/metal-rates';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

const CITY_SLUG = 'delhi';

export const metadata: Metadata = {
  title: `Gold Rate Today in ${getCity(CITY_SLUG)?.name} | ${SITE_NAME}`,
  description: `Today's 24K, 22K and 18K gold rate per gram in ${getCity(CITY_SLUG)?.name}, updated ${RATES_LAST_UPDATED}.`,
  alternates: { canonical: buildCanonical(['gold-rate-' + CITY_SLUG]) },
};

export default function Page() {
  const city = getCity(CITY_SLUG);
  const rate = GOLD_RATES[CITY_SLUG];
  if (!city || !rate) notFound();

  return (
    <MetalRatePage
      metal="Gold"
      city={city}
      path={`gold-rate-${CITY_SLUG}`}
      headline={`₹${rate.gold22k.toLocaleString('en-IN')} per gram (22K)`}
      rows={[
        { label: '24K gold (99.9% purity)', value: `₹${rate.gold24k.toLocaleString('en-IN')} / gram` },
        { label: '22K gold (91.6% purity)', value: `₹${rate.gold22k.toLocaleString('en-IN')} / gram` },
        { label: '18K gold (75% purity)', value: `₹${rate.gold18k.toLocaleString('en-IN')} / gram` },
      ]}
      intro={`Check today's gold rate in ${city.name} for 24 carat, 22 carat, and 18 carat gold, per gram. Rates below are indicative and exclude GST and making charges.`}
      faqs={GOLD_FAQS}
    />
  );
}
