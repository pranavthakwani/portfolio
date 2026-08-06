'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HighlightAccent } from '@/components/ui/AccentMark';
import { skillCategories } from '@/lib/data/skills';
import type { Skill } from '@/types';
import { cn } from '@/lib/utils/cn';

const levelConfig: Record<Skill['level'], { label: string; dotCount: number; color: string }> = {
  expert:     { label: 'Expert',     dotCount: 3, color: 'bg-purple-500' },
  proficient: { label: 'Proficient', dotCount: 2, color: 'bg-teal-400' },
  familiar:   { label: 'Familiar',   dotCount: 1, color: 'bg-ink-300' },
};

function SkillPill({ skill }: { skill: Skill }) {
  const level = levelConfig[skill.level];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="group relative flex flex-col gap-1 p-3 bg-white border border-ink-100 rounded-xl hover:border-ink-200 hover:shadow-soft transition-all duration-200 cursor-default"
      title={skill.note}
    >
      {/* Skill name */}
      <span className="text-xs font-semibold text-ink-800 leading-snug">
        {skill.name}
      </span>

      {/* Level indicator — dot row */}
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-colors duration-200',
              dot <= level.dotCount ? level.color : 'bg-ink-100'
            )}
          />
        ))}
        <span className="ml-1 text-[10px] text-ink-500 font-medium">{level.label}</span>
      </div>

      {/* Tooltip note on hover */}
      {skill.note && (
        <div className="absolute bottom-full left-0 mb-2 z-10 w-44 p-2.5 bg-ink-900 text-white rounded-xl shadow-soft-lg text-[10px] leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
          {skill.note}
          <div className="absolute top-full left-4 border-4 border-transparent border-t-ink-900" />
        </div>
      )}
    </motion.div>
  );
}

export function Skills() {
  return (
    <SectionWrapper id="skills" background="paper" withDivider>
      <SectionHeading
        eyebrow="Technical skills"
        heading={<>The tools I use — and <HighlightAccent color="amber">why</HighlightAccent></>}
        subheading="Hover a skill to see a one-line rationale. Every choice has a reason."
        className="mb-12"
      />

      <div className="flex flex-col gap-10">
        {skillCategories.map((category, ci) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: ci * 0.07 }}
          >
            {/* Category header */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-ink-900 mb-1">{category.name}</h3>
              <p className="text-xs text-ink-600">{category.description}</p>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Level legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 flex items-center gap-6"
      >
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">Level key:</span>
        {Object.entries(levelConfig).map(([key, { label, dotCount, color }]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="flex gap-1">
              {[1,2,3].map((d) => (
                <span key={d} className={cn('w-1.5 h-1.5 rounded-full', d <= dotCount ? color : 'bg-ink-100')} />
              ))}
            </div>
            <span className="text-[10px] text-ink-600 font-medium">{label}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
