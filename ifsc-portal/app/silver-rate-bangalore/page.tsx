import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalRatePage from '@/components/MetalRatePage';
import { getCity, SILVER_RATES, SILVER_FAQS, RATES_LAST_UPDATED } from '@/lib/metal-rates';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

const CITY_SLUG = 'bangalore';

export const metadata: Metadata = {
  title: `Silver Rate Today in ${getCity(CITY_SLUG)?.name} | ${SITE_NAME}`,
  description: `Today's silver rate per gram and per kg in ${getCity(CITY_SLUG)?.name}, updated ${RATES_LAST_UPDATED}.`,
  alternates: { canonical: buildCanonical(['silver-rate-' + CITY_SLUG]) },
};

export default function Page() {
  const city = getCity(CITY_SLUG);
  const rate = SILVER_RATES[CITY_SLUG];
  if (!city || !rate) notFound();

  return (
    <MetalRatePage
      metal="Silver"
      city={city}
      path={`silver-rate-${CITY_SLUG}`}
      headline={`₹${rate.silverPerGram.toLocaleString('en-IN')} per gram`}
      rows={[
        { label: 'Silver (per gram)', value: `₹${rate.silverPerGram.toLocaleString('en-IN')}` },
        { label: 'Silver (per kg)', value: `₹${rate.silverPerKg.toLocaleString('en-IN')}` },
      ]}
      intro={`Check today's silver rate in ${city.name}, per gram and per kilogram. Rates below are indicative and exclude GST and making charges.`}
      faqs={SILVER_FAQS}
    />
  );
}
