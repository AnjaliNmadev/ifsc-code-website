import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators';
import { getGuidesByCategory } from '@/lib/guides';

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-ink-800">{title}</p>
      <div className="mt-2 border-t border-ink-200" />
      <ul className="mt-3 space-y-2 text-sm text-ink-500">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-trust-700">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A footer group that itself contains one or more sub-lists — used for
 * "Market Trackers", which nests "Gold Prices" and "Silver Prices" under
 * one umbrella heading, each with its own heading + divider line.
 */
function FooterGroup({
  title,
  subgroups,
}: {
  title: string;
  subgroups: { subtitle: string; links: { label: string; href: string }[] }[];
}) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-ink-800">{title}</p>
      <div className="mt-2 border-t border-ink-200" />
      <div className="mt-3 space-y-4">
        {subgroups.map((group) => (
          <div key={group.subtitle}>
            <p className="text-sm font-bold text-ink-700">{group.subtitle}</p>
            <div className="mt-1.5 border-t border-ink-100" />
            <ul className="mt-2 space-y-2 text-sm text-ink-500">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-trust-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-lg font-extrabold text-ink-900">IFSC Finder</p>
            <div className="mt-2 border-t border-ink-200" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
              A free directory of Indian bank branch IFSC and MICR codes, built for quick lookups
              and easy sharing.
            </p>
          </div>

          <FooterColumn
            title="Calculators"
            links={CALCULATORS.map((calc) => ({
              label: calc.name,
              href: `/calculators/${calc.slug}`,
            }))}
          />

          <FooterColumn
            title="Guides"
            links={getGuidesByCategory('tax')
              .concat(getGuidesByCategory('documents'), getGuidesByCategory('payments'))
              .map((guide) => ({
                label: guide.title,
                href: `/guides/${guide.slug}`,
              }))}
          />

          <FooterGroup
            title="Market Trackers"
            subgroups={[
              {
                subtitle: 'Gold Prices',
                links: getGuidesByCategory('gold').map((guide) => ({
                  label: guide.title,
                  href: `/guides/${guide.slug}`,
                })),
              },
              {
                subtitle: 'Silver Prices',
                links: getGuidesByCategory('silver').map((guide) => ({
                  label: guide.title,
                  href: `/guides/${guide.slug}`,
                })),
              },
            ]}
          />

          <FooterColumn
            title="IPO"
            links={getGuidesByCategory('ipo').map((guide) => ({
              label: guide.title,
              href: `/guides/${guide.slug}`,
            }))}
          />

          <FooterColumn
            title="Site"
            links={[
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Disclaimer', href: '/disclaimer' },
            ]}
          />
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
