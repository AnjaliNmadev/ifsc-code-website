import type { ReactNode } from 'react';
import PopularCalculatorsSidebar from '@/components/PopularCalculatorsSidebar';
import RelatedTrackers from '@/components/RelatedTrackers';

interface PageWithSidebarProps {
  children: ReactNode;
  /** Passed through to RelatedTrackers so rate pages deep-link to their city. */
  citySlug?: string;
  cityName?: string;
  current?: 'gold' | 'silver' | 'diamond';
  /** Extra cards to render below the standard two, if a page needs them. */
  extra?: ReactNode;
}

/**
 * The standard content + sidebar layout used across rate, guide and
 * calculator pages, so all of them get the same "Popular Calculators" and
 * "Related trackers" panels without each page rebuilding the grid itself.
 *
 * The sidebar is hidden below `lg` (it's supplementary navigation, not
 * content), and sticks to the top of the viewport on wide screens so it
 * stays visible while scrolling a long page.
 */
export default function PageWithSidebar({
  children,
  citySlug,
  cityName,
  current,
  extra,
}: PageWithSidebarProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <PopularCalculatorsSidebar />
          <RelatedTrackers citySlug={citySlug} cityName={cityName} current={current} />
          {extra}
        </aside>
      </div>
    </div>
  );
}
