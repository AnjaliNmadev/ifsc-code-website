import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/utils';
import { CALCULATORS } from '@/lib/calculators';
import { GUIDES } from '@/lib/guides';
import { RATE_CITIES } from '@/lib/metal-rates';

// Computed fresh per-request (not during `next build`) so a slow or
// cold-starting database can never block or fail the production build.
// Vercel/Netlify still cache the response at the edge, so this stays fast.
export const dynamic = 'force-dynamic';

/**
 * With 180,000+ branch pages, listing every single URL in one sitemap file
 * is impractical (Google also caps a single sitemap at 50,000 URLs). This
 * sitemap lists the pages Google should always know about — the homepage,
 * static pages, every bank page, and every bank+state page — which is
 * already tens of thousands of URLs and gives Google's crawler more than
 * enough entry points to discover every district and branch page by
 * following links from there.
 *
 * Both listings below are fetched in ONE query each (not one query per
 * bank), so this stays fast even with 150+ banks and thousands of
 * bank+state combinations.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/calculators`, changeFrequency: 'monthly', priority: 0.6 },
    ...CALCULATORS.map((calc) => ({
      url: `${SITE_URL}/calculators/${calc.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/guides`, changeFrequency: 'monthly', priority: 0.6 },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...RATE_CITIES.flatMap((city) => [
      {
        url: `${SITE_URL}/gold-rate-${city.slug}`,
        changeFrequency: 'daily' as const,
        priority: 0.6,
      },
      {
        url: `${SITE_URL}/silver-rate-${city.slug}`,
        changeFrequency: 'daily' as const,
        priority: 0.6,
      },
    ]),
  ];

  const [{ data: banks }, { data: states }] = await Promise.all([
    supabase.from('bank_summary').select('slug'),
    supabase.from('state_summary').select('bank_slug, slug'),
  ]);

  for (const bank of banks ?? []) {
    entries.push({ url: `${SITE_URL}/${bank.slug}`, changeFrequency: 'weekly', priority: 0.8 });
  }

  for (const state of states ?? []) {
    entries.push({
      url: `${SITE_URL}/${state.bank_slug}/${state.slug}`,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  return entries;
}
