import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllTopics } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";
import { ViewTransitionLink } from "@/app/components/ViewTransitionLink";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();

  const dict = await getDictionary(locale);
  const posts = await getAllPosts();
  const topics = getAllTopics();

  return (
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="animate-reveal max-w-4xl">
        <section className="mb-12 md:mb-16 flex flex-col items-start py-0">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight font-extrabold text-foreground">
            {dict.blog.title}
          </h1>
        </section>
        <div className="flex gap-4 mb-16 flex-wrap animate-reveal delay-1">
          <ViewTransitionLink href="/ku/blog" className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md font-semibold text-sm no-underline shadow-sm transition-transform hover:scale-105 active:scale-95">
            {dict.blog.all_posts}
          </ViewTransitionLink>
          {topics.map((topic) => (
            <ViewTransitionLink key={topic} href={`/ku/blog/${topic}`} className="inline-flex items-center px-4 py-2 border border-border rounded-md font-semibold text-sm text-muted-foreground no-underline hover:border-foreground hover:text-foreground transition-all duration-300">
              {topic}
            </ViewTransitionLink>
          ))}
        </div>
        <div className="flex flex-col gap-12 animate-reveal delay-2">
          {posts.map((post) => (
            <div key={`${post.topic}/${post.slug}`} className="border-b border-border/50 pb-8 last:border-0 last:pb-0">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
