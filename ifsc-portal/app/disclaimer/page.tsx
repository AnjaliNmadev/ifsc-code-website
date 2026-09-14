import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildCanonical } from '@/lib/seo';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_NAME}`,
  description: `Important information about the accuracy and use of IFSC and MICR data on ${SITE_NAME}.`,
  alternates: { canonical: buildCanonical(['disclaimer']) },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ name: 'Disclaimer', href: '/disclaimer' }]} />
      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Disclaimer</h1>
      <div className="prose-sm mt-6 space-y-4 text-sm leading-relaxed text-ink-600">
        <p>
          The information provided on {SITE_NAME} — including IFSC codes, MICR codes, branch
          addresses, and contact numbers — is aggregated from publicly available sources and is
          provided for general informational purposes only.
        </p>
        <p>
          We make reasonable efforts to keep this information accurate and up to date, but we make
          no representations or warranties of any kind, express or implied, about the
          completeness, accuracy, reliability, or availability of any information on this site.
          Bank branches are occasionally renamed, relocated, merged, or closed, and IFSC codes can
          be reissued as a result.
        </p>
        <p>
          Any reliance you place on information from this site is strictly at your own risk. Before
          initiating a fund transfer or relying on a branch address or contact number, please
          verify the details directly with the concerned bank or through the Reserve Bank of
          India&rsquo;s official records.
        </p>
        <p>
          {SITE_NAME} is not liable for any loss or damage, including without limitation indirect
          or consequential loss or damage, arising from the use of this site or reliance on the
          information it contains.
        </p>
        <p>
          This site is not affiliated with, endorsed by, or operated on behalf of any bank, the
          Reserve Bank of India, or the National Payments Corporation of India.
        </p>
      </div>
    </div>
  );
}
