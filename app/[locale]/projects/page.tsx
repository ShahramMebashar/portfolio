import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectFilters from "@/app/components/ProjectFilters";

export default async function ProjectsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; tech?: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const allProjects = await getAllProjects(locale as Locale);
  const { category, tech } = await searchParams;

  let filtered = allProjects;
  if (category && category !== "all") { filtered = filtered.filter((p) => p.frontmatter.category === category); }
  if (tech) { filtered = filtered.filter((p) => p.frontmatter.tech.includes(tech)); }

  const categories = [...new Set(allProjects.map((p) => p.frontmatter.category))];
  const techTags = [...new Set(allProjects.flatMap((p) => p.frontmatter.tech))];

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.projects.title}</h1></section>
      <ProjectFilters categories={categories} techTags={techTags} labels={{ all: dict.projects.filter_all, fullstack: dict.projects.filter_fullstack, backend: dict.projects.filter_backend, frontend: dict.projects.filter_frontend }} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {filtered.map((project) => (<ProjectCard key={project.slug} project={project} locale={locale as Locale} />))}
      </div>
    </div>
  );
}
