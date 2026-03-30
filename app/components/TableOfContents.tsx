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
    <nav style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
      <h4 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
        ناوەڕۆک
      </h4>
      {headings.map((h) => (
        <a key={h.id} href={`#${h.id}`} style={{ display: "block", paddingInlineStart: h.level === 3 ? "1rem" : "0", color: "var(--text-muted)", textDecoration: "none" }}>
          {h.text}
        </a>
      ))}
    </nav>
  );
}
