import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Landmark } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getBank, getState, getDistrict, getBranchesForDistrict } from '@/lib/data';
import { districtMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

interface PageProps {
  params: { bank: string; state: string; district: string };
}

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const bank = await getBank(params.bank);
  const state = bank ? await getState(bank.slug, params.state) : null;
  const district = bank && state ? await getDistrict(bank.slug, state.slug, params.district) : null;
  if (!bank || !state || !district) return {};
  return districtMetadata(
    bank.name,
    state.name,
    district.name,
    bank.slug,
    state.slug,
    district.slug,
    district.branchCount
  );
}

export default async function DistrictPage({ params }: PageProps) {
  const bank = await getBank(params.bank);
  if (!bank) notFound();
  const state = await getState(bank.slug, params.state);
  if (!state) notFound();
  const district = await getDistrict(bank.slug, state.slug, params.district);
  if (!district) notFound();

  const branches = await getBranchesForDistrict(bank.slug, state.slug, district.slug);
  const crumbs = breadcrumbSchema([
    { name: 'Home', path: [] },
    { name: bank.name, path: [bank.slug] },
    { name: state.name, path: [bank.slug, state.slug] },
    { name: district.name, path: [bank.slug, state.slug, district.slug] },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={crumbs} />
      <Breadcrumbs
        items={[
          { name: bank.name, href: `/${bank.slug}` },
          { name: state.name, href: `/${bank.slug}/${state.slug}` },
          { name: district.name, href: `/${bank.slug}/${state.slug}/${district.slug}` },
        ]}
      />

      <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        {bank.name} Branches in {district.name}, {state.name}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-500">
        {branches.length} {bank.name} branch{branches.length === 1 ? '' : 'es'} found in{' '}
        {district.name}. Select a branch to view its IFSC code, MICR code, and address.
      </p>

      <div className="mt-8 space-y-3">
        {branches.map((branch) => (
          <Link
            key={branch.ifsc}
            href={`/${bank.slug}/${state.slug}/${district.slug}/${branch.branchSlug}`}
            className="flex flex-col justify-between gap-2 rounded-xl border border-ink-200 bg-white p-4 transition hover:border-trust-300 hover:shadow-card sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-2.5">
              <Landmark size={16} className="text-trust-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">{branch.branch}</p>
                <p className="text-xs text-ink-400">{branch.address}</p>
              </div>
            </div>
            <span className="self-start rounded-md bg-ink-100 px-2.5 py-1 font-mono text-xs font-semibold text-ink-700 sm:self-center">
              {branch.ifsc}
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
