import { notFound } from "next/navigation";
import { isLocale, isTopic, topics } from "@/lib/types";
import { getPostsByTopic } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";

export function generateStaticParams() {
  return topics.map((topic) => ({ locale: "ku", topic }));
}

export default async function TopicPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const posts = await getPostsByTopic(topic);

  return (
    <div className="layout">
      <section className="hero">
        <h1 className="font-mono">{topic}</h1>
        <p className="text-muted-foreground">{posts.length} بابەت</p>
      </section>
      <div className="list-wrapper">
        {posts.map((post) => (<BlogCard key={post.slug} post={post} />))}
      </div>
      <a href="/ku/blog" className="text-primary text-sm">← هەموو بابەتەکان</a>
    </div>
  );
}
