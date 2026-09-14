import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 text-ink-400">
        <SearchX size={26} />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-sm text-ink-500">
        We couldn&rsquo;t find a bank, state, district, or branch at this address. It may have
        been renamed, or the code you typed doesn&rsquo;t match any listed branch.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-trust-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-trust-800"
      >
        Search for an IFSC code
      </Link>
    </div>
  );
}
