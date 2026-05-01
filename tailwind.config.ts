import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        cocoon: {
          yellow: '#FCD209',
          'yellow-hover': '#E8C008',
          'yellow-soft': '#FFF090',
          cream: '#FFF8E1',
          ink: '#1F2421',
          'ink-2': '#2C332E',
          graphite: '#4A524D',
          mid: '#7A8079',
          mist: '#C8C9C2',
          border: '#EAE7DC',
          bg: '#FAFAF7',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cocoon-md': '0 1px 2px rgba(31,36,33,0.04), 0 8px 24px rgba(31,36,33,0.06)',
        'cocoon-lg': '0 4px 12px rgba(31,36,33,0.06), 0 24px 48px rgba(31,36,33,0.08)',
      },
    },
  },
  plugins: [forms],
};

export default config;
