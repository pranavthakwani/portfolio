import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Sophisticated dark — primary text
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
        // Blue — Security, dependability, professionalism (primary brand)
        purple: {
          DEFAULT: '#2563EB',
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Yellow/golden — Optimism, creativity, energy (accent marks, highlights)
        amber: {
          DEFAULT: '#F59E0B',
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Green — Health, growth, calm, positive outcomes (availability, success)
        teal: {
          DEFAULT: '#16A34A',
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        // Red — Urgency, passion (CTA buttons, contact)
        red: {
          DEFAULT: '#DC2626',
          50:  '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Orange — Innovation, friendliness, approachability (AI/chat elements)
        orange: {
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
        // Red glow for urgent CTA
        'cta':        '0 0 0 1px rgba(220,38,38,0.15), 0 4px 20px rgba(220,38,38,0.25)',
        // Blue glow for brand elements
        'cta-blue':   '0 0 0 1px rgba(37,99,235,0.15), 0 4px 20px rgba(37,99,235,0.20)',
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
