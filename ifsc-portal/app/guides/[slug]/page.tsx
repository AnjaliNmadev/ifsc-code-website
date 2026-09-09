import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { GUIDES, getGuide } from '@/lib/guides';
import { GUIDE_CONTENT, type GuideTable } from '@/lib/guides-content';
import { buildCanonical } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import { SITE_NAME } from '@/lib/utils';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.shortDescription,
    alternates: { canonical: buildCanonical(['guides', guide.slug]) },
  };
}

function GuideTableView({ table }: { table: GuideTable }) {
  return (
    <div className="my-4">
      <div className="overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <tr>
              {table.headers.map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {table.rows.map((row, idx) => (
              <tr key={idx}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={
                      cellIdx === 0
                        ? 'px-4 py-3 font-medium text-ink-900'
                        : 'px-4 py-3 text-ink-600'
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="mt-2 text-xs leading-relaxed text-ink-400">{table.note}</p>}
    </div>
  );
}

export default function GuideDetailPage({ params }: PageProps) {
  const guide = getGuide(params.slug);
  const content = GUIDE_CONTENT[params.slug];
  if (!guide || !content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqSchema(content.faqs)} />
      <Breadcrumbs
        items={[
          { name: 'Guides', href: '/guides' },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-600">{content.intro}</p>

      {content.keyHighlights && (
        <div className="mt-6 rounded-2xl border border-trust-200 bg-trust-50 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-trust-700">
            Key highlights
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-trust-100">
                {content.keyHighlights.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2 pr-4 font-semibold text-ink-800">{row[0]}</td>
                    <td className="py-2 text-ink-700">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8">
        <AdSlot variant="top-banner" />
      </div>

      <div className="mt-8 space-y-8">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl font-extrabold text-ink-900">
              {section.heading}
            </h2>
            <div className="prose-sm mt-3 space-y-3 text-base leading-relaxed text-ink-600">
              {section.paragraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              {section.table && <GuideTableView table={section.table} />}
              {section.bullets && (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold text-ink-900">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-4">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-ink-200 bg-white p-4 open:border-trust-300"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-ink-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-base leading-relaxed text-ink-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10 text-xs leading-relaxed text-ink-400">
        This guide is for general informational purposes only and does not constitute tax,
        legal, or financial advice. Rules and rates can change — please verify current provisions
        on the Income Tax Department&rsquo;s website or consult a qualified professional before
        acting on them.
      </p>
    </div>
  );
}
