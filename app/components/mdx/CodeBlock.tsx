"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  title?: string;
}

export function CodeBlock({ children, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const code = (children as any)?.props?.children?.props?.children;
    if (typeof code === "string") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ position: "relative", margin: "1.5rem 0" }}>
      {title && (
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg)",
          }}
        >
          {title}
        </div>
      )}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          insetInlineEnd: "0.75rem",
          top: title ? "2.75rem" : "0.75rem",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          background: "transparent",
          border: "1px solid var(--line)",
          borderRadius: "4px",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </div>
  );
}
