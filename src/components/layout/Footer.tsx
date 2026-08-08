'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { profile } from '@/lib/data/profile';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-amber-400 bg-[#123c35] text-paper-50">
      <span aria-hidden="true" className="absolute -right-8 top-10 h-4 w-36 rotate-6 rounded-full bg-pink-400/70" />
      <span aria-hidden="true" className="absolute -right-4 top-20 h-3 w-24 -rotate-3 rounded-full bg-blue-400/70" />
      <span aria-hidden="true" className="absolute bottom-14 left-0 h-3 w-28 -rotate-2 rounded-full bg-amber-400/75" />

      <Container className="relative py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-accent text-3xl font-bold text-white">{profile.name}</p>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-teal-100/75">
              Curious by nature. Building useful things, one clear problem at a time.
            </p>
          </motion.div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-teal-100/70 transition-colors hover:text-amber-300"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-teal-100/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-teal-100/55">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-accent text-base font-bold text-teal-100/70">
            Thanks for stopping by.
          </p>
        </div>
      </Container>
    </footer>
  );
}