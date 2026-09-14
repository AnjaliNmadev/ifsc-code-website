import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team about corrections, feedback, or advertising.`,
  alternates: { canonical: buildCanonical(['contact']) },
};

const CONTACT_EMAIL = 'hello@example-ifsc-finder.com';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Contact Us</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">
        Spotted an incorrect branch address, IFSC code, or contact number? Have a question about
        advertising on this site? Send us a message and we&rsquo;ll get back to you.
      </p>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust-50 text-trust-700">
          <Mail size={18} />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-400">Email us</p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              'IFSC Finder — feedback / correction'
            )}`}
            className="text-sm font-semibold text-trust-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-400">
        Replace {CONTACT_EMAIL} with your real support address before deploying, and consider
        connecting a form service (e.g. Formspree or a Netlify Forms endpoint) if you want an
        in-page contact form instead of a mailto link.
      </p>
    </div>
  );
}
