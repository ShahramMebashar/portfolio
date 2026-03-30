import { notFound } from "next/navigation";
import { isLocale, isTopic } from "@/lib/types";
import type { BlogFrontmatter, Topic } from "@/lib/types";
import { getPostSource, getPostsByTopic } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import TableOfContents from "@/app/components/TableOfContents";
import { ViewTransitionLink } from "@/app/components/ViewTransitionLink";

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
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <ViewTransitionLink href={`/ku/blog/${topic}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground font-semibold hover:text-foreground transition-colors mb-12 animate-reveal">
          ← {topic}
        </ViewTransitionLink>
        <article className="animate-reveal delay-1">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">{frontmatter.title}</h1>
            <div className="flex gap-4 font-semibold text-sm text-muted-foreground mt-6 items-center flex-wrap">
              <span>{frontmatter.date}</span>
              <span className="w-1.5 h-1.5 bg-border rounded-full" />
              <span>{frontmatter.readingTime} خولەک خوێندنەوە</span>
              <span className="w-1.5 h-1.5 bg-border rounded-full" />
              <span className="text-foreground px-3 py-1 bg-muted/50 border border-border/50 rounded-md capitalize">{topic}</span>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
            <div className="prose max-w-none w-full text-[1.1rem]">
              {content}
            </div>
            <aside className="hidden lg:block sticky top-32 self-start rounded-xl bg-card border border-border p-6 shadow-sm">
              <TableOfContents />
            </aside>
          </div>
        </article>
        
        <div className="w-full h-px bg-border/50 my-16 animate-reveal delay-2" />
        
        <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm font-semibold animate-reveal delay-2">
          {prevPost ? (
            <ViewTransitionLink href={`/ku/blog/${prevPost.topic}/${prevPost.slug}`} className="flex flex-col gap-1 text-muted-foreground no-underline hover:text-foreground transition-colors max-w-[200px]">
              <span className="text-xs uppercase tracking-widest text-muted-foreground/60">Previous</span>
              <span className="truncate">{prevPost.frontmatter.title}</span>
            </ViewTransitionLink>
          ) : <span />}
          {nextPost ? (
            <ViewTransitionLink href={`/ku/blog/${nextPost.topic}/${nextPost.slug}`} className="flex flex-col gap-1 text-muted-foreground no-underline hover:text-foreground transition-colors max-w-[200px] sm:text-end">
              <span className="text-xs uppercase tracking-widest text-muted-foreground/60">Next</span>
              <span className="truncate">{nextPost.frontmatter.title}</span>
            </ViewTransitionLink>
          ) : <span />}
        </nav>
      </div>
    </div>
  );
}
