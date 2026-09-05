import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description: `Learn how ${SITE_NAME} sources and presents Indian bank branch IFSC and MICR code data.`,
  alternates: { canonical: buildCanonical(['about']) },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'About Us', href: '/about' }]} />
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">About Us</h1>
      <div className="prose-sm mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
        <p>
          {SITE_NAME} is an independent directory built to make one specific task fast: finding
          the correct IFSC code, MICR code, and address for an Indian bank branch. Whether you
          have an 11-digit code ready to check, or only know the bank, state, and district, the
          site is designed to get you to the right branch page in a few clicks.
        </p>
        <p>
          The directory is organized so that every bank, state, district, and branch has its own
          dedicated, shareable page. This structure keeps the information easy to browse, easy to
          bookmark, and easy to find again through search engines.
        </p>
        <p>
          Branch details are aggregated from publicly available banking data sources. While we
          take reasonable care to keep listings accurate, banking details can change — new
          branches open, IFSC codes are occasionally reissued after mergers, and contact numbers
          get updated. We recommend confirming any critical detail directly with your bank before
          relying on it for an important transfer.
        </p>
        <p>
          {SITE_NAME} is not affiliated with, endorsed by, or operated on behalf of any bank, the
          Reserve Bank of India, or the National Payments Corporation of India. All bank names and
          logos referenced belong to their respective owners and are used here only to identify
          branches.
        </p>
      </div>
    </div>
  );
}
