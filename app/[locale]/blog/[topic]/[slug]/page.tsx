import { notFound } from "next/navigation";
import { isLocale, isTopic } from "@/lib/types";
import type { BlogFrontmatter, Topic } from "@/lib/types";
import { getPostSource, getPostsByTopic } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import TableOfContents from "@/app/components/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; topic: string; slug: string }> }) {
  const { locale, topic, slug } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const source = await getPostSource(topic, slug);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<BlogFrontmatter>(source);

  const topicPosts = await getPostsByTopic(topic as Topic);
  const currentIndex = topicPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? topicPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < topicPosts.length - 1 ? topicPosts[currentIndex + 1] : null;

  return (
    <div className="layout">
      <a href={`/ku/blog/${topic}`} className="text-primary text-sm">← {topic}</a>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">{frontmatter.title}</h1>
          <div className="flex gap-4 font-mono text-sm text-muted-foreground mt-4 items-center">
            <span>{frontmatter.date}</span>
            <span>{frontmatter.readingTime} خولەک خوێندنەوە</span>
            <Badge variant="secondary" className="font-mono">{topic}</Badge>
          </div>
        </header>
        <div className="grid grid-cols-[1fr_200px] gap-12">
          <div className="prose">{content}</div>
          <aside className="sticky top-24 self-start">
            <TableOfContents />
          </aside>
        </div>
      </article>
      <Separator className="mt-12" />
      <nav className="flex justify-between pt-6 text-sm">
        {prevPost ? (<a href={`/ku/blog/${prevPost.topic}/${prevPost.slug}`} className="text-muted-foreground no-underline hover:text-foreground">← {prevPost.frontmatter.title}</a>) : <span />}
        {nextPost ? (<a href={`/ku/blog/${nextPost.topic}/${nextPost.slug}`} className="text-muted-foreground no-underline hover:text-foreground">{nextPost.frontmatter.title} →</a>) : <span />}
      </nav>
    </div>
  );
}
