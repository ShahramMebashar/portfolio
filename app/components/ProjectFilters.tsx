"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
      {["all", ...categories].map((cat) => (
        <button key={cat} onClick={() => setFilter("category", cat)} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", padding: "0.3rem 0.75rem", borderRadius: "4px", border: activeCategory === cat ? "none" : "1px solid var(--line)", background: activeCategory === cat ? "var(--accent)" : "transparent", color: activeCategory === cat ? "white" : "var(--text-muted)", cursor: "pointer" }}>
          {categoryLabels[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}
