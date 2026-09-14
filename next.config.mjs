/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [],
  },
  async redirects() {
    // The original 6 gold/silver city pages used a flat URL style
    // (/gold-rate-mumbai). They now live at /gold-rate/mumbai so any
    // number of cities can be added without a folder per city. These
    // redirects keep the old links working (and preserve any SEO value)
    // instead of breaking them.
    const cities = ['mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata'];
    const redirects = [];
    for (const metal of ['gold', 'silver']) {
      for (const city of cities) {
        redirects.push({
          source: `/${metal}-rate-${city}`,
          destination: `/${metal}-rate/${city}`,
          permanent: true,
        });
      }
    }
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
