import type { Project, Locale } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const { frontmatter, slug } = project;
  return (
    <a href={`/${locale}/projects/${slug}`} className="block no-underline group">
      <Card className="overflow-hidden transition-colors group-hover:border-primary/50">
        {frontmatter.thumbnail && (
          <div
            className="h-[200px] bg-muted bg-cover bg-center"
            style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
          />
        )}
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-2">{frontmatter.title}</h3>
          <div className="flex gap-1.5 flex-wrap">
            {frontmatter.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
