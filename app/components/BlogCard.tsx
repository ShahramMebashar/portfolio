import type { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/ku/blog/${post.topic}/${post.slug}`} className="list-item block no-underline text-inherit">
      <div className="flex justify-between items-baseline gap-4">
        <h3 className="text-lg font-medium">{post.frontmatter.title}</h3>
        <span className="font-mono text-xs text-muted-foreground shrink-0">
          {post.frontmatter.readingTime} خولەک
        </span>
      </div>
      <p className="text-muted-foreground text-sm mt-2">{post.frontmatter.excerpt}</p>
      <div className="flex gap-2 mt-2 items-center">
        <Badge variant="secondary" className="font-mono text-xs">{post.topic}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{post.frontmatter.date}</span>
      </div>
    </a>
  );
}
