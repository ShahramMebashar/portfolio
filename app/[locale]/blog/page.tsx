import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllTopics } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";
export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();

  const dict = await getDictionary(locale);
  const posts = await getAllPosts();
  const topics = getAllTopics();

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.blog.title}</h1>
      </section>
      <div className="flex gap-3 mb-8 flex-wrap">
        <span className="inline-flex items-center px-3 py-1.5 bg-primary text-primary-foreground rounded-lg font-mono text-sm">{dict.blog.all_posts}</span>
        {topics.map((topic) => (
          <a key={topic} href={`/ku/blog/${topic}`} className="inline-flex items-center px-3 py-1.5 border border-border rounded-lg font-mono text-sm text-muted-foreground no-underline hover:bg-muted transition-colors">
            {topic}
          </a>
        ))}
      </div>
      <div className="list-wrapper">
        {posts.map((post) => (
          <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
        ))}
      </div>
    </div>
  );
}
