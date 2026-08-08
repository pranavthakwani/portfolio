'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile } from '@/lib/data/profile';

export function HeroVisual() {
  return (
    <div className="relative isolate flex items-center justify-center py-14 lg:py-20">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[120%] max-w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-[44%] opacity-80 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 25% 30%, rgba(96,165,250,0.48) 0, rgba(96,165,250,0.18) 27%, transparent 52%), radial-gradient(circle at 76% 35%, rgba(251,191,36,0.42) 0, rgba(251,191,36,0.16) 29%, transparent 54%), radial-gradient(circle at 52% 82%, rgba(74,222,128,0.46) 0, rgba(74,222,128,0.16) 30%, transparent 56%)',
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={{ rotate: [2, -2, 2], scale: [1, 1.035, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -z-10 h-[86%] w-[84%] max-w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-[42%_58%_48%_52%/58%_42%_58%_42%] border-2 border-purple-300/35 bg-white/15"
      />

      <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[23rem] lg:w-[23rem]">
        <div className="absolute -inset-2 rounded-[2.7rem] bg-white/45 shadow-[0_28px_80px_rgba(15,23,42,0.16)] backdrop-blur-sm" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] border-2 border-white/80 bg-paper-100">
          <Image
            src={profile.photo}
            alt={`${profile.name} — ${profile.title}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 368px"
            quality={95}
            priority
          />
        </div>
      </div>
    </div>
  );
}