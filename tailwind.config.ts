import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Warm charcoal — primary text
        ink: {
          DEFAULT: '#1A1919',
          50:  '#F6F6F7',
          100: '#EDEDEF',
          200: '#D5D5DA',
          300: '#ABABB6',
          400: '#7E7E90',
          500: '#5C5C70',
          600: '#47475C',
          700: '#38384A',
          800: '#2D2D3C',
          900: '#1A1919',
          950: '#0E0E16',
        },
        // Warm off-white — backgrounds
        paper: {
          DEFAULT: '#FAFAF8',
          50:  '#FFFFFF',
          100: '#FAFAF8',
          200: '#F4F3F0',
          300: '#EAE9E4',
          400: '#D8D6D0',
        },
        // Muted purple — primary accent, CTAs
        purple: {
          DEFAULT: '#6654A3',
          50:  '#F2EFFA',
          100: '#E4DFF5',
          200: '#C9BEEB',
          300: '#A895DC',
          400: '#8A74C9',
          500: '#6654A3',
          600: '#554494',
          700: '#40337A',
          800: '#2D235E',
          900: '#1A1440',
        },
        // Warm amber — highlight strokes, accent marks
        amber: {
          DEFAULT: '#E07B39',
          50:  '#FDF5EE',
          100: '#FBEADB',
          200: '#F5CAA2',
          300: '#EFA96B',
          400: '#E88E4A',
          500: '#E07B39',
          600: '#CC6229',
          700: '#A84D21',
          800: '#7B3719',
          900: '#4E230F',
        },
        // Soft teal — secondary accent
        teal: {
          DEFAULT: '#2F9C8E',
          50:  '#EBFAF8',
          100: '#D3F4F1',
          200: '#A5E5DF',
          300: '#6DD0C8',
          400: '#46BAB1',
          500: '#2F9C8E',
          600: '#268175',
          700: '#1D645B',
          800: '#144540',
          900: '#0A2926',
        },
      },

      fontFamily: {
        // Loaded via next/font in layout.tsx; these vars are injected on <html>
        sans:   ['var(--font-sans)',   'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'cursive'],
        mono:   ['var(--font-mono)',   'Consolas', 'monospace'],
      },

      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        'display-lg':  ['3rem',     { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em',  fontWeight: '700' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }],
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      boxShadow: {
        // Layered, soft — nothing looks "material" or harsh
        soft:       '0 1px 2px rgba(26,25,25,0.04), 0 4px 12px rgba(26,25,25,0.04)',
        'soft-md':  '0 2px 4px rgba(26,25,25,0.04), 0 8px 24px rgba(26,25,25,0.06)',
        'soft-lg':  '0 4px 8px rgba(26,25,25,0.05), 0 20px 48px rgba(26,25,25,0.08)',
        'soft-xl':  '0 8px 16px rgba(26,25,25,0.06), 0 32px 64px rgba(26,25,25,0.10)',
        // For the chat panel — slightly purple-tinted glow
        'panel':    '0 0 0 1px rgba(102,84,163,0.08), 0 4px 16px rgba(26,25,25,0.06), 0 20px 60px rgba(26,25,25,0.08)',
        // Hover lift on cards
        'card-hover': '0 8px 24px rgba(26,25,25,0.10), 0 2px 4px rgba(26,25,25,0.04)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '76': '19rem',
        '88': '22rem',
        '100': '25rem',
        '108': '27rem',
        '120': '30rem',
        '128': '32rem',
      },

      animation: {
        'cursor-blink':  'cursor-blink 1s step-end infinite',
        'typing-dot-1':  'typing-dot 1.4s ease-in-out 0ms infinite',
        'typing-dot-2':  'typing-dot 1.4s ease-in-out 160ms infinite',
        'typing-dot-3':  'typing-dot 1.4s ease-in-out 320ms infinite',
        'fade-in-up':    'fade-in-up 0.5s ease-out forwards',
        'scale-in':      'scale-in 0.3s ease-out forwards',
      },

      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)',    opacity: '0.35' },
          '30%':            { transform: 'translateY(-5px)', opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
