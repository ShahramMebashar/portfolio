import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import ProjectMeta from "@/app/components/ProjectMeta";
import Image from "next/image";
import Link from "next/link";

export default async function WorkDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getProjectSource(slug, locale as Locale);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<ProjectFrontmatter>(source);

  return (
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${locale}/work`} className="inline-flex items-center gap-2 text-sm text-muted-foreground font-semibold hover:text-foreground transition-colors mb-12">
          ← {dict.common.back}
        </Link>
        <article>
          <header className="mb-10 animate-reveal">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">{frontmatter.title}</h1>
            <ProjectMeta
              role={frontmatter.role}
              year={frontmatter.year}
              liveUrl={frontmatter.liveUrl}
              tech={frontmatter.tech}
              labels={{
                role: dict.work.meta_role,
                year: dict.work.meta_year,
                live: dict.work.meta_live,
                builtWith: dict.work.built_with,
              }}
            />
          </header>
          {frontmatter.thumbnail && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-border/50 bg-muted/30 mb-12 animate-reveal delay-1">
              <Image
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                fill
                sizes="(min-width: 768px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="prose animate-reveal delay-2 w-full max-w-none text-lg">
            {content}
          </div>
        </article>
      </div>
    </div>
  );
}
