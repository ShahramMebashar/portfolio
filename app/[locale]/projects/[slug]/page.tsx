import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getProjectSource(slug, locale as Locale);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<ProjectFrontmatter>(source);

  return (
    <div className="layout">
      <a href={`/${locale}/projects`} className="text-primary text-sm">← {dict.common.back}</a>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">{frontmatter.title}</h1>
          <div className="flex gap-2 flex-wrap mt-4">
            {frontmatter.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-primary border-primary">{t}</Badge>
            ))}
          </div>
        </header>
        <div className="prose">{content}</div>
      </article>
    </div>
  );
}
