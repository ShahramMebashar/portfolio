import type { Project, Locale } from "@/lib/types";
import { ViewTransitionLink } from "./ViewTransitionLink";

export default function ProjectCard({ project, locale, basePath = "projects" }: { project: Project; locale: Locale; basePath?: string }) {
  const { frontmatter, slug } = project;
  return (
    <ViewTransitionLink href={`/${locale}/${basePath}/${slug}`} className="group block no-underline focus:outline-none">
      <div className="flex flex-col gap-4 p-4 border border-border/60 hover:border-border hover:shadow-sm rounded-2xl transition-all duration-300 bg-card">
        <div className="relative overflow-hidden rounded-lg bg-muted/30 aspect-[16/9] w-full border border-border/30">
          {frontmatter.thumbnail ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground/50">
              NO IMAGE
            </div>
          )}
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5 z-10" />
        </div>
        
        <div className="flex flex-col gap-1.5 px-1 pb-1">
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors line-clamp-1">
            {frontmatter.title}
          </h3>
          <p className="text-sm text-foreground/70 font-medium line-clamp-2 min-h-[40px] leading-snug">
            {frontmatter.description || "A comprehensive project overview showcasing full-stack capabilities."}
          </p>
          <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-border/40">
            {frontmatter.tech.slice(0, 3).map((t) => (
              <span key={t} className="font-semibold text-[11px] tracking-wide text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60">
                {t}
              </span>
            ))}
            {frontmatter.tech.length > 3 && (
              <span className="font-semibold text-[11px] tracking-wide text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60">
                +{frontmatter.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </ViewTransitionLink>
  );
}
