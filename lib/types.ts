export const locales = ["en", "ku"] as const;
export type Locale = (typeof locales)[number];

export const topics = ["golang", "laravel", "javascript", "react"] as const;
export type Topic = (typeof topics)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isTopic(value: string): value is Topic {
  return topics.includes(value as Topic);
}

export type BlogFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
};

export type ProjectFrontmatter = {
  title: string;
  description?: string;
  date: string;
  tech: string[];
  category: "fullstack" | "backend" | "frontend";
  thumbnail: string;
  featured: boolean;
};

export interface BlogPost {
  slug: string;
  topic: Topic;
  frontmatter: BlogFrontmatter;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
}
