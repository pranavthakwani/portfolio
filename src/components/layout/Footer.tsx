'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { profile } from '@/lib/data/profile';

const socialLinks = [
  { href: profile.social.github,   icon: Github,   label: 'GitHub' },
  { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: profile.social.twitter,  icon: Twitter,  label: 'Twitter' },
  { href: `mailto:${profile.email}`, icon: Mail,   label: 'Email' },
].filter((s) => !!s.href);

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'About',      href: '#about' },
  { label: 'Contact',    href: '#contact' },
];

export function Footer() {
  return (
    /* Single dark section — deliberate contrast anchor, like Odoo's footer */
    <footer className="bg-ink-900 text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-lg font-bold text-white mb-1">{profile.name}</p>
              <p className="text-sm text-ink-400 mb-6 leading-relaxed">{profile.title}</p>
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs text-ink-400">{profile.availabilityNote}</span>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-ink-800 text-ink-400 hover:bg-ink-700 hover:text-white transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500 mb-5">Navigation</p>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-ink-400 hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500 mb-5">Get in touch</p>
              <p className="text-sm text-ink-400 leading-relaxed mb-6">
                Available for senior AI engineering roles and consulting. The fastest way to see how I work is to ask my AI assistant.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-amber-400 transition-colors duration-200 group"
              >
                {profile.email}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-600">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-600 flex items-center gap-1.5">
            Built with Next.js, Tailwind CSS &amp; Framer Motion
            <span className="text-ink-700">·</span>
            <a
              href={profile.social.github ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-400 transition-colors duration-150 inline-flex items-center gap-1"
            >
              View source <ArrowUpRight size={11} />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
