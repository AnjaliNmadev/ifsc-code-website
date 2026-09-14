import Link from 'next/link';
import { ChevronDown, Landmark } from 'lucide-react';
import { GUIDE_CATEGORIES, getGuidesByCategory } from '@/lib/guides';

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
          <Link href="/calculators" className="transition hover:text-trust-700">
            Calculators
          </Link>

          <div className="group relative">
            <Link
              href="/guides"
              className="flex items-center gap-1 py-2 transition hover:text-trust-700"
            >
              Guides
              <ChevronDown
                size={15}
                strokeWidth={2.5}
                className="transition duration-200 group-hover:rotate-180"
              />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 w-[620px] -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-6 rounded-2xl border border-ink-200 bg-white p-6 shadow-lg">
                {GUIDE_CATEGORIES.map((cat) => {
                  const guides = getGuidesByCategory(cat.key);
                  return (
                    <div key={cat.key}>
                      <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
                        {cat.label}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {guides.map((guide) => (
                          <li key={guide.slug}>
                            <Link
                              href={`/guides/${guide.slug}`}
                              className="text-sm font-medium text-ink-600 transition hover:text-trust-700"
                            >
                              {guide.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

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
