import type { BlogPost } from "@/lib/types";
import { ViewTransitionLink } from "./ViewTransitionLink";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <ViewTransitionLink href={`/ku/blog/${post.topic}/${post.slug}`} className="group flex flex-col gap-3 no-underline focus:outline-none w-full p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-300">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 mt-1 items-center">
          <span className="font-semibold text-[11px] tracking-wide text-muted-foreground bg-muted border border-border/50 px-2 py-0.5 rounded-md capitalize">{post.topic}</span>
          <span className="text-xs text-muted-foreground font-medium">{post.frontmatter.date}</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-snug">
          {post.frontmatter.title}
        </h3>
        <p className="text-foreground/70 font-medium line-clamp-2 leading-relaxed">
          {post.frontmatter.excerpt}
        </p>
      </div>
    </ViewTransitionLink>
  );
}
