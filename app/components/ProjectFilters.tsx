"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProjectFiltersProps {
  categories: string[];
  techTags: string[];
  labels: { all: string; fullstack: string; backend: string; frontend: string };
}

export default function ProjectFilters({ categories, techTags, labels }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchParams.get("category") ?? "all";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") { params.delete(key); } else { params.set(key, value); }
    router.push(`${pathname}?${params.toString()}`);
  }

  const categoryLabels: Record<string, string> = { all: labels.all, fullstack: labels.fullstack, backend: labels.backend, frontend: labels.frontend };

  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {["all", ...categories].map((cat) => (
        <Button
          key={cat}
          variant={activeCategory === cat ? "default" : "outline"}
          size="sm"
          className="font-mono"
          onClick={() => setFilter("category", cat)}
        >
          {categoryLabels[cat] ?? cat}
        </Button>
      ))}
    </div>
  );
}
