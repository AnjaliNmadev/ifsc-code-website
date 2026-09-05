import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Zap, ListTree } from 'lucide-react';
import IfscQuickSearch from '@/components/IfscQuickSearch';
import CascadingBrowser from '@/components/CascadingBrowser';
import AdSlot from '@/components/AdSlot';
import { homeMetadata } from '@/lib/seo';
import { getAllBanks } from '@/lib/data';

export const metadata: Metadata = homeMetadata();

export default function HomePage() {
  const banks = getAllBanks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <section className="text-center lg:text-left">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-trust-50 px-3 py-1 text-xs font-semibold text-trust-700">
              <ShieldCheck size={14} /> Trusted branch data, updated regularly
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Find any Indian bank&rsquo;s IFSC code in seconds
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-ink-500 lg:mx-0">
              Search by code for an instant result, or browse bank, state, and district to locate
              a branch you don&rsquo;t have the code for yet.
            </p>
          </section>

          <section className="mt-8">
            <IfscQuickSearch />
          </section>

          <section className="mt-6">
            <CascadingBrowser />
          </section>

          <section className="mt-8">
            <AdSlot variant="post-result-native" />
          </section>

          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-ink-900">Browse popular banks</h2>
            <p className="mt-1 text-sm text-ink-500">
              Jump straight into a bank&rsquo;s full state-by-state branch directory.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {banks.map((bank) => (
                <Link
                  key={bank.slug}
                  href={`/${bank.slug}`}
                  className="rounded-xl border border-ink-200 bg-white p-4 transition hover:border-trust-300 hover:shadow-card"
                >
                  <p className="text-sm font-semibold text-ink-900">{bank.name}</p>
                  <p className="mt-1 text-xs text-ink-400">
                    {bank.branchCount} branch{bank.branchCount === 1 ? '' : 'es'} listed
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <Zap size={18} className="text-trust-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink-900">Instant lookups</h3>
              <p className="mt-1 text-sm text-ink-500">
                Cached results mean repeat searches load immediately, even offline.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <ListTree size={18} className="text-trust-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink-900">Full directory</h3>
              <p className="mt-1 text-sm text-ink-500">
                Every branch has its own page organized by bank, state, and district.
              </p>
            </div>
            <div className="rounded-xl border border-ink-200 bg-white p-5">
              <ShieldCheck size={18} className="text-trust-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink-900">Always verify</h3>
              <p className="mt-1 text-sm text-ink-500">
                We recommend confirming details with your bank before an important transfer.
              </p>
            </div>
          </section>
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
