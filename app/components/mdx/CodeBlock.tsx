"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

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
    <div className="relative my-6">
      {title && (
        <div className="font-mono text-xs text-muted-foreground px-4 py-2 border-b border-border bg-muted/50">
          {title}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleCopy}
        className="absolute end-3 top-3 text-muted-foreground"
        aria-label="Copy code"
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      </Button>
      {children}
    </div>
  );
}
