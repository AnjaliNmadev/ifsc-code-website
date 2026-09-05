import type { MetadataRoute } from 'next';
import {
  getAllBanks,
  getStatesForBank,
  getDistrictsForState,
  getBranchesForDistrict,
} from '@/lib/data';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  for (const bank of getAllBanks()) {
    entries.push({ url: `${SITE_URL}/${bank.slug}`, changeFrequency: 'weekly', priority: 0.8 });

    for (const state of getStatesForBank(bank.slug)) {
      entries.push({
        url: `${SITE_URL}/${bank.slug}/${state.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      for (const district of getDistrictsForState(bank.slug, state.slug)) {
        entries.push({
          url: `${SITE_URL}/${bank.slug}/${state.slug}/${district.slug}`,
          changeFrequency: 'weekly',
          priority: 0.6,
        });

        for (const branch of getBranchesForDistrict(bank.slug, state.slug, district.slug)) {
          entries.push({
            url: `${SITE_URL}/${bank.slug}/${state.slug}/${district.slug}/${branch.branchSlug}`,
            changeFrequency: 'monthly',
            priority: 0.9,
          });
        }
      }
    }
  }

  return entries;
}
