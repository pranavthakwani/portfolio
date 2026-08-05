'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight, Send, Check } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { Button } from '@/components/ui/Button';
import { profile } from '@/lib/data/profile';

const SOCIAL_LINKS = [
  { href: profile.social.github,   Icon: Github,   label: 'GitHub',   desc: 'See my code' },
  { href: profile.social.linkedin, Icon: Linkedin, label: 'LinkedIn', desc: 'Connect professionally' },
  { href: profile.social.twitter,  Icon: Twitter,  label: 'Twitter',  desc: 'Follow my work' },
].filter((s): s is typeof s & { href: string } => !!s.href);

export function Contact() {
  const [sent, setSent] = useState(false);

  // Very simple mailto action — replace with a proper form handler (Resend/Formspree) in production
  const handleEmailClick = () => {
    window.location.href = `mailto:${profile.email}?subject=Hello%20Pranav&body=Hi%20Pranav%2C%0A%0A`;
    // Optimistic feedback
    setTimeout(() => setSent(true), 400);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <SectionWrapper id="contact" background="paper" withDivider>
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Get in touch"
          heading={<>Let&apos;s build something <UnderlineAccent color="teal">worth building</UnderlineAccent></>}
          subheading="Available for senior AI engineering roles and consulting engagements. If you have a real business problem that AI can solve, let's talk about it."
          align="center"
          className="mb-12"
        />

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleEmailClick}
            icon={sent ? <Check size={16} /> : <Send size={16} />}
            className="min-w-[200px]"
          >
            {sent ? 'Opening email…' : 'Send me an email'}
          </Button>

          <p className="text-xs text-ink-400">
            Or reach me directly at{' '}
            <a
              href={`mailto:${profile.email}`}
              className="text-purple-500 hover:text-purple-700 transition-colors"
            >
              {profile.email}
            </a>
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px bg-ink-100" />
          <span className="text-xs text-ink-300 uppercase tracking-wider">or find me on</span>
          <div className="flex-1 h-px bg-ink-100" />
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {SOCIAL_LINKS.map(({ href, Icon, label, desc }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex items-center gap-3 p-4 bg-white border border-ink-100 rounded-2xl hover:border-ink-200 hover:shadow-soft transition-all duration-200"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-paper-200 group-hover:bg-purple-50 transition-colors duration-200">
                <Icon size={15} className="text-ink-500 group-hover:text-purple-500 transition-colors" />
              </span>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold text-ink-800">{label}</span>
                <span className="block text-[10px] text-ink-400">{desc}</span>
              </div>
              <ArrowUpRight size={12} className="text-ink-300 group-hover:text-ink-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </motion.a>
          ))}
        </motion.div>

        {/* Resume download */}
        {profile.social.resume && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-6 text-center"
          >
            <a
              href={profile.social.resume}
              download
              className="inline-flex items-center gap-1.5 text-xs text-ink-400 hover:text-ink-700 transition-colors"
            >
              Download resume (PDF)
              <ArrowUpRight size={11} />
            </a>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
