export interface Project {
  id: string;
  repoName: string;
  title: string;
  tagline: string;
  description: string;
  category: 'all' | 'originals' | 'fresh';
  type: string;
  stars: number;
  forks: number;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  metrics?: string;
}

export interface SkillItem {
  id: string;
  title: string;
  level: string;
  rating: number; // 1 to 5 bars
  description: string;
}

export interface Discipline {
  id: string;
  code: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProfileCard {
  id: string;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  image?: string;
  linkText?: string;
  linkUrl?: string;
  highlightText?: string;
}
