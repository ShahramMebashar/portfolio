import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getProjectSource(slug, locale as Locale);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<ProjectFrontmatter>(source);

  return (
    <div className="layout">
      <a href={`/${locale}/projects`} style={{ color: "var(--accent)", fontSize: "0.9rem" }}>← {dict.common.back}</a>
      <article style={{ marginTop: "2rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>{frontmatter.title}</h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {frontmatter.tech.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--accent)", border: "1px solid var(--accent)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>{t}</span>
            ))}
          </div>
        </header>
        <div className="prose">{content}</div>
      </article>
    </div>
  );
}
