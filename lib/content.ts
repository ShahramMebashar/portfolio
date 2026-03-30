import fs from "fs";
import path from "path";
import type { BlogPost, BlogFrontmatter, Project, ProjectFrontmatter, Locale, Topic } from "./types";
import { topics, isTopic } from "./types";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "content");

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  const blogDir = path.join(contentDir, "blog");

  if (!fs.existsSync(blogDir)) return posts;

  for (const topic of topics) {
    const topicDir = path.join(blogDir, topic);
    if (!fs.existsSync(topicDir)) continue;

    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const source = fs.readFileSync(path.join(topicDir, file), "utf-8");
      const { frontmatter } = await compileMDX<BlogFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });
      posts.push({
        slug: file.replace(".mdx", ""),
        topic,
        frontmatter,
      });
    }
  }

  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPostsByTopic(topic: Topic): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.topic === topic);
}

export async function getPostSource(topic: string, slug: string): Promise<string | null> {
  if (!isTopic(topic)) return null;
  const filePath = path.join(contentDir, "blog", topic, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function getAllProjects(locale: Locale): Promise<Project[]> {
  const projectDir = path.join(contentDir, "projects", locale);
  if (!fs.existsSync(projectDir)) return [];

  const files = fs.readdirSync(projectDir).filter((f) => f.endsWith(".mdx"));
  const projects: Project[] = [];

  for (const file of files) {
    const source = fs.readFileSync(path.join(projectDir, file), "utf-8");
    const { frontmatter } = await compileMDX<ProjectFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });
    projects.push({
      slug: file.replace(".mdx", ""),
      frontmatter,
    });
  }

  return projects.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getProjectSource(slug: string, locale: Locale): Promise<string | null> {
  const filePath = path.join(contentDir, "projects", locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function getContentSource(type: "about" | "experience", locale: Locale): Promise<string | null> {
  const filePath = path.join(contentDir, type, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getAllTopics(): Topic[] {
  const blogDir = path.join(contentDir, "blog");
  if (!fs.existsSync(blogDir)) return [];
  return topics.filter((t) => fs.existsSync(path.join(blogDir, t)));
}
