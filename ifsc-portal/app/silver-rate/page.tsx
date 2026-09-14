import Link from 'next/link';
import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RATE_CITIES } from '@/lib/metal-rates';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Silver Rate Today — All Cities | ${SITE_NAME}`,
  description: 'Live silver rate today across major Indian cities — per gram and per kilogram.',
  alternates: { canonical: buildCanonical(['silver-rate']) },
};

export default function SilverRateHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Silver Rate', href: '/silver-rate' }]} />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Silver Rate Today — All Cities
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        Select a city to see today&rsquo;s live silver rate per gram and per kilogram.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {RATE_CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/silver-rate/${city.slug}`}
            className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white p-4 text-sm font-semibold text-ink-800 transition hover:border-trust-400 hover:text-trust-700 hover:shadow-card"
          >
            <MapPin size={15} className="text-trust-600" />
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
