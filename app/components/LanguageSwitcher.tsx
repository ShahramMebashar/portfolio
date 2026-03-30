"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Hide on blog pages (blog is Kurdish-only)
  if (pathname.includes("/blog")) return null;

  const targetLocale = locale === "en" ? "ku" : "en";
  const label = locale === "en" ? "\u06A9\u0648\u0631\u062F\u06CC" : "EN";

  // Replace locale prefix in current path
  const segments = pathname.split("/");
  segments[1] = targetLocale;
  const targetPath = segments.join("/");

  return (
    <a
      href={targetPath}
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
        textDecoration: "none",
        color: "var(--text-muted)",
      }}
    >
      {label}
    </a>
  );
}
