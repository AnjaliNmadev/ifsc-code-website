import type { Metadata } from 'next';
import { ShieldCheck, Globe2, ListChecks } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SwiftQuickSearch from '@/components/SwiftQuickSearch';
import SwiftCascadingBrowser from '@/components/SwiftCascadingBrowser';
import AdSlot from '@/components/AdSlot';
import SwiftEducationContent from '@/components/SwiftEducationContent';
import { swiftFinderMetadata } from '@/lib/seo';

export const metadata: Metadata = swiftFinderMetadata();

export default function SwiftCodeFinderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <Breadcrumbs items={[{ name: 'SWIFT Code Finder', href: '/swift-code-finder' }]} />

          <section className="text-center lg:text-left">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-trust-50 px-4 py-1.5 text-sm font-semibold text-trust-700">
              <Globe2 size={16} /> For international wire transfers
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl">
              Check your SWIFT code, instantly
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600 lg:mx-0">
              Enter a SWIFT/BIC code to validate its format and see its bank, country, and branch
              breakdown — or enter your IFSC code, or browse by bank, state and district, to find
              your branch&rsquo;s SWIFT code for international transfers.
            </p>
          </section>

          <section className="mt-9">
            <SwiftQuickSearch />
          </section>

          <section className="mt-6">
            <SwiftCascadingBrowser />
          </section>

          <section className="mt-8">
            <AdSlot variant="post-result-native" />
          </section>

          <section className="mt-14 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <ListChecks size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Instant format check</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                Validates the 8 or 11-character structure and decodes it, no network round-trip
                needed.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <Globe2 size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Works worldwide</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                Recognizes the country and location code for any bank&rsquo;s SWIFT/BIC, not just
                Indian banks.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <ShieldCheck size={22} className="text-trust-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Always verify</h3>
              <p className="mt-1.5 text-base leading-relaxed text-ink-500">
                We recommend confirming the SWIFT code with your bank before an international
                transfer.
              </p>
            </div>
          </section>

          <SwiftEducationContent />
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
