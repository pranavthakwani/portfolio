'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  TrendingUp,
  Github,
  ExternalLink,
  ChevronRight,
  Play,
  CheckCircle2,
  Lightbulb,
  Link as LinkIcon,
} from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { projects } from '@/lib/data/projects';
import type { Project } from '@/types';
import { cn } from '@/lib/utils/cn';

function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      return 'https://www.youtube.com/embed/' + parsed.pathname.replace('/', '');
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return 'https://www.youtube.com/embed/' + videoId;
    }

    if (parsed.hostname.includes('drive.google.com')) {
      const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (match) return 'https://drive.google.com/file/d/' + match[1] + '/preview';
    }

    return url;
  } catch {
    return url;
  }
}

function BulletList({
  items,
  tone = 'default',
}: {
  items: string[];
  tone?: 'default' | 'dark' | 'green';
}) {
  const color =
    tone === 'dark'
      ? 'text-teal-300'
      : tone === 'green'
        ? 'text-teal-600'
        : 'text-purple-500';

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs leading-relaxed">
          <CheckCircle2 size={13} className={cn('mt-0.5 shrink-0', color)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const hasLink =
    project.links?.demo || project.links?.github || project.links?.caseStudy;

  if (!hasLink) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-paper-50 px-3 py-1.5 text-[11px] font-semibold text-ink-500">
        <LinkIcon size={12} />
        Project link available on request
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {project.links?.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1.5 text-[11px] font-semibold text-white"
        >
          Open project <ArrowUpRight size={11} />
        </a>
      )}
      {project.links?.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] font-semibold text-ink-700"
        >
          <Github size={12} /> Code
        </a>
      )}
      {project.links?.caseStudy && (
        <a
          href={project.links.caseStudy}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 px-3 py-1.5 text-[11px] font-semibold text-purple-700"
        >
          <ExternalLink size={12} /> Case study
        </a>
      )}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <motion.button
        type="button"
        aria-label="Close project details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 cursor-default bg-ink-950/60 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby={'project-title-' + project.id}
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 36, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border-2 border-ink-900/80 bg-paper-50 p-4 shadow-[10px_12px_0_rgba(22,163,74,0.22),0_32px_100px_rgba(2,6,23,0.3)] sm:p-6 lg:p-8"
        style={{ scrollbarWidth: 'thin' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-500 shadow-soft transition-colors hover:bg-paper-200 hover:text-ink-900"
        >
          <X size={17} />
        </button>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-3xl border border-ink-200 bg-white p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-2 pr-10">
              <Badge variant="purple" size="sm">{project.category}</Badge>
              {project.featured && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                  Featured
                </span>
              )}
            </div>

            <h2
              id={'project-title-' + project.id}
              className="font-accent text-3xl font-bold leading-tight text-ink-900 sm:text-4xl"
            >
              {project.title}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-relaxed text-ink-500">
              {project.tagline}
            </div>

            <div className="mt-5">
              <ProjectLinks project={project} />
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                  What it does
                </div>
                <BulletList items={project.details} />
              </div>

              <div>
                <div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                  <Lightbulb size={12} className="text-amber-500" />
                  Key decisions
                </div>
                <BulletList items={project.decisions} />
              </div>
            </div>

            {project.architectureHighlight && (
              <div className="mt-6 rounded-2xl bg-ink-900 px-4 py-3">
                <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink-400">
                  Architecture
                </div>
                <div className="font-mono text-[11px] leading-relaxed text-teal-300">
                  {project.architectureHighlight}
                </div>
              </div>
            )}
          </section>

          <section className="flex min-h-[19rem] flex-col overflow-hidden rounded-3xl border border-ink-200 bg-ink-900">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="font-accent text-xl font-bold text-white">Project walkthrough</span>
              <Play size={15} className="text-amber-400" />
            </div>

            {project.videoUrl ? (
              <iframe
                src={toEmbedUrl(project.videoUrl)}
                title={project.title + ' video walkthrough'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="min-h-[19rem] w-full flex-1 border-0"
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border-2 border-white/15 bg-white/5 text-amber-400">
                  <Play size={25} fill="currentColor" />
                </span>
                <span className="font-accent text-2xl font-bold text-white">Walkthrough coming soon</span>
                <span className="max-w-xs text-xs leading-relaxed text-ink-400">
                  This area accepts an embedded YouTube or Google Drive video without changing the layout.
                </span>
              </div>
            )}
          </section>
        </div>

        <section className="mt-4 overflow-hidden rounded-3xl border-2 border-ink-900/80 bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="bg-ink-900 p-5 text-white sm:p-7">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-300">
                Tech &amp; learning outcomes
              </div>

              <div className="mb-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-teal-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-ink-200">
                <BulletList items={project.learningOutcomes} tone="dark" />
              </div>
            </div>

            <div className="flex items-start gap-4 bg-teal-50 p-5 sm:p-7">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
                <TrendingUp size={18} />
              </span>
              <div>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-600">
                  Business outcome
                </div>
                <div className="font-accent text-2xl font-bold leading-snug text-teal-900 sm:text-3xl">
                  {project.outcome}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.section>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onClick={() => onOpen(project)}
      aria-label={'Open project: ' + project.title}
      className={cn(
        'group flex w-full items-start gap-5 rounded-2xl border border-ink-100 bg-white/80 p-5 text-left sm:items-center sm:p-6',
        'cursor-pointer transition-all duration-200 hover:border-purple-200 hover:bg-white hover:shadow-soft-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2'
      )}
    >
      <span className="hidden w-10 shrink-0 text-right font-accent text-3xl font-bold leading-none text-ink-200 sm:block">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-ink-900 transition-colors group-hover:text-purple-600">
            {project.title}
          </span>
          <Badge variant="purple" size="sm">{project.category}</Badge>
          {project.featured && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">Featured</span>
          )}
        </span>
        <span className="mb-2.5 block text-xs text-ink-500">{project.tagline}</span>
        <span className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] text-ink-400">+{project.tags.length - 4}</span>
          )}
        </span>
      </span>

      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-paper-200 text-ink-400 transition-all group-hover:bg-purple-50 group-hover:text-purple-500">
        <ChevronRight size={15} />
      </span>
    </motion.button>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects" background="paper" withDivider>
        <SectionHeading
          eyebrow="Selected work"
          heading={<>Projects that <UnderlineAccent color="amber">actually shipped</UnderlineAccent></>}
          subheading="Production systems serving real businesses. Open any project for the complete technical and business view."
          className="mb-10"
        />

        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-ink-400">
          Open a project to explore its decisions, architecture, learnings, and outcome.
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}