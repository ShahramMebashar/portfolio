"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ViewTransitionLink } from "./ViewTransitionLink";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: "/ku/blog", label: dict.nav.blog },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/experience`, label: dict.nav.experience },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Desktop + Mobile Top Bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
      )}>
        <header className="flex items-center justify-between w-full max-w-5xl mx-auto px-6 md:px-12 py-4">
          {/* Logo */}
          <ViewTransitionLink
            href={`/${locale}`}
            className="font-mono text-sm font-bold tracking-tight text-foreground no-underline hover:text-primary transition-colors"
          >
            &lt;shahram /&gt;
          </ViewTransitionLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ViewTransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 no-underline",
                    isActive
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </ViewTransitionLink>
              );
            })}

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-muted/50 transition-colors relative z-[60]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </header>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-500",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-background transition-opacity duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Nav Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center gap-2">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <ViewTransitionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-3xl font-semibold tracking-tight no-underline transition-all duration-500",
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ transitionDelay: isOpen ? `${150 + i * 60}ms` : "0ms" }}
                >
                  {item.label}
                </ViewTransitionLink>
              );
            })}
          </nav>

          <div className={cn(
            "flex items-center gap-6 mt-12 transition-all duration-500",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )} style={{ transitionDelay: isOpen ? `${150 + navItems.length * 60}ms` : "0ms" }}>
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
