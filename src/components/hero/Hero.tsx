'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { HeroIntro } from './HeroIntro';
import { profile } from '@/lib/data/profile';

/**
 * Hero — full-bleed first impression.
 *
 * Layout:
 * - Background (full viewport): a cinematic reveal — the person slides in from the left,
 *   settling on the right. This represents "Pranav entering the scene."
 * - Foreground (overlaid, left side): intro text, name, CTA.
 *
 * When a photo exists at /public/pranav.jpg, it fills the right background.
 * The gradient mask ensures text on the left is always readable.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FAFAF7' }}
    >
      {/* ── Background: person walking in from left, stopping at right ─── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">

        {/* Paper grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Animated right panel — person slides in from stage-left */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[58%]"
          initial={{ clipPath: 'inset(0 100% 0 0 round 0px)' }}
          animate={{ clipPath: 'inset(0 0% 0 0 round 0px)' }}
          transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Ambient gradient blobs */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[80%] h-[80%] bg-purple-100/60 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 right-1/4 w-[60%] h-[60%] bg-amber-100/50 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 right-1/3 w-[50%] h-[50%] bg-teal-100/40 rounded-full blur-3xl"
          />

          {/* Photo — fills the right panel when it exists */}
          <div className="absolute inset-0 flex items-end justify-center lg:justify-end lg:pr-8">
            <div className="relative w-full max-w-lg h-[90%] rounded-tl-[2.5rem] overflow-hidden">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 50vw, 600px"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '0';
                }}
              />
              {/* Fallback initials when no photo */}
              <div className="absolute inset-0 flex items-center justify-center select-none">
                <span
                  className="font-extrabold text-[12rem] leading-none text-purple-200/50 font-sans"
                  aria-hidden="true"
                >
                  PT
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Left gradient mask — ensures text readability over the background */}
        <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#FAFAF7] via-[#FAFAF7]/95 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAFAF7]/60 to-transparent" />
      </div>

      {/* ── Foreground: intro text — overlaid on the left ────────────── */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center py-20 lg:py-0">
        <div className="w-full max-w-xl lg:max-w-2xl">
          <HeroIntro />
        </div>
      </Container>
    </section>
  );
}
