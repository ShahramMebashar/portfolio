import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { ViewTransitionLink } from "@/app/components/ViewTransitionLink";

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
        <ViewTransitionLink href={`/${locale}/work`} className="inline-flex items-center gap-2 text-sm text-muted-foreground font-semibold hover:text-foreground transition-colors mb-12">
          ← {dict.common.back}
        </ViewTransitionLink>
        <article>
          <header className="mb-12 animate-reveal">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">{frontmatter.title}</h1>
            <div className="flex gap-3 flex-wrap">
              {frontmatter.tech.map((t) => (
                <span key={t} className="font-semibold text-xs tracking-wide text-foreground px-3 py-1 bg-muted/50 rounded-md border border-border/50">
                  {t}
                </span>
              ))}
            </div>
          </header>
          <div className="prose animate-reveal delay-1 w-full max-w-none text-lg">
            {content}
          </div>
        </article>
      </div>
    </div>
  );
}
