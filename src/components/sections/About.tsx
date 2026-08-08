'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { HeroVisual } from '@/components/hero/HeroVisual';
import { profile } from '@/lib/data/profile';

export function About() {
  return (
    <SectionWrapper id="about" background="white" withDivider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeading
            eyebrow="About me"
            heading={<>A little more <UnderlineAccent color="purple">human</UnderlineAccent></>}
            className="mb-7"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="max-w-lg"
          >
            {profile.bio.map((paragraph) => (
              <p key={paragraph} className="text-base text-ink-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
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
