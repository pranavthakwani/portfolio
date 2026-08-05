import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Clean slate — primary text (crisper than warm charcoal)
        ink: {
          DEFAULT: '#0F172A',
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Warm cream — paper/parchment backgrounds
        paper: {
          DEFAULT: '#FAF6EE',
          50:  '#FFFDF8',
          100: '#FAF6EE',
          200: '#F2EAD8',
          300: '#E8DCC8',
          400: '#DBCBB4',
        },
        // Vibrant indigo — primary brand, CTAs (confident, tech-forward)
        purple: {
          DEFAULT: '#4F46E5',
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E1B4B',
        },
        // Warm orange — CTA urgency, action, warmth (contact me NOW)
        amber: {
          DEFAULT: '#F97316',
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Emerald green — availability, positive outcomes, success
        teal: {
          DEFAULT: '#10B981',
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },

      fontFamily: {
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
        soft:         '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)',
        'soft-md':    '0 2px 4px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)',
        'soft-lg':    '0 4px 8px rgba(15,23,42,0.05), 0 20px 48px rgba(15,23,42,0.08)',
        'soft-xl':    '0 8px 16px rgba(15,23,42,0.06), 0 32px 64px rgba(15,23,42,0.10)',
        // Indigo-tinted panel shadow for chat
        'panel':      '0 0 0 1px rgba(79,70,229,0.08), 0 4px 16px rgba(15,23,42,0.06), 0 20px 60px rgba(15,23,42,0.08)',
        'card-hover': '0 8px 24px rgba(15,23,42,0.10), 0 2px 4px rgba(15,23,42,0.04)',
        // Orange glow for primary CTA
        'cta':        '0 0 0 1px rgba(249,115,22,0.15), 0 4px 20px rgba(249,115,22,0.25)',
        // Glass morphism
        'glass':      '0 4px 20px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.04)',
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
        'float-slow':    'float 6s ease-in-out infinite',
        'float-medium':  'float 4.5s ease-in-out infinite',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'spin-slow':     'spin 20s linear infinite',
        'spin-reverse':  'spin-reverse 30s linear infinite',
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
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
