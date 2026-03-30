"use client";

import { useState } from "react";

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div style={{ margin: "1.5rem 0", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            style={{
              padding: "0.5rem 1rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              background: "transparent",
              border: "none",
              borderBottom: active === i ? "2px solid var(--accent)" : "2px solid transparent",
              color: active === i ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div style={{ padding: "1rem" }}>{childArray[active]}</div>
    </div>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
