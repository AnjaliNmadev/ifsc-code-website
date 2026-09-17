import Link from 'next/link';

interface RelatedTrackersProps {
  /**
   * City slug to deep-link into, e.g. "mumbai". When omitted the links point
   * at the national overview pages instead, so this works on guide and
   * calculator pages that aren't tied to a city.
   */
  citySlug?: string;
  cityName?: string;
  /** Which tracker (if any) the user is already on, so it isn't linked back to itself. */
  current?: 'gold' | 'silver' | 'diamond';
}

/**
 * The "Related trackers" sidebar card. Gold, silver and diamond are the three
 * rate trackers on the site, so every one of them links to the other two —
 * and guide/calculator pages link to all three. Kept in one component so the
 * set stays in sync everywhere instead of being copy-pasted per page.
 */
export default function RelatedTrackers({ citySlug, cityName, current }: RelatedTrackersProps) {
  const suffix = citySlug ? `/${citySlug}` : '';
  const inCity = cityName ? ` in ${cityName}` : '';

  const trackers = [
    { key: 'gold' as const, href: `/gold-rate${suffix}`, label: `Gold rate${inCity}` },
    { key: 'silver' as const, href: `/silver-rate${suffix}`, label: `Silver rate${inCity}` },
    { key: 'diamond' as const, href: `/diamond-price${suffix}`, label: `Diamond price${inCity}` },
  ].filter((t) => t.key !== current);

  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
      <p className="font-display text-base font-bold text-ink-900">Related trackers</p>
      <ul className="mt-3 space-y-2">
        {trackers.map((t) => (
          <li key={t.key}>
            <Link
              href={t.href}
              className="text-sm font-medium text-ink-600 transition hover:text-trust-700"
            >
              {t.label}
            </Link>
          </li>
        ))}
        {citySlug && (
          <li className="border-t border-ink-100 pt-2">
            <Link
              href="/diamond-price"
              className="text-sm font-medium text-ink-600 transition hover:text-trust-700"
            >
              Diamond price guide (overview)
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
