'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

// Omit DOM animation event handlers that conflict with Framer Motion's types
type ButtonHTMLProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDragEnd' | 'onDrag'
>;

interface ButtonProps extends ButtonHTMLProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<Variant, string> = {
  primary:
    'bg-purple-500 text-white hover:bg-purple-600 shadow-soft hover:shadow-soft-md',
  secondary:
    'bg-paper-200 text-ink-700 hover:bg-paper-300 shadow-soft hover:shadow-soft-md',
  ghost:
    'bg-transparent text-ink-600 hover:bg-paper-200 hover:text-ink-900',
  outline:
    'bg-transparent border border-ink-200 text-ink-700 hover:border-ink-300 hover:bg-paper-200',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3 rounded-2xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    disabled,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      whileHover={isDisabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={isDisabled ? {}  : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-3.5 w-3.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </motion.button>
  );
});
