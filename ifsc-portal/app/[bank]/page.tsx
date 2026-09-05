import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getAllBanks, getBank, getStatesForBank } from '@/lib/data';
import { bankMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: { bank: string };
}

export function generateStaticParams() {
  return getAllBanks().map((bank) => ({ bank: bank.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const bank = getBank(params.bank);
  if (!bank) return {};
  return bankMetadata(bank.name, bank.slug, bank.branchCount);
}

export default function BankPage({ params }: PageProps) {
  const bank = getBank(params.bank);
  if (!bank) notFound();

  const states = getStatesForBank(bank.slug);
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: [] },
    { name: bank.name, path: [bank.slug] },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={crumbs} />
      <Breadcrumbs items={[{ name: bank.name, href: `/${bank.slug}` }]} />

      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        {bank.name} IFSC Codes
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-500">
        {bank.branchCount} {bank.name} branch{bank.branchCount === 1 ? '' : 'es'} listed across{' '}
        {states.length} state{states.length === 1 ? '' : 's'}. Select a state to narrow down to
        district and branch level.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/${bank.slug}/${state.slug}`}
            className="flex items-center justify-between rounded-xl border border-ink-200 bg-white p-4 transition hover:border-trust-300 hover:shadow-card"
          >
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-trust-600" />
              <span className="text-sm font-semibold text-ink-900">{state.name}</span>
            </div>
            <span className="text-xs text-ink-400">
              {state.branchCount} branch{state.branchCount === 1 ? '' : 'es'}
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
