import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Zap, ListTree, ArrowRight } from 'lucide-react';
import IfscQuickSearch from '@/components/IfscQuickSearch';
import CascadingBrowser from '@/components/CascadingBrowser';
import AdSlot from '@/components/AdSlot';
import IfscEducationContent from '@/components/IfscEducationContent';
import BankBadge from '@/components/BankBadge';
import { homeMetadata } from '@/lib/seo';
import { getAllBanks } from '@/lib/data';
import { pickPopularBanks } from '@/lib/utils';

export const metadata: Metadata = homeMetadata();
export const revalidate = 3600; // refresh the bank list at most once an hour

export default async function HomePage() {
  const banks = await getAllBanks();
  const topBanks = pickPopularBanks(banks, 12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <section className="text-center lg:text-left">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-trust-50 px-4 py-1.5 text-sm font-semibold text-trust-700">
              <ShieldCheck size={16} /> Trusted branch data, updated regularly
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
              Find any Indian bank&rsquo;s IFSC code in seconds
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600 lg:mx-0">
              Search by code for an instant result, or browse bank, state, and district to locate
              a branch you don&rsquo;t have the code for yet.
            </p>
          </section>

          <section className="mt-9">
            <IfscQuickSearch />
          </section>

          <section className="mt-6">
            <CascadingBrowser />
          </section>

          <section className="mt-8">
            <AdSlot variant="post-result-native" />
          </section>

          <section className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
                Popular Banks
              </h2>
              <span className="hidden text-sm font-medium text-ink-400 sm:inline">
                {banks.length.toLocaleString('en-IN')} banks listed
              </span>
            </div>
            <p className="mt-2 text-base text-ink-500">
              Jump straight into a bank&rsquo;s full state-by-state branch directory.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topBanks.map((bank) => (
                <Link
                  key={bank.slug}
                  href={`/${bank.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-trust-400 hover:shadow-lg"
                >
                  <BankBadge name={bank.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-base font-bold text-ink-900">
                      {bank.name}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-ink-500">
                      {bank.branchCount.toLocaleString('en-IN')} branch
                      {bank.branchCount === 1 ? '' : 'es'}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="shrink-0 text-ink-300 transition group-hover:translate-x-1 group-hover:text-trust-600"
                  />
                </Link>
              ))}
            </div>
            {banks.length === 0 && (
              <p className="mt-4 text-base text-ink-400">
                Bank list will appear here once the database is connected — see
                /supabase/schema.sql.
              </p>
            )}
            {banks.length > 12 && (
              <p className="mt-6 text-base text-ink-500">
                Looking for a different bank? Use the browse tool above — it lists every one of
                the {banks.length.toLocaleString('en-IN')} banks in the directory.
              </p>
            )}
          </section>

          <section className="mt-16 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <Zap size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Instant lookups</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                Cached results mean repeat searches load immediately, even offline.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <ListTree size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Full directory</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                Every branch has its own page organized by bank, state, and district.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <ShieldCheck size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Always verify</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                We recommend confirming details with your bank before an important transfer.
              </p>
            </div>
          </section>

          <IfscEducationContent />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <AdSlot variant="sidebar-sticky" />
          </div>
        </aside>
      </div>
    </div>
  );
}
