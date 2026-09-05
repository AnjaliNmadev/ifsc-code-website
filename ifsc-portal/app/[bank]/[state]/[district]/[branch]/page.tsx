import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import BranchDetailsCard from '@/components/BranchDetailsCard';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import {
  getAllBanks,
  getBank,
  getStatesForBank,
  getState,
  getDistrictsForState,
  getDistrict,
  getBranchesForDistrict,
  getBranch,
} from '@/lib/data';
import { branchMetadata } from '@/lib/seo';
import { breadcrumbSchema, bankOrCreditUnionSchema } from '@/lib/schema';

interface PageProps {
  params: { bank: string; state: string; district: string; branch: string };
}

export function generateStaticParams() {
  return getAllBanks().flatMap((bank) =>
    getStatesForBank(bank.slug).flatMap((state) =>
      getDistrictsForState(bank.slug, state.slug).flatMap((district) =>
        getBranchesForDistrict(bank.slug, state.slug, district.slug).map((branch) => ({
          bank: bank.slug,
          state: state.slug,
          district: district.slug,
          branch: branch.branchSlug,
        }))
      )
    )
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const branch = getBranch(params.bank, params.state, params.district, params.branch);
  if (!branch) return {};
  return branchMetadata(branch);
}

export default function BranchPage({ params }: PageProps) {
  const bank = getBank(params.bank);
  if (!bank) notFound();
  const state = getState(bank.slug, params.state);
  if (!state) notFound();
  const district = getDistrict(bank.slug, state.slug, params.district);
  if (!district) notFound();
  const branch = getBranch(bank.slug, state.slug, district.slug, params.branch);
  if (!branch) notFound();

  const crumbs = breadcrumbSchema([
    { name: 'Home', path: [] },
    { name: bank.name, path: [bank.slug] },
    { name: state.name, path: [bank.slug, state.slug] },
    { name: district.name, path: [bank.slug, state.slug, district.slug] },
    { name: branch.branch, path: [bank.slug, state.slug, district.slug, branch.branchSlug] },
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={crumbs} />
      <JsonLd data={bankOrCreditUnionSchema(branch)} />

      <Breadcrumbs
        items={[
          { name: bank.name, href: `/${bank.slug}` },
          { name: state.name, href: `/${bank.slug}/${state.slug}` },
          { name: district.name, href: `/${bank.slug}/${state.slug}/${district.slug}` },
          {
            name: branch.branch,
            href: `/${bank.slug}/${state.slug}/${district.slug}/${branch.branchSlug}`,
          },
        ]}
      />

      <BranchDetailsCard branch={branch} />

      <div className="mt-6">
        <AdSlot variant="post-result-native" />
      </div>

      <section className="mt-8 rounded-2xl border border-ink-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-ink-900">
          About the {branch.bankName} {branch.branch} IFSC code
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          The IFSC code <span className="font-mono font-semibold">{branch.ifsc}</span> identifies
          the {branch.branch} branch of {branch.bankName} located in {branch.district},{' '}
          {branch.state}, for the purpose of electronic fund transfers such as NEFT, RTGS, and
          IMPS. You will need this code, along with the beneficiary&rsquo;s account number, to
          send money to an account held at this branch.
        </p>
      </section>
    </div>
  );
}
