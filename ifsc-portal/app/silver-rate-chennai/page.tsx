import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalRatePage from '@/components/MetalRatePage';
import { getCity, RATE_CITIES, SILVER_FAQS } from '@/lib/metal-rates';
import { getSpotRates, silverRateForCity } from '@/lib/live-rates';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

const CITY_SLUG = 'chennai';

export const metadata: Metadata = {
  title: `Silver Rate Today in ${getCity(CITY_SLUG)?.name} | ${SITE_NAME}`,
  description: `Live silver rate per gram and per kg in ${getCity(CITY_SLUG)?.name}, updated automatically.`,
  alternates: { canonical: buildCanonical(['silver-rate-' + CITY_SLUG]) },
};

export default async function Page() {
  const city = getCity(CITY_SLUG);
  if (!city) notFound();

  const spot = await getSpotRates();
  const rate = silverRateForCity(CITY_SLUG, spot);

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
      intro={`Check today's live silver rate in ${city.name}, per gram and per kilogram. Rates below are indicative and exclude GST and making charges.`}
      faqs={SILVER_FAQS}
      asOf={spot.asOf}
      isLive={spot.isLive}
      compareHeaders={['Per gram', 'Per kg']}
      compareRows={RATE_CITIES.map((c) => {
        const r = silverRateForCity(c.slug, spot);
        return {
          city: c,
          primaryValue: `₹${r.silverPerGram.toLocaleString('en-IN')}`,
          secondaryValue: `₹${r.silverPerKg.toLocaleString('en-IN')}`,
        };
      })}
    />
  );
}
