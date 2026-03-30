"use client";

import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ViewTransitionLink } from "./ViewTransitionLink";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: "/ku/blog", label: dict.nav.blog },
    { href: `/${locale}/projects`, label: "Portfolio" }, // Mapped from your screenshot 'Portfolio'
    { href: `/${locale}/experience`, label: "Side Projects" }, // Mapped from screenshot 'Side Projects'
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  return (
    <div className="w-full flex justify-center px-4 md:px-8 pt-8">
      <header className="flex items-center justify-between w-full max-w-6xl">
        <ViewTransitionLink href={`/${locale}`} className="flex items-center gap-2 font-bold tracking-tight text-lg text-foreground no-underline">
          &lt; Shahram /&gt;
        </ViewTransitionLink>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ViewTransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-semibold transition-colors no-underline",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </ViewTransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 pl-6 border-l border-border">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </button>
      </header>
    </div>
  );
}
