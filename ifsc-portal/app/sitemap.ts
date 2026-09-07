import type { MetadataRoute } from 'next';
import { getAllBanks, getStatesForBank } from '@/lib/data';
import { SITE_URL } from '@/lib/utils';

/**
 * With 180,000+ branch pages, listing every single URL in one sitemap file
 * is impractical (Google also caps a single sitemap at 50,000 URLs). This
 * sitemap lists the pages Google should always know about — the homepage,
 * static pages, every bank page, and every bank+state page — which is
 * already tens of thousands of URLs and gives Google's crawler more than
 * enough entry points to discover every district and branch page by
 * following links from there.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const banks = await getAllBanks();

  for (const bank of banks) {
    entries.push({ url: `${SITE_URL}/${bank.slug}`, changeFrequency: 'weekly', priority: 0.8 });

    const states = await getStatesForBank(bank.slug);
    for (const state of states) {
      entries.push({
        url: `${SITE_URL}/${bank.slug}/${state.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
