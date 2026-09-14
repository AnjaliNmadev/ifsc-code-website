import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DiamondRatePage from '@/components/DiamondRatePage';
import { getCity, RATE_CITIES } from '@/lib/metal-rates';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

interface PageProps {
  params: { city: string };
}

export async function generateStaticParams() {
  return RATE_CITIES.map((c) => ({ city: c.slug }));
}

export const dynamicParams = true;
export const revalidate = 86400; // reference data is static day-to-day, unlike the live bullion feed

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: `Diamond Price in ${city.name} (Indicative) | ${SITE_NAME}`,
    description: `Indicative diamond price guide for ${city.name} by carat, shape, and the 4Cs, with a price estimator. Not a live market rate.`,
    alternates: { canonical: buildCanonical(['diamond-price', params.city]) },
  };
}

export default async function Page({ params }: PageProps) {
  const city = getCity(params.city);
  if (!city) notFound();

  return <DiamondRatePage city={city} />;
}
