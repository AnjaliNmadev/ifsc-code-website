import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalRatePage from '@/components/MetalRatePage';
import { getCity, RATE_CITIES, GOLD_FAQS } from '@/lib/metal-rates';
import { getSpotRates, goldRateForCity } from '@/lib/live-rates';
import { getRecentMetalHistory } from '@/lib/metal-history';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

interface PageProps {
  params: { city: string };
}

export async function generateStaticParams() {
  return RATE_CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = true;
export const revalidate = 1800; // 30 minutes, matching the live feed's own cache

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: `Gold Rate Today in ${city.name} | ${SITE_NAME}`,
    description: `Live 24K, 22K and 18K gold rate per gram in ${city.name}, updated automatically.`,
    alternates: { canonical: buildCanonical(['gold-rate', params.city]) },
  };
}

export default async function Page({ params }: PageProps) {
  const city = getCity(params.city);
  if (!city) notFound();

  const [spot, history] = await Promise.all([getSpotRates(), getRecentMetalHistory(10)]);
  const rate = goldRateForCity(city.slug, spot);

  return (
    <MetalRatePage
      metal="Gold"
      city={city}
      path={`gold-rate/${city.slug}`}
      headline={`₹${rate.gold22k.toLocaleString('en-IN')} per gram (22K)`}
      rows={[
        { label: '24K gold (99.9% purity)', value: `₹${rate.gold24k.toLocaleString('en-IN')} / gram` },
        { label: '22K gold (91.6% purity)', value: `₹${rate.gold22k.toLocaleString('en-IN')} / gram` },
        { label: '18K gold (75% purity)', value: `₹${rate.gold18k.toLocaleString('en-IN')} / gram` },
      ]}
      intro={`Check today's live gold rate in ${city.name} for 24 carat, 22 carat, and 18 carat gold, per gram. Rates below are indicative and exclude GST and making charges.`}
      faqs={GOLD_FAQS}
      asOf={spot.asOf}
      isLive={spot.isLive}
      compareHeaders={['22K / gram', '24K / gram']}
      compareRows={RATE_CITIES.map((c) => {
        const r = goldRateForCity(c.slug, spot);
        return {
          city: c,
          primaryValue: `₹${r.gold22k.toLocaleString('en-IN')}`,
          secondaryValue: `₹${r.gold24k.toLocaleString('en-IN')}`,
        };
      })}
      history={history.map((h) => {
        const r = goldRateForCity(city.slug, {
          gold24kPerGram: h.gold24kPerGram,
          silverPerGram: h.silverPerGram,
          asOf: '',
          isLive: true,
        });
        return { date: h.date, primary: r.gold22k, secondary: r.gold24k };
      })}
    />
  );
}
