'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { CircleAccent } from '@/components/ui/AccentMark';
import { experience } from '@/lib/data/experience';
import { cn } from '@/lib/utils/cn';

export function Experience() {
  return (
    <SectionWrapper id="experience" background="white" withDivider>
      <SectionHeading
        eyebrow="Career"
        heading={<><CircleAccent color="teal">Where</CircleAccent> I&apos;ve worked</>}
        className="mb-12"
      />

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-3 bottom-3 w-px bg-ink-100 hidden md:block"
        />

        <div className="flex flex-col gap-8">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
              className="md:pl-8 relative"
            >
              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className={cn(
                  'hidden md:block absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 bg-white',
                  exp.current
                    ? 'border-purple-500'
                    : 'border-ink-300'
                )}
              />

              <div
                className={cn(
                  'p-6 rounded-2xl border transition-colors duration-200',
                  exp.current
                    ? 'border-purple-100 bg-purple-50/50'
                    : 'border-ink-100 bg-white hover:border-ink-200'
                )}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-ink-900">{exp.role}</h3>
                      {exp.current && (
                        <Badge variant="purple" size="sm">Current</Badge>
                      )}
                    </div>
                    <p className="text-xs text-ink-600 font-medium">
                      {exp.company}
                      <span className="mx-1.5 text-ink-400">·</span>
                      {exp.companyType}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold text-ink-600 bg-paper-200 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-ink-700 leading-relaxed mb-4">{exp.summary}</p>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-2 text-xs text-ink-700">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-teal-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
