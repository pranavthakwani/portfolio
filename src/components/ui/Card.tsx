'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'li';
}

/**
 * Base card — white surface, soft shadow, rounded-2xl.
 * hoverable=true adds a subtle lift animation on hover.
 */
export function Card({
  children,
  className,
  hoverable = false,
  onClick,
  as: Tag = 'div',
}: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(26,25,25,0.10), 0 2px 4px rgba(26,25,25,0.04)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        onClick={onClick}
        className={cn(
          'bg-white border border-ink-100 rounded-2xl shadow-soft transition-colors duration-200',
          onClick && 'cursor-pointer',
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Tag
      onClick={onClick}
      className={cn(
        'bg-white border border-ink-100 rounded-2xl shadow-soft',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Tag>
  );
}
