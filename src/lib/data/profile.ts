import type { Profile } from '@/types';

export const profile: Profile = {
  name: 'Pranav Thakwani',
  title: 'AI Automation Engineer',
  location: 'Ahmedabad, India',

  email: 'pranavthakwani@gmail.com',

  tagline: 'I build AI systems that eliminate the work nobody wants to do.',

  bio: [
    'I specialise in designing and deploying end-to-end AI automation systems — from self-hosted RAG pipelines and multi-agent WhatsApp platforms to LLM-backed workflow orchestration. My work has saved teams 150+ hours per month and automated away 80–85% of manual grunt work.',
    'I care about production quality: systems that are reliable, observable, and measurably valuable. Every project I ship starts from a real operational pain point and ends with a number that tells the business how much better things are.',
    'Currently a Junior Software Developer (AI & Automation) at Tech Grind Pvt. Ltd. in Ahmedabad — and open to freelance projects and new roles. The AI assistant on this page is built on the same stack I use every day.',
  ],

  photo: '/pranav.jpg',

  social: {
    github:   'https://github.com/pranavthakwani',
    linkedin: 'https://linkedin.com/in/pranavthakwani',
    twitter:  undefined,
    resume:   '/resume.pdf',
  },

  availability: 'open',
  availabilityNote: 'Open to work — roles & freelance',
};
