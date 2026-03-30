import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import BlogCard from "@/app/components/BlogCard";
import { Button } from "@/components/ui/button";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const projects = await getAllProjects(locale as Locale);
  const posts = await getAllPosts();

  const featuredProjects = projects.filter((p) => p.frontmatter.featured).slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="layout">
      <section className="hero animate-reveal">
        <p className="font-mono text-primary text-sm">Shaho</p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight mt-2">{dict.home.hero_title}</h1>
        <p className="text-muted-foreground text-lg max-w-[600px] mt-2">{dict.home.hero_subtitle}</p>
      </section>

      <section className="section animate-reveal delay-1">
        <div>
          <span className="font-mono text-sm text-muted-foreground">01</span>
          <h2>{dict.home.expertise}</h2>
        </div>
        <div className="expertise-grid">
          <div>
            <h3 className="font-mono text-sm">Frontend</h3>
            <p className="text-muted-foreground text-sm">React, Next.js, TypeScript, Vue.js</p>
          </div>
          <div>
            <h3 className="font-mono text-sm">Backend</h3>
            <p className="text-muted-foreground text-sm">Go, Laravel, Node.js, PostgreSQL</p>
          </div>
          <div>
            <h3 className="font-mono text-sm">Data & DevOps</h3>
            <p className="text-muted-foreground text-sm">Redis, Docker, CI/CD, AWS</p>
          </div>
        </div>
      </section>

      <section className="section animate-reveal delay-2">
        <div>
          <span className="font-mono text-sm text-muted-foreground">02</span>
          <h2>{dict.home.selected_work}</h2>
        </div>
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
            ))}
          </div>
          <a href={`/${locale}/projects`} className="inline-block mt-6 text-primary text-sm">
            {dict.home.view_all_projects} →
          </a>
        </div>
      </section>

      <section className="section animate-reveal delay-3">
        <div>
          <span className="font-mono text-sm text-muted-foreground">03</span>
          <h2>{dict.home.latest_posts}</h2>
        </div>
        <div>
          <div className="list-wrapper">
            {latestPosts.map((post) => (
              <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
            ))}
          </div>
          <a href="/ku/blog" className="inline-block mt-6 text-primary text-sm">
            {dict.home.view_all_posts} →
          </a>
        </div>
      </section>

      <section className="text-center py-16 animate-reveal delay-4">
        <h2>{dict.home.get_in_touch}</h2>
        <Button asChild className="mt-4 font-mono">
          <a href="mailto:hello@shaho.dev">hello@shaho.dev</a>
        </Button>
      </section>
    </div>
  );
}
