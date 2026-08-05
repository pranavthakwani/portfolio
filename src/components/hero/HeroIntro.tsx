'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, FileText } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { cn } from '@/lib/utils/cn';

const socialIcons = [
  { href: profile.social.github,   Icon: Github,   label: 'GitHub' },
  { href: profile.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  { href: profile.social.twitter,  Icon: Twitter,  label: 'Twitter' },
  { href: profile.social.resume,   Icon: FileText, label: 'Resume' },
].filter((s): s is typeof s & { href: string } => !!s.href);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroIntro() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-center h-full"
    >
      {/* Profile photo */}
      <motion.div variants={item} className="mb-8">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-50 shadow-soft-md" />
          <Image
            src={profile.photo}
            alt={`${profile.name}'s portrait`}
            fill
            className="rounded-2xl object-cover"
            sizes="(max-width: 640px) 80px, 96px"
            priority
            // If photo doesn't exist yet, show initials fallback via onError
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Initials fallback — shown when photo is missing */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 text-xl font-bold text-purple-600 select-none"
            style={{ display: 'none' }}
          >
            {profile.name[0]}
          </span>
        </div>
      </motion.div>

      {/* Availability indicator */}
      <motion.div variants={item} className="flex items-center gap-2 mb-5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
        </span>
        <span className="text-xs font-medium text-teal-600 tracking-wide">
          {profile.availabilityNote}
        </span>
      </motion.div>

      {/* Name + tagline */}
      <motion.div variants={item}>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-[1.08] tracking-tight mb-3">
          Hi, I&apos;m{' '}
          <UnderlineAccent color="amber">
            {profile.name}
          </UnderlineAccent>
          .
        </h1>
        <p className="text-base sm:text-lg font-medium text-ink-500 leading-relaxed mb-6 max-w-sm">
          {profile.tagline}
        </p>
      </motion.div>

      {/* Bio — first paragraph only in the hero */}
      <motion.div variants={item}>
        <p className="text-sm text-ink-400 leading-relaxed mb-8 max-w-xs">
          {profile.bio[0]}
        </p>
      </motion.div>

      {/* Social links */}
      <motion.div variants={item} className="flex items-center gap-3 mb-10">
        {socialIcons.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={label !== 'Resume' ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl border border-ink-100',
              'text-ink-400 hover:text-ink-900 hover:border-ink-300 hover:shadow-soft',
              'bg-white transition-all duration-200'
            )}
          >
            <Icon size={15} />
          </a>
        ))}
      </motion.div>

      {/* Scroll cue — gives visitors who prefer not to type an obvious next step */}
      <motion.button
        variants={item}
        onClick={() => {
          const el = document.getElementById('how-it-works');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs font-medium text-ink-300 hover:text-ink-600 transition-colors duration-200 cursor-pointer group w-fit"
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center justify-center w-7 h-7 rounded-full border border-ink-100 group-hover:border-ink-300 transition-colors"
        >
          <ArrowDown size={12} />
        </motion.span>
        or scroll to see my work
      </motion.button>
    </motion.div>
  );
}
