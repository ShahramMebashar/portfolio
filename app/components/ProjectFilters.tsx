"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  categories: string[];
  techTags: string[];
  labels: { all: string; fullstack: string; backend: string; frontend: string };
}

export default function ProjectFilters({ categories, labels }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const activeCategory = searchParams.get("category") ?? "all";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") { params.delete(key); } else { params.set(key, value); }
    
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      });
    } else {
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }
  }

  const categoryLabels: Record<string, string> = { all: labels.all, fullstack: labels.fullstack, backend: labels.backend, frontend: labels.frontend };

  return (
    <div className="flex gap-4 flex-wrap mb-12">
      {["all", ...categories].map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setFilter("category", cat)}
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all duration-300 outline-none",
              isActive 
                ? "bg-foreground text-background scale-105" 
                : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
            disabled={isPending}
          >
            {categoryLabels[cat] ?? cat}
          </button>
        );
      })}
    </div>
  );
}
