import type { BranchRecord } from './types';
import { SITE_NAME, SITE_URL } from './utils';
import { buildCanonical } from './seo';

interface Crumb {
  name: string;
  path: string[];
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: buildCanonical(crumb.path),
    })),
  };
}

/**
 * BankOrCreditUnion structured data for a single branch (money page).
 * Google can surface this as a rich result for local financial institution
 * queries, including address and telephone.
 */
export function bankOrCreditUnionSchema(branch: BranchRecord) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: `${branch.bankName} - ${branch.branch}`,
    branchCode: branch.ifsc,
    url: buildCanonical([branch.bankSlug, branch.stateSlug, branch.districtSlug, branch.branchSlug]),
    telephone: branch.contact !== 'Not available' ? branch.contact : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: branch.state,
      addressCountry: 'IN',
    },
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'IFSC',
        value: branch.ifsc,
      },
      ...(branch.micr
        ? [
            {
              '@type': 'PropertyValue',
              propertyID: 'MICR',
              value: branch.micr,
            },
          ]
        : []),
    ],
    parentOrganization: {
      '@type': 'BankOrCreditUnion',
      name: branch.bankName,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?ifsc={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
