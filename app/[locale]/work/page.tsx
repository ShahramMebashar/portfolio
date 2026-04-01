import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectFilters from "@/app/components/ProjectFilters";

export default async function WorkPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; tech?: string }> }) {
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
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="animate-reveal">
        <section className="mb-12 md:mb-16 flex flex-col items-start py-0">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight font-extrabold text-foreground">
            {dict.work.title}
          </h1>
        </section>
        <div className="mb-12 md:mb-16 animate-reveal delay-1">
          <ProjectFilters categories={categories} techTags={techTags} labels={{ all: dict.projects.filter_all, fullstack: dict.projects.filter_fullstack, backend: dict.projects.filter_backend, frontend: dict.projects.filter_frontend }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-reveal delay-2">
          {filtered.map((project) => (<ProjectCard key={project.slug} project={project} locale={locale as Locale} basePath="work" />))}
        </div>
      </div>
    </div>
  );
}
