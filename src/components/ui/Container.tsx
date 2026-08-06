import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses: Record<NonNullable<ContainerProps['size']>, string> = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-6xl',
  xl:   'max-w-screen-xl',   // 1280px — fills the screen properly
  full: 'max-w-none',
};

export function Container({
  children,
  className,
  as: Tag = 'div',
  size = 'xl',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-6 sm:px-10 lg:pl-16 lg:pr-14',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
