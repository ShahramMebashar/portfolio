"use client";

import { useEffect, useState } from "react";

interface TOCItem { id: string; text: string; level: number; }

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    const elements = document.querySelectorAll("article h2, article h3");
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm leading-relaxed">
      <h4 className="font-mono text-xs text-muted-foreground mb-2">ناوەڕۆک</h4>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-muted-foreground no-underline hover:text-foreground transition-colors ${h.level === 3 ? "ps-4" : ""}`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
