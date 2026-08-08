'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { profile } from '@/lib/data/profile';

type SocialItem = {
  label: string;
  username: string;
  href: string | undefined;
  color: string;
  Icon?: LucideIcon;
  imageSrc?: string;
  imageClass?: string;
};

const SOCIAL_LINKS: SocialItem[] = [
  {
    label: 'Email',
    username: 'pranavthakwani@gmail.com',
    href: 'mailto:' + profile.email,
    Icon: Mail,
    color: 'text-purple-600 border-purple-200 hover:bg-purple-50',
  },
  {
    label: 'LinkedIn',
    username: '@pranavthakwani',
    href: profile.social.linkedin,
    Icon: Linkedin,
    color: 'text-blue-700 border-blue-200 hover:bg-blue-50',
  },
  {
    label: 'GitHub',
    username: '@pranavthakwani',
    href: profile.social.github,
    Icon: Github,
    color: 'text-ink-800 border-ink-200 hover:bg-ink-50',
  },
  {
    label: 'WhatsApp',
    username: '@pranavthakwani',
    href: profile.social.whatsapp,
    imageSrc: '/whatsapp.svg',
    color: 'border-teal-200 hover:bg-teal-50',
  },
  {
    label: 'Instagram',
    username: '@pranavthakwani',
    href: profile.social.instagram,
    Icon: Instagram,
    color: 'text-pink-600 border-pink-200 hover:bg-pink-50',
  },
  {
    label: 'Facebook',
    username: '@pranavthakwani',
    href: profile.social.facebook,
    Icon: Facebook,
    color: 'text-blue-600 border-blue-200 hover:bg-blue-50',
  },
  {
    label: 'Resume',
    username: 'pranavthakwani · résumé',
    href: profile.social.resume,
    Icon: FileText,
    color: 'text-amber-700 border-amber-200 hover:bg-amber-50',
  },
  {
    label: 'Lichess',
    username: '@pranavthakwani',
    href: profile.social.chess,
    imageSrc: '/chess-knight.svg',
    color: 'border-ink-300 hover:bg-paper-200',
  },
];

export function SocialRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
    >
      <div className="relative mb-1 -rotate-3 whitespace-nowrap text-center font-accent text-ink-600">
        <span className="block text-sm font-semibold leading-none">hit me up —</span>
        <span className="mt-0.5 block text-xl font-bold leading-none text-ink-900">@pranavthakwani</span>
        <span className="mt-0.5 block text-sm font-semibold leading-none">everywhere</span>
        <span aria-hidden="true" className="absolute -bottom-0.5 left-2 h-[3px] w-3/4 rounded-full bg-teal-400/80" />
      </div>

      {SOCIAL_LINKS.map(({ label, username, href, Icon, imageSrc, imageClass, color }, index) => (
        <motion.a
          key={label}
          href={href}
          target={label === 'Email' ? undefined : '_blank'}
          rel={label === 'Email' ? undefined : 'noopener noreferrer'}
          aria-label={label + ': ' + username}
          title={label}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55 + index * 0.06, duration: 0.3 }}
          whileHover={{ x: -4, rotate: index % 2 === 0 ? -3 : 3 }}
          whileTap={{ scale: 0.92 }}
          className="group relative"
        >
          <span
            className={
              'flex h-11 w-11 items-center justify-center rounded-[14px] border-2 bg-white/90 shadow-[3px_3px_0_rgba(15,23,42,0.12)] backdrop-blur-sm transition-colors ' +
              color
            }
          >
            {Icon ? (
              <Icon size={18} strokeWidth={2.1} />
            ) : (
              <Image
                src={imageSrc || ''}
                alt=""
                width={20}
                height={20}
                className={'h-5 w-5 object-contain ' + (imageClass || '')}
              />
            )}
          </span>

          <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-lg bg-ink-900 px-2.5 py-1 font-accent text-base font-bold text-white opacity-0 shadow-soft transition-all group-hover:translate-x-0 group-hover:opacity-100">
            {label}
          </span>
        </motion.a>
      ))}

      <span aria-hidden="true" className="mt-1 h-6 w-[3px] rotate-3 rounded-full bg-amber-400" />
    </aside>
  );
}