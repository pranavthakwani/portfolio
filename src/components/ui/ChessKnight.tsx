'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile } from '@/lib/data/profile';

export function ChessKnight() {
  return (
    <motion.a
      href={profile.social.chess}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chess.com profile: pranav_thakwani"
      title="Chess.com · pranav_thakwani"
      whileHover={{ scale: 1.1, rotate: -6 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="group fixed bottom-6 right-6 z-40 hidden rounded-[18px] shadow-soft-md transition-shadow hover:shadow-soft-lg lg:block"
    >
      <span className="pointer-events-none absolute bottom-1/2 right-[calc(100%+0.75rem)] translate-x-2 translate-y-1/2 whitespace-nowrap rounded-lg bg-ink-900 px-3 py-1.5 font-accent text-base font-bold text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        pranav_thakwani
      </span>
      <Image
        src="/chess-icon.png"
        alt="Chess.com — pranav_thakwani"
        width={52}
        height={52}
        priority
        className="block h-[52px] w-[52px] rounded-[18px] object-cover"
      />
    </motion.a>
  );
}