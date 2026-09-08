import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-trust-700 text-white">
            <Landmark size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-900">
            IFSC Finder
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-base font-semibold text-ink-600 sm:flex">
          <Link href="/" className="transition hover:text-trust-700">
            Search
          </Link>
          <Link href="/about" className="transition hover:text-trust-700">
            About Us
          </Link>
          <Link href="/contact" className="transition hover:text-trust-700">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
