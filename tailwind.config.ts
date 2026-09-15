import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        brand: {
          dark: '#0f172a',
          accent: '#2563eb',
          gold: '#f59e0b',
          danger: '#ef4444',
          whatsapp: '#25D366',
          telegram: '#229ED9',
        }
      },
      fontFamily: {
        sans: ['Hind Siliguri', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        glow: '0 0 15px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
};

export default config;
