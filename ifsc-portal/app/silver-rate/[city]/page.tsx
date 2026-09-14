import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MetalRatePage from '@/components/MetalRatePage';
import { getCity, RATE_CITIES, SILVER_FAQS } from '@/lib/metal-rates';
import { getSpotRates, silverRateForCity } from '@/lib/live-rates';
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
export const revalidate = 1800;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: `Silver Rate Today in ${city.name} | ${SITE_NAME}`,
    description: `Live silver rate per gram and per kg in ${city.name}, updated automatically.`,
    alternates: { canonical: buildCanonical(['silver-rate', params.city]) },
  };
}

export default async function Page({ params }: PageProps) {
  const city = getCity(params.city);
  if (!city) notFound();

  const [spot, history] = await Promise.all([getSpotRates(), getRecentMetalHistory(10)]);
  const rate = silverRateForCity(city.slug, spot);

  return (
    <MetalRatePage
      metal="Silver"
      city={city}
      path={`silver-rate/${city.slug}`}
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
      history={history.map((h) => {
        const r = silverRateForCity(city.slug, {
          gold24kPerGram: h.gold24kPerGram,
          silverPerGram: h.silverPerGram,
          asOf: '',
          isLive: true,
        });
        return { date: h.date, primary: r.silverPerGram, secondary: r.silverPerKg };
      })}
    />
  );
}
