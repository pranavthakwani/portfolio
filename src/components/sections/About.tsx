'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { HeroVisual } from '@/components/hero/HeroVisual';
import { profile } from '@/lib/data/profile';

const STATS = [
  { value: '150+', label: 'hrs/month saved' },
  { value: '85%',  label: 'research effort reduced' },
  { value: '80%',  label: 'customer queries automated' },
  { value: '3',    label: 'AI systems in production' },
];

export function About() {
  return (
    <SectionWrapper id="about" background="white" withDivider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

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
              <p key={i} className="text-sm text-ink-700 leading-relaxed">
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
                <span className="block font-accent text-3xl font-bold text-ink-900 mb-0.5">
                  {value}
                </span>
                <span className="text-xs text-ink-600 font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — animated photo composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
