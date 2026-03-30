"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  if (pathname.includes("/blog")) return null;

  const targetLocale = locale === "en" ? "ku" : "en";
  const label = locale === "en" ? "کوردی" : "EN";

  const segments = pathname.split("/");
  segments[1] = targetLocale;
  const targetPath = segments.join("/");

  return (
    <a href={targetPath} className="font-mono text-sm tracking-widest text-muted-foreground no-underline hover:text-foreground transition-colors">
      {label}
    </a>
  );
}
