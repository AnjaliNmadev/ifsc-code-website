import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold text-ink-900">IFSC Finder</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">
              A free directory of Indian bank branch IFSC and MICR codes, built for quick lookups
              and easy sharing.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-800">Calculators</p>
            <ul className="mt-2 space-y-2 text-sm text-ink-500">
              {CALCULATORS.map((calc) => (
                <li key={calc.slug}>
                  <Link href={`/calculators/${calc.slug}`} className="hover:text-trust-700">
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-800">Site</p>
            <ul className="mt-2 space-y-2 text-sm text-ink-500">
              <li>
                <Link href="/about" className="hover:text-trust-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-trust-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-800">Legal</p>
            <ul className="mt-2 space-y-2 text-sm text-ink-500">
              <li>
                <Link href="/privacy-policy" className="hover:text-trust-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-trust-700">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-ink-200 pt-6 text-xs text-ink-400">
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
