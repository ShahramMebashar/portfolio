import type { Project, Locale } from "@/lib/types";

export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const { frontmatter, slug } = project;
  return (
    <a href={`/${locale}/projects/${slug}`} style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden", transition: "border-color 0.2s" }}>
      {frontmatter.thumbnail && (
        <div style={{ height: "200px", background: "var(--line)", backgroundImage: `url(${frontmatter.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      )}
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>{frontmatter.title}</h3>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {frontmatter.tech.map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--text-muted)", border: "1px solid var(--line)", padding: "0.1rem 0.4rem", borderRadius: "3px" }}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}
