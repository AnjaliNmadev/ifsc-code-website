import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { websiteSchema } from '@/lib/schema';
import { SITE_NAME, SITE_URL } from '@/lib/utils';

const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const displayFont = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s`,
  },
  description:
    'Instant IFSC and MICR code lookup for every Indian bank branch, plus a full state and district-wise directory.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Once you set up Google Search Console, you can add a `verification: { google: '...' }`
  // field here — it's optional and the site works fully without it.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        {/*
          AdSense loader — uncomment and set your publisher ID once approved.
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
        */}
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
          <AdSlot variant="top-banner" />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
