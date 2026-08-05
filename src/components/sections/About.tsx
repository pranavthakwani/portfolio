'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { profile } from '@/lib/data/profile';

const STATS = [
  { value: '4+',   label: 'Years engineering' },
  { value: '10k+', label: 'Daily RAG queries served' },
  { value: '3',    label: 'Production RAG systems' },
  { value: '85%',  label: 'Avg manual work eliminated' },
];

export function About() {
  return (
    <SectionWrapper id="about" background="white" withDivider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

        {/* Left — text */}
        <div>
          <SectionHeading
            eyebrow="About me"
            heading={<>The person behind <UnderlineAccent color="purple">the systems</UnderlineAccent></>}
            className="mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {profile.bio.map((para, i) => (
              <p key={i} className="text-sm text-ink-500 leading-relaxed">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="p-4 rounded-2xl bg-paper-200 border border-paper-300"
              >
                <span className="block text-2xl font-extrabold text-ink-900 tracking-tight mb-0.5">
                  {value}
                </span>
                <span className="text-xs text-ink-400 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — photo + accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          {/* Photo frame */}
          <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-paper-200">
            <Image
              src={profile.photo}
              alt={`${profile.name} — ${profile.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 400px"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper-200/60 to-transparent pointer-events-none" />
          </div>

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="absolute -bottom-5 -left-4 sm:left-4 bg-white border border-ink-100 shadow-soft-md rounded-2xl px-4 py-3 flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-xs font-semibold text-ink-800">{profile.title}</span>
            </div>
            <span className="text-xs text-ink-400">· {profile.location}</span>
          </motion.div>

          {/* Decorative background blob */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-purple-50/60 blur-2xl pointer-events-none"
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
