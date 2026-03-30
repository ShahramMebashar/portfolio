import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllTopics } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";
import { Button } from "@/components/ui/button";

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
        <Button size="sm" className="font-mono">{dict.blog.all_posts}</Button>
        {topics.map((topic) => (
          <Button key={topic} variant="outline" size="sm" className="font-mono" asChild>
            <a href={`/ku/blog/${topic}`}>{topic}</a>
          </Button>
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
