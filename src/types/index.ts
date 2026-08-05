/* ─── Shared TypeScript types ─────────────────────────────────────── */

/* Navigation */
export interface NavItem {
  label: string;
  href: string;
  id: string;
}

/* Chat */
export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string; // lucide icon name
}

/* Chat service abstraction — swap out for real RAG backend */
export interface ChatServiceOptions {
  onToken: (token: string) => void;
  onComplete: (fullText: string) => void;
  onError: (error: Error) => void;
}

export interface IChatService {
  send(messages: ChatMessage[], options: ChatServiceOptions): Promise<void>;
  abort(): void;
}

/* Projects */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  outcome: string; // measurable business result
  tags: string[];
  category: ProjectCategory;
  featured: boolean;
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  architectureHighlight?: string; // 1-line technical callout
}

export type ProjectCategory =
  | 'RAG'
  | 'Agent'
  | 'Automation'
  | 'Integration'
  | 'Infrastructure'
  | 'Portfolio';

/* Experience */
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyType: string; // e.g. "AI SaaS startup" — gives context without naming clients
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

/* Skills */
export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'familiar';
  note?: string; // optional 1-line rationale / context
}

/* Profile */
export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  tagline: string; // one-liner value proposition shown in hero
  bio: string[];   // 2-3 paragraphs
  photo: string;   // path under /public
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    resume?: string;
  };
  availability: 'open' | 'selective' | 'closed';
  availabilityNote: string;
}
