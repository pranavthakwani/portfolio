import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'purple' | 'teal' | 'amber' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-paper-300 text-ink-600 border border-paper-400',
  purple:  'bg-purple-50 text-purple-600 border border-purple-100',
  teal:    'bg-teal-50 text-teal-600 border border-teal-100',
  amber:   'bg-amber-50 text-amber-600 border border-amber-100',
  outline: 'bg-transparent text-ink-500 border border-ink-200',
};

const sizes = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function Badge({
  children,
  variant = 'default',
  className,
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
