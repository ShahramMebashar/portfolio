"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";

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
    <header className="header">
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <a
          href={`/${locale}`}
          style={{ fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
        >
          shaho<span style={{ color: "var(--text-muted)" }}>.dev</span>
        </a>

        <div className="desktop-nav" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                color: pathname === item.href ? "var(--text)" : "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher locale={locale} />
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay open" onClick={() => setMenuOpen(false)}>
          <div className="mobile-overlay-bg" />
          <nav className="mobile-nav">
            {navItems.map((item, i) => (
              <a key={item.href} href={item.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <LanguageSwitcher locale={locale} />
          </nav>
        </div>
      )}
    </header>
  );
}
