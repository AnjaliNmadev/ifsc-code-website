import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Building } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getAllBanks, getBank, getStatesForBank, getState, getDistrictsForState } from '@/lib/data';
import { stateMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: { bank: string; state: string };
}

export function generateStaticParams() {
  return getAllBanks().flatMap((bank) =>
    getStatesForBank(bank.slug).map((state) => ({ bank: bank.slug, state: state.slug }))
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const bank = getBank(params.bank);
  const state = bank ? getState(bank.slug, params.state) : null;
  if (!bank || !state) return {};
  return stateMetadata(bank.name, state.name, bank.slug, state.slug, state.branchCount);
}

export default function StatePage({ params }: PageProps) {
  const bank = getBank(params.bank);
  if (!bank) notFound();
  const state = getState(bank.slug, params.state);
  if (!state) notFound();

  const districts = getDistrictsForState(bank.slug, state.slug);
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: [] },
    { name: bank.name, path: [bank.slug] },
    { name: state.name, path: [bank.slug, state.slug] },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={crumbs} />
      <Breadcrumbs
        items={[
          { name: bank.name, href: `/${bank.slug}` },
          { name: state.name, href: `/${bank.slug}/${state.slug}` },
        ]}
      />

      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        {bank.name} IFSC Codes in {state.name}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-500">
        {state.branchCount} branch{state.branchCount === 1 ? '' : 'es'} across {districts.length}{' '}
        district{districts.length === 1 ? '' : 's'} in {state.name}.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {districts.map((district) => (
          <Link
            key={district.slug}
            href={`/${bank.slug}/${state.slug}/${district.slug}`}
            className="flex items-center justify-between rounded-xl border border-ink-200 bg-white p-4 transition hover:border-trust-300 hover:shadow-card"
          >
            <div className="flex items-center gap-2.5">
              <Building size={16} className="text-trust-600" />
              <span className="text-sm font-semibold text-ink-900">{district.name}</span>
            </div>
            <span className="text-xs text-ink-400">
              {district.branchCount} branch{district.branchCount === 1 ? '' : 'es'}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot variant="post-result-native" />
      </div>
    </div>
  );
}
