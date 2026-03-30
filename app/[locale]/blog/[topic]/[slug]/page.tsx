import { notFound } from "next/navigation";
import { isLocale, isTopic } from "@/lib/types";
import type { BlogFrontmatter, Topic } from "@/lib/types";
import { getPostSource, getPostsByTopic } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import TableOfContents from "@/app/components/TableOfContents";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; topic: string; slug: string }> }) {
  const { locale, topic, slug } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const source = await getPostSource(topic, slug);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<BlogFrontmatter>(source);

  // Previous/next post navigation
  const topicPosts = await getPostsByTopic(topic as Topic);
  const currentIndex = topicPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? topicPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < topicPosts.length - 1 ? topicPosts[currentIndex + 1] : null;

  return (
    <div className="layout">
      <a href={`/ku/blog/${topic}`} style={{ color: "var(--accent)", fontSize: "0.9rem" }}>← {topic}</a>
      <article style={{ marginTop: "2rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>{frontmatter.title}</h1>
          <div style={{ display: "flex", gap: "1rem", fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            <span>{frontmatter.date}</span>
            <span>{frontmatter.readingTime} خولەک خوێندنەوە</span>
            <span style={{ color: "var(--accent)" }}>{topic}</span>
          </div>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "3rem" }}>
          <div className="prose">{content}</div>
          <aside style={{ position: "sticky", top: "6rem", alignSelf: "start" }}>
            <TableOfContents />
          </aside>
        </div>
      </article>
      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line)", fontSize: "0.9rem" }}>
        {prevPost ? (<a href={`/ku/blog/${prevPost.topic}/${prevPost.slug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>← {prevPost.frontmatter.title}</a>) : <span />}
        {nextPost ? (<a href={`/ku/blog/${nextPost.topic}/${nextPost.slug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>{nextPost.frontmatter.title} →</a>) : <span />}
      </nav>
    </div>
  );
}
