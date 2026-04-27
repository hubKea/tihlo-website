import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        'paper-3': 'var(--paper-3)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        red: 'var(--red)',
        'red-2': 'var(--red-2)',
      },
      maxWidth: {
        site: '1360px',
      },
      letterSpacing: {
        widest: '0.22em',
        wider: '0.16em',
      },
      lineHeight: {
        tight: '0.86',
        snug: '0.96',
      },
    },
  },
  plugins: [],
};

export default config;
