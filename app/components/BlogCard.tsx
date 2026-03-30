import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/ku/blog/${post.topic}/${post.slug}`}
      className="list-item"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{post.frontmatter.title}</h3>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>
          {post.frontmatter.readingTime} خولەک
        </span>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.5rem 0 0" }}>
        {post.frontmatter.excerpt}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--accent)", background: "var(--accent)10", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
          {post.topic}
        </span>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
          {post.frontmatter.date}
        </span>
      </div>
    </a>
  );
}
