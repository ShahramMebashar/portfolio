import type { Project, Locale } from "@/lib/types";
import TechIcons from "./TechIcons";
import Link from "next/link";

export default function ProjectCard({ project, locale, basePath = "projects" }: { project: Project; locale: Locale; basePath?: string }) {
  const { frontmatter, slug } = project;
  return (
    <Link href={`/${locale}/${basePath}/${slug}`} className="group block no-underline focus:outline-none">
      <div className="flex flex-col gap-5 p-5 md:p-6 border border-border/60 hover:border-border hover:shadow-sm rounded-2xl transition-all duration-300 bg-card">
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
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground transition-colors line-clamp-1">
            {frontmatter.title}
          </h3>
          <p className="text-[15px] text-foreground/70 font-medium line-clamp-2 min-h-[44px] leading-snug">
            {frontmatter.description || "A comprehensive project overview showcasing full-stack capabilities."}
          </p>
          <div className="mt-3 pt-3 border-t border-border/40">
            <TechIcons items={frontmatter.tech} size="sm" max={4} />
          </div>
        </div>
      </div>
    </Link>
  );
}
