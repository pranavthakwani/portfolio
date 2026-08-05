'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, TrendingUp, Github, ExternalLink, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { HighlightAccent, UnderlineAccent } from '@/components/ui/AccentMark';
import { projects } from '@/lib/data/projects';
import type { Project } from '@/types';
import { cn } from '@/lib/utils/cn';

/* ── Project Detail Modal ────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 top-8 bottom-8 sm:inset-x-8 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-2xl z-50 overflow-y-auto rounded-3xl bg-white shadow-soft-xl border border-ink-100"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-xl bg-paper-200 text-ink-400 hover:text-ink-800 hover:bg-paper-300 transition-all"
        >
          <X size={16} />
        </button>

        <div className="p-7 sm:p-10">
          {/* Category + featured */}
          <div className="flex items-center gap-2 mb-5">
            <Badge variant="purple" size="sm">{project.category}</Badge>
            {project.featured && (
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Featured</span>
            )}
          </div>

          {/* Title */}
          <h2 className="font-accent text-3xl sm:text-4xl font-bold text-ink-900 leading-tight mb-2">
            {project.title}
          </h2>
          <p className="text-sm font-medium text-ink-500 mb-7">{project.tagline}</p>

          {/* Description */}
          <p className="text-sm text-ink-600 leading-relaxed mb-7">{project.description}</p>

          {/* Architecture */}
          {project.architectureHighlight && (
            <div className="mb-7 p-4 bg-ink-900 rounded-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500 mb-2">Architecture</p>
              <p className="text-xs font-mono text-teal-300 leading-relaxed">
                {project.architectureHighlight}
              </p>
            </div>
          )}

          {/* Outcome */}
          <div className="flex items-start gap-3 mb-7 p-4 bg-teal-50 border border-teal-100 rounded-2xl">
            <TrendingUp size={14} className="text-teal-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-500 mb-1">Business outcome</p>
              <p className="text-sm text-teal-700 font-semibold leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
            ))}
          </div>

          {/* Links */}
          {project.links && Object.values(project.links).some(Boolean) && (
            <div className="flex items-center gap-4 pt-6 border-t border-paper-200">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors"
                >
                  <Github size={14} /> View Code
                </a>
              )}
              {project.links.caseStudy && project.links.caseStudy !== '#' && (
                <a
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-500 hover:text-purple-700 transition-colors"
                >
                  <ExternalLink size={14} /> Case Study <ArrowUpRight size={11} />
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

/* ── Minimal project list item ──────────────────────────────────────── */
function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onClick={() => onOpen(project)}
      className={cn(
        'group flex items-start sm:items-center gap-5 p-5 sm:p-6 rounded-2xl border border-ink-100 bg-white/80 cursor-pointer',
        'hover:border-purple-200 hover:shadow-soft-md hover:bg-white transition-all duration-250'
      )}
    >
      {/* Index number */}
      <span className="shrink-0 font-accent text-3xl font-bold text-ink-200 leading-none w-10 text-right hidden sm:block">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h3 className="text-sm font-bold text-ink-900 group-hover:text-purple-600 transition-colors duration-200">
            {project.title}
          </h3>
          <Badge variant="purple" size="sm">{project.category}</Badge>
          {project.featured && (
            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">★ Featured</span>
          )}
        </div>
        <p className="text-xs text-ink-500 mb-2.5">{project.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] text-ink-400">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>

      {/* CTA arrow */}
      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-paper-200 text-ink-400 group-hover:bg-purple-50 group-hover:text-purple-500 transition-all duration-200">
        <ChevronRight size={15} />
      </div>
    </motion.article>
  );
}

/* ── Main Projects section ──────────────────────────────────────────── */
export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects" background="paper" withDivider>
        <SectionHeading
          eyebrow="Selected work"
          heading={<>Projects that <UnderlineAccent color="amber">actually shipped</UnderlineAccent></>}
          subheading="Production systems serving real businesses. Click any project to see the full picture."
          className="mb-10"
        />

        {/* Vertical list */}
        <div className="flex flex-col gap-3">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-xs text-ink-300"
        >
          Click any project to see full details, architecture, and outcomes
        </motion.p>
      </SectionWrapper>

      {/* Modal portal — AnimatePresence here so exit animations fire on unmount */}
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
