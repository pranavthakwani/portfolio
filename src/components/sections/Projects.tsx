'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Github, FileText } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { projects } from '@/lib/data/projects';
import type { Project, ProjectCategory } from '@/types';
import { cn } from '@/lib/utils/cn';

const ALL_CATEGORIES: { label: string; value: ProjectCategory | 'All' }[] = [
  { label: 'All',           value: 'All' },
  { label: 'RAG',           value: 'RAG' },
  { label: 'Agents',        value: 'Agent' },
  { label: 'Automation',    value: 'Automation' },
  { label: 'Integration',   value: 'Integration' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group flex flex-col bg-white rounded-2xl border border-ink-100 shadow-soft',
        'hover:shadow-card-hover hover:border-ink-200 transition-all duration-300',
        'overflow-hidden'
      )}
    >
      {/* Category tag */}
      <div className="px-5 pt-5 pb-3 border-b border-paper-200 flex items-center justify-between">
        <Badge variant="purple" size="sm">{project.category}</Badge>
        {project.featured && (
          <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-1.5 leading-snug group-hover:text-purple-600 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-xs text-ink-500 mb-3 font-medium">{project.tagline}</p>
        <p className="text-xs text-ink-500 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Architecture highlight */}
        {project.architectureHighlight && (
          <div className="mb-4 px-3 py-2 bg-paper-200 rounded-xl">
            <p className="text-[10px] font-mono text-ink-500 leading-relaxed">
              {project.architectureHighlight}
            </p>
          </div>
        )}

        {/* Business outcome */}
        <div className="flex items-start gap-2 mb-4 p-3 bg-teal-50 border border-teal-100 rounded-xl">
          <TrendingUp size={12} className="text-teal-500 shrink-0 mt-0.5" />
          <p className="text-xs text-teal-700 leading-relaxed font-medium">
            {project.outcome}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
          ))}
        </div>

        {/* Links */}
        {project.links && Object.values(project.links).some(Boolean) && (
          <div className="flex items-center gap-3 pt-3 border-t border-paper-200">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ink-400 hover:text-ink-700 transition-colors"
              >
                <Github size={11} /> Code
              </a>
            )}
            {project.links.caseStudy && (
              <a
                href={project.links.caseStudy}
                className="inline-flex items-center gap-1 text-xs text-purple-500 hover:text-purple-700 font-medium transition-colors group/link"
              >
                <FileText size={11} />
                Case study
                <ArrowUpRight size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects" background="paper" withDivider>
      <SectionHeading
        eyebrow="Selected work"
        heading={<>Projects that <UnderlineAccent color="amber">actually shipped</UnderlineAccent></>}
        subheading="Production systems serving real businesses — not side projects or demos."
        className="mb-8"
      />

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {ALL_CATEGORIES.map(({ label, value }) => (
          <motion.button
            key={value}
            onClick={() => setActiveCategory(value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
              activeCategory === value
                ? 'bg-ink-900 text-white shadow-soft'
                : 'bg-white border border-ink-200 text-ink-500 hover:border-ink-300 hover:text-ink-700'
            )}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Project grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
