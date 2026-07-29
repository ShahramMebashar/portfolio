"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import { locales } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, { text: string; lang: string; className?: string }> = {
  en: { text: "EN", lang: "en" },
  // Noto Sans Arabic explicitly: on /en the page font is Geist, which has no
  // Arabic coverage and would fall back to an OS face.
  ku: { text: "کوردی", lang: "ku", className: "font-arabic" },
};

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  if (pathname.includes("/blog")) return null;

  const pathFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/");
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-lg border border-border/60 p-0.5"
    >
      {locales.map((code) => {
        const { text, lang, className } = LABELS[code];
        const isActive = code === locale;
        const shared = "px-2 py-1 rounded-md text-xs leading-4 transition-colors duration-200 no-underline";

        // The active locale is inert text, not a link to the page you're already on.
        return isActive ? (
          <span
            key={code}
            lang={lang}
            aria-current="true"
            className={cn(shared, "bg-muted font-medium text-foreground", className)}
          >
            {text}
          </span>
        ) : (
          <Link
            key={code}
            href={pathFor(code)}
            lang={lang}
            className={cn(shared, "text-muted-foreground hover:bg-muted/50 hover:text-foreground", className)}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}
