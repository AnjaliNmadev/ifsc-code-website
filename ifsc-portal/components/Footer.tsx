import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators';
import { GUIDE_CATEGORIES, getGuidesByCategory } from '@/lib/guides';
import { RATE_CITIES } from '@/lib/metal-rates';

export default function Footer() {
  const year = new Date().getFullYear();
  const ipoGuides = getGuidesByCategory('ipo');
  // "Market Trackers" gets its own dedicated footer column below, so the
  // generic category loop only renders the remaining guide categories.
  const footerGuideCategories = GUIDE_CATEGORIES.filter((cat) => cat.key !== 'ipo');

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold text-white">IFSC Finder</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
              A free directory of Indian bank branch IFSC and MICR codes, built for quick lookups
              and easy sharing.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Calculators</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              {CALCULATORS.map((calc) => (
                <li key={calc.slug}>
                  <Link href={`/calculators/${calc.slug}`} className="transition hover:text-trust-400">
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerGuideCategories.map((cat) => (
            <div key={cat.key}>
              <p className="text-sm font-semibold text-white">{cat.label}</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                {getGuidesByCategory(cat.key).map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="transition hover:text-trust-400">
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-semibold text-white">Market Trackers</p>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Gold Prices
            </p>
            <ul className="mt-2 space-y-2 text-sm text-gray-400">
              {RATE_CITIES.map((city) => (
                <li key={`gold-${city.slug}`}>
                  <Link href={`/gold-rate-${city.slug}`} className="transition hover:text-trust-400">
                    Gold Rate {city.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Silver Prices
              </p>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                {RATE_CITIES.map((city) => (
                  <li key={`silver-${city.slug}`}>
                    <Link href={`/silver-rate-${city.slug}`} className="transition hover:text-trust-400">
                      Silver Rate {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">IPO</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-400">
                {ipoGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={`/guides/${guide.slug}`} className="transition hover:text-trust-400">
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Site</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/guides" className="transition hover:text-trust-400">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-trust-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-trust-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy-policy" className="transition hover:text-trust-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="transition hover:text-trust-400">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">
          <p>
            © {year} IFSC Finder. Bank branch data is aggregated from public sources for
            informational purposes and may not always reflect the latest changes. Always confirm
            critical details directly with your bank before making a transfer.
          </p>
        </div>
      </div>
    </footer>
  );
}
