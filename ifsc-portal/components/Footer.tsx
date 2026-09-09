import Link from 'next/link';
import { CALCULATOR_CATEGORIES, getCalculatorsByCategory } from '@/lib/calculators';
import { GUIDE_CATEGORIES, getGuidesByCategory } from '@/lib/guides';
import { RATE_CITIES } from '@/lib/metal-rates';

function FooterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
      <div className="mt-2 border-t border-white/10" />
      <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-gray-400">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const ipoGuides = getGuidesByCategory('ipo');
  // "Market Trackers" gets its own dedicated group below, so the generic
  // guide-category loop only renders the remaining (non-IPO) categories.
  const footerGuideCategories = GUIDE_CATEGORIES.filter((cat) => cat.key !== 'ipo');

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold text-white">IFSC Finder</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
              A free directory of Indian bank branch IFSC and MICR codes, plus free tax
              calculators, tax guides, and gold &amp; silver rate trackers.
            </p>
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
                <Link href="/calculators" className="transition hover:text-trust-400">
                  All Calculators
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

        <FooterGroup label="Calculators">
          {CALCULATOR_CATEGORIES.map((cat) => (
            <FooterColumn key={cat.key} title={cat.label}>
              {getCalculatorsByCategory(cat.key).map((calc) => (
                <li key={calc.slug}>
                  <Link href={`/calculators/${calc.slug}`} className="transition hover:text-trust-400">
                    {calc.name}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          ))}
        </FooterGroup>

        <FooterGroup label="Guides & Blogs">
          {footerGuideCategories.map((cat) => (
            <FooterColumn key={cat.key} title={cat.label}>
              {getGuidesByCategory(cat.key).map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}`} className="transition hover:text-trust-400">
                    {guide.title}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          ))}
        </FooterGroup>

        <FooterGroup label="Market Trackers">
          <FooterColumn title="Gold Prices">
            {RATE_CITIES.map((city) => (
              <li key={`gold-${city.slug}`}>
                <Link href={`/gold-rate-${city.slug}`} className="transition hover:text-trust-400">
                  Gold Rate {city.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Silver Prices">
            {RATE_CITIES.map((city) => (
              <li key={`silver-${city.slug}`}>
                <Link href={`/silver-rate-${city.slug}`} className="transition hover:text-trust-400">
                  Silver Rate {city.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="IPO">
            {ipoGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="transition hover:text-trust-400">
                  {guide.title}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </FooterGroup>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-gray-500">
          <p>
            © {year} IFSC Finder. Bank branch data is aggregated from public sources for
            informational purposes and may not always reflect the latest changes. Gold and silver
            rates are indicative and sourced from a third-party market data feed. Always confirm
            critical details directly with your bank or jeweller before transacting.
          </p>
        </div>
      </div>
    </footer>
  );
}
