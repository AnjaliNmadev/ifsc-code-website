import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `How ${SITE_NAME} handles data, cookies, and third-party advertising.`,
  alternates: { canonical: buildCanonical(['privacy-policy']) },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-xs text-ink-400">Last updated: this page should be dated at publish time.</p>

      <div className="prose-sm mt-6 space-y-5 text-sm leading-relaxed text-ink-600">
        <section>
          <h2 className="font-display text-base font-semibold text-ink-900">Information we collect</h2>
          <p className="mt-2">
            {SITE_NAME} does not require account registration and does not collect personally
            identifiable information to perform an IFSC or MICR lookup. Search queries you type
            (such as an IFSC code) are sent to our lookup service solely to return a result and
            are not linked to your identity.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink-900">Cookies and local storage</h2>
          <p className="mt-2">
            We use your browser&rsquo;s local session storage to cache recent lookup results so
            repeat searches load instantly. This cache stays on your device and clears when you
            close your browser tab.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink-900">Advertising</h2>
          <p className="mt-2">
            This site displays advertising served by Google AdSense and other advertising
            networks. These third parties may use cookies, web beacons, or similar technologies to
            collect information about your visits to this and other websites in order to provide
            advertisements about goods and services of interest to you. You can opt out of
            personalized advertising by visiting Google&rsquo;s Ads Settings.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink-900">Analytics</h2>
          <p className="mt-2">
            We may use standard web analytics tools to understand aggregate traffic patterns, such
            as which pages are visited most often. This data is used only in aggregate form and is
            not used to identify individual visitors.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink-900">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent through the Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
