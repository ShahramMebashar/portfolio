"use client";

import { useState } from "react";
import { Collapsible as ShadcnCollapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export function Collapsible({ title, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <ShadcnCollapsible open={open} onOpenChange={setOpen} className="my-6 border border-border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="flex items-center gap-2 w-full p-3 bg-muted/50 text-sm text-foreground cursor-pointer text-start">
        <ChevronRight className={cn("size-4 transition-transform", open && "rotate-90")} />
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-2">
        {children}
      </CollapsibleContent>
    </ShadcnCollapsible>
  );
}
