import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cool navy-slate neutrals — a step deeper and more saturated than a
        // default grey scale, to read as "financial ledger" rather than
        // generic SaaS grey.
        ink: {
          900: '#0E1424',
          800: '#1E273B',
          700: '#33405A',
          600: '#4E5A72',
          500: '#707C94',
          400: '#98A2B8',
          300: '#C3CBDC',
          200: '#DFE4EE',
          100: '#EEF1F6',
          50: '#F7F8FB',
          0: '#FFFFFF',
        },
        // Primary brand — deep, saturated navy blue (bank-vault blue) in
        // place of the old generic emerald/teal SaaS green.
        trust: {
          900: '#0B1D57',
          800: '#122C82',
          700: '#1739A8',
          600: '#1E4FD1',
          500: '#2F6BEF',
          400: '#5A8FFA',
          300: '#8AB2FF',
          200: '#B9D2FF',
          100: '#DCE8FF',
          50: '#EEF4FF',
        },
        // Warm gold accent — used sparingly for badges/highlights to give
        // the navy palette a premium, currency-adjacent counterpoint.
        teal: {
          700: '#96691E',
          600: '#B8842A',
          500: '#C99A3B',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
