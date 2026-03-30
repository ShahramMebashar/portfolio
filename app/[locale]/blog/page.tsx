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
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <a href="/ku/blog" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "4px", background: "var(--accent)", color: "white", textDecoration: "none" }}>
          {dict.blog.all_posts}
        </a>
        {topics.map((topic) => (
          <a key={topic} href={`/ku/blog/${topic}`} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "4px", border: "1px solid var(--line)", color: "var(--text-muted)", textDecoration: "none" }}>
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
