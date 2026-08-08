'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { profile } from '@/lib/data/profile';

export function Contact() {
  return (
    <SectionWrapper id="contact" background="paper" withDivider>
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="Get in touch"
          heading={<>Got something <UnderlineAccent color="teal">interesting?</UnderlineAccent></>}
          subheading="Send me the messy version of the idea or problem. We can figure out the rest from there."
          align="center"
          className="mb-9"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-flex"
        >
          <span aria-hidden="true" className="absolute -left-10 -top-5 h-3 w-8 -rotate-12 rounded-full bg-amber-400" />
          <span aria-hidden="true" className="absolute -right-9 -bottom-4 h-3 w-6 rotate-6 rounded-full bg-pink-400" />
          <a
            href={'mailto:' + profile.email + '?subject=Hello%20Pranav&body=Hi%20Pranav%2C%0A%0A'}
            className="inline-flex min-w-[220px] items-center justify-center gap-2.5 rounded-2xl bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-cta-blue transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
          >
            <Send size={16} />
            <span>Start a conversation</span>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}