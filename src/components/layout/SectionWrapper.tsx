import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/ui/Container';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'paper' | 'paper-dark' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withDivider?: boolean;
}

const backgrounds: Record<NonNullable<SectionWrapperProps['background']>, string> = {
  white:      'bg-white',
  paper:      'bg-paper-100',
  'paper-dark': 'bg-paper-200',
  none:       '',
};

/**
 * Consistent vertical rhythm wrapper for all page sections.
 * Sets uniform padding, max-width, and optional background.
 */
export function SectionWrapper({
  id,
  children,
  className,
  containerClassName,
  background = 'paper',
  containerSize = 'xl',
  withDivider = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative section-py',
        backgrounds[background],
        withDivider && 'section-divider',
        className
      )}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
