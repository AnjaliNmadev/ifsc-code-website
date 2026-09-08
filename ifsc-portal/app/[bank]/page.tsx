import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import BankEducationContent from '@/components/BankEducationContent';
import { getAllBanks, getBank, getStatesForBank } from '@/lib/data';
import { bankMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: { bank: string };
}

// Pre-build only the most-searched banks at deploy time; every other bank
// page (there can be 150+) is generated on first visit and then cached —
// see `dynamicParams` and `revalidate` below. This keeps deploys fast even
// with the full ~180,000-branch dataset.
export async function generateStaticParams() {
  const banks = await getAllBanks();
  return banks.slice(0, 20).map((bank) => ({ bank: bank.slug }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const bank = await getBank(params.bank);
  if (!bank) return {};
  return bankMetadata(bank.name, bank.slug, bank.branchCount);
}

export default async function BankPage({ params }: PageProps) {
  const bank = await getBank(params.bank);
  if (!bank) notFound();

  const states = await getStatesForBank(bank.slug);
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: [] },
    { name: bank.name, path: [bank.slug] },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={crumbs} />
      <Breadcrumbs items={[{ name: bank.name, href: `/${bank.slug}` }]} />

      <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        {bank.name} IFSC Codes
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-ink-600">
        {bank.branchCount.toLocaleString('en-IN')} {bank.name} branch{bank.branchCount === 1 ? '' : 'es'} listed across{' '}
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
              <span className="text-base font-bold text-ink-900">{state.name}</span>
            </div>
            <span className="text-xs text-ink-400">
              {state.branchCount.toLocaleString('en-IN')} branch{state.branchCount === 1 ? '' : 'es'}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot variant="post-result-native" />
      </div>

      <BankEducationContent bankName={bank.name} />
    </div>
  );
}
