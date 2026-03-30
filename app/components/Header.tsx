"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: "/ku/blog", label: dict.nav.blog },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/experience`, label: dict.nav.experience },
  ];

  return (
    <header className="layout flex justify-between items-center pb-[2vw] mb-[15vh]">
      <a href={`/${locale}`} className="font-mono font-semibold text-primary no-underline">
        shaho<span className="text-muted-foreground">.dev</span>
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm no-underline transition-colors",
              pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        ))}
        <LanguageSwitcher locale={locale} />
        <ThemeToggle />
      </nav>

      <button
        className="md:hidden font-mono text-sm uppercase tracking-widest bg-transparent border-none cursor-pointer text-foreground z-[1000]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      {menuOpen && (
        <div className="mobile-overlay open" onClick={() => setMenuOpen(false)}>
          <div className="mobile-overlay-bg" />
          <nav className="mobile-nav">
            {navItems.map((item, i) => (
              <a key={item.href} href={item.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <div className="flex justify-center gap-4">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
