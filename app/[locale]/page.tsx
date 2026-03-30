import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import BlogCard from "@/app/components/BlogCard";

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
      {/* Hero */}
      <section className="hero" style={{ animation: "reveal 0.8s ease forwards" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontSize: "0.9rem" }}>
          Shaho
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, margin: "0.5rem 0" }}>
          {dict.home.hero_title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px" }}>
          {dict.home.hero_subtitle}
        </p>
      </section>

      {/* Expertise */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.1s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>01</span>
          <h2>{dict.home.expertise}</h2>
        </div>
        <div className="expertise-grid">
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Frontend</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>React, Next.js, TypeScript, Vue.js</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Backend</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Go, Laravel, Node.js, PostgreSQL</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Data & DevOps</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Redis, Docker, CI/CD, AWS</p>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.2s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>02</span>
          <h2>{dict.home.selected_work}</h2>
        </div>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
            ))}
          </div>
          <a href={`/${locale}/projects`} style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--accent)", fontSize: "0.9rem" }}>
            {dict.home.view_all_projects} →
          </a>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.3s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>03</span>
          <h2>{dict.home.latest_posts}</h2>
        </div>
        <div>
          <div className="list-wrapper">
            {latestPosts.map((post) => (
              <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
            ))}
          </div>
          <a href="/ku/blog" style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--accent)", fontSize: "0.9rem" }}>
            {dict.home.view_all_posts} →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "4rem 0", animation: "reveal 0.8s ease forwards", animationDelay: "0.4s", opacity: 0 }}>
        <h2>{dict.home.get_in_touch}</h2>
        <a
          href="mailto:hello@shaho.dev"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "var(--accent)",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.9rem",
          }}
        >
          hello@shaho.dev
        </a>
      </section>
    </div>
  );
}
