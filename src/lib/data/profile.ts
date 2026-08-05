import type { Profile } from '@/types';

/**
 * Personal profile data — replace all placeholder values with your own.
 * The AI assistant knowledge base also references this data.
 */
export const profile: Profile = {
  name: 'Pranav',
  title: 'AI Automation Engineer',
  location: 'India',

  email: 'pranav@example.com', // ← replace

  // The one sentence that appears under your name in the hero
  tagline: 'I build AI systems that automate real business workflows.',

  // 2–3 short paragraphs shown in the About section
  bio: [
    'I specialise in designing and deploying end-to-end AI automation systems — from RAG-powered knowledge bases and multi-agent pipelines to LLM-backed MCP servers and workflow orchestration tools.',
    'My focus is on production-grade engineering: systems that are reliable, explainable, and measurably valuable to the businesses they serve. Every project I ship starts from a real operational problem and ends with a quantified outcome.',
    'I\'m currently open to senior AI engineering and automation consulting engagements. The best way to understand my work is to ask the AI assistant on this page — it\'s a system I built myself.',
  ],

  // Path relative to /public — add your actual photo as /public/pranav.jpg
  photo: '/pranav.jpg',

  social: {
    github:   'https://github.com/pranav',   // ← replace
    linkedin: 'https://linkedin.com/in/pranav', // ← replace
    twitter:  'https://x.com/pranav',        // ← replace
    resume:   '/resume.pdf',                  // ← add resume.pdf to /public
  },

  availability: 'open',
  availabilityNote: 'Available for senior AI engineering roles and consulting.',
};
