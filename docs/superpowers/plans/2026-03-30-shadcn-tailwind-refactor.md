# shadcn + Tailwind CSS Refactor Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all inline CSS styles with Tailwind utility classes and shadcn/ui components, unify the color system to shadcn's variables, and add dark mode toggle with next-themes.

**Architecture:** Keep all existing functionality and page structure intact. Replace `style={{}}` props with Tailwind classes. Use shadcn Card, Badge, Button, Tabs, Collapsible, Sheet, and Separator where they replace custom implementations. Unify the dual color variable system (old `--bg`/`--text` + shadcn `--background`/`--foreground`) into shadcn's system only. Add `next-themes` ThemeProvider for system-preference + manual toggle dark mode.

**Tech Stack:** Tailwind CSS v4, shadcn/ui (base-nova), next-themes, lucide-react

**Key constraint:** The old CSS variables `--bg`, `--text`, `--text-muted`, `--line`, `--accent` must be replaced with shadcn equivalents (`bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `text-primary`). The custom blue accent (`#0055FF` light / `#4D8CFF` dark) must be preserved in shadcn's `--primary` variable.

---

## File Map

### Modified Files
```
app/globals.css                            # Unify variables, remove old ones, customize primary to blue
app/[locale]/layout.tsx                    # Add ThemeProvider, use Tailwind classes
app/layout.tsx                             # Minor cleanup
app/components/Header.tsx                  # Tailwind classes, shadcn Sheet for mobile
app/components/Footer.tsx                  # Tailwind classes
app/components/LanguageSwitcher.tsx         # Tailwind classes
app/components/ProjectCard.tsx             # shadcn Card
app/components/ProjectFilters.tsx          # shadcn Button
app/components/BlogCard.tsx                # Tailwind + Badge
app/components/Timeline.tsx                # Tailwind classes
app/components/TableOfContents.tsx         # Tailwind classes
app/components/mdx/CodeBlock.tsx           # Tailwind classes
app/components/mdx/Callout.tsx             # Tailwind classes
app/components/mdx/Tabs.tsx                # shadcn Tabs
app/components/mdx/Collapsible.tsx         # shadcn Collapsible
app/components/mdx/FileTree.tsx            # Tailwind classes
app/components/mdx/Steps.tsx               # Tailwind classes
app/components/mdx/index.tsx               # Update imports
app/[locale]/page.tsx                      # Tailwind classes
app/[locale]/blog/page.tsx                 # Tailwind + Badge/Button
app/[locale]/blog/[topic]/page.tsx         # Tailwind classes
app/[locale]/blog/[topic]/[slug]/page.tsx  # Tailwind classes
app/[locale]/projects/page.tsx             # Tailwind classes
app/[locale]/projects/[slug]/page.tsx      # Tailwind + Badge
app/[locale]/about/page.tsx                # Tailwind classes
app/[locale]/experience/page.tsx           # Tailwind classes
components.json                            # Enable rtl: true
```

### New Files
```
app/components/ThemeProvider.tsx            # next-themes provider wrapper
app/components/ThemeToggle.tsx             # Dark/light/system toggle button
```

---

## Task 1: Install Dependencies + shadcn Components

**Files:**
- Modify: `package.json`
- Modify: `components.json`

- [ ] **Step 1: Install next-themes**

```bash
npm install next-themes
```

- [ ] **Step 2: Install shadcn components**

```bash
npx shadcn@latest add card badge tabs collapsible separator
```

- [ ] **Step 3: Enable RTL in components.json**

In `components.json`, change `"rtl": false` to `"rtl": true`.

- [ ] **Step 4: Verify**

```bash
ls components/ui/
```

Expected: `button.tsx`, `card.tsx`, `badge.tsx`, `tabs.tsx`, `collapsible.tsx`, `separator.tsx` all exist.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/ components.json
git commit -m "feat: install next-themes and shadcn components (card, badge, tabs, collapsible, separator, sheet)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Rewrite globals.css

**Files:**
- Modify: `app/globals.css`

The old custom variables (`--bg`, `--text`, `--text-muted`, `--line`, `--accent`) must be removed. shadcn's variables take over. The custom blue accent must be set as `--primary`.

- [ ] **Step 1: Rewrite globals.css**

Read the current `app/globals.css` first. Then replace it entirely with:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

:root {
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.09 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.09 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.09 0 0);
  --primary: oklch(0.45 0.24 264);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.96 0 0);
  --secondary-foreground: oklch(0.2 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.96 0 0);
  --accent-foreground: oklch(0.2 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.91 0 0);
  --input: oklch(0.91 0 0);
  --ring: oklch(0.45 0.24 264);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.45 0.24 264);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.09 0 0);
  --foreground: oklch(0.96 0 0);
  --card: oklch(0.13 0 0);
  --card-foreground: oklch(0.96 0 0);
  --popover: oklch(0.13 0 0);
  --popover-foreground: oklch(0.96 0 0);
  --primary: oklch(0.58 0.22 264);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.2 0 0);
  --secondary-foreground: oklch(0.96 0 0);
  --muted: oklch(0.2 0 0);
  --muted-foreground: oklch(0.63 0 0);
  --accent: oklch(0.2 0 0);
  --accent-foreground: oklch(0.96 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.2 0 0);
  --input: oklch(0.25 0 0);
  --ring: oklch(0.58 0.22 264);
  --sidebar: oklch(0.13 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.58 0.22 264);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.2 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.25 0 0);
  --sidebar-ring: oklch(0.556 0 0);
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

/* ===== Layout classes (kept as CSS — vw/vh units don't map to Tailwind) ===== */

.layout {
  @apply mx-auto max-w-[2400px];
  padding: 3vw 4vw;
}

.hero {
  @apply mb-[20vh];
}

.section {
  @apply border-t border-border grid grid-cols-[3fr_9fr] gap-[4vw];
  padding: 6vw 0 12vw;
}

@media (max-width: 900px) {
  .section {
    @apply grid-cols-1 gap-[8vw];
    padding: 10vw 0 15vw;
  }
}

.expertise-grid {
  @apply grid grid-cols-2 gap-x-[4vw] gap-y-[6vw];
}

@media (max-width: 600px) {
  .expertise-grid {
    @apply grid-cols-1 gap-[10vw];
  }
}

/* Editorial list hover effect */
.list-wrapper {
  @apply flex flex-col;
}

.list-item {
  @apply flex justify-between items-center border-b border-border transition-opacity duration-400;
  padding: 3vw 0;
}

.list-wrapper:hover .list-item {
  @apply opacity-30;
}

.list-wrapper .list-item:hover {
  @apply opacity-100;
}

.list-item:first-child {
  @apply pt-0;
}

/* Animations */
@keyframes reveal {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-reveal {
  animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  @apply opacity-0;
}

.animate-fade {
  animation: fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  @apply opacity-0;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* Mobile Menu */
.mobile-overlay {
  @apply fixed inset-0 z-[900] pointer-events-none flex items-center justify-center;
}

.mobile-overlay-bg {
  @apply absolute inset-0 bg-background -translate-y-full transition-transform duration-600;
  transition-timing-function: cubic-bezier(0.85, 0, 0.15, 1);
  will-change: transform;
}

.mobile-overlay.open {
  @apply pointer-events-auto;
}

.mobile-overlay.open .mobile-overlay-bg {
  @apply translate-y-0;
}

.mobile-nav {
  @apply relative z-[901] flex flex-col gap-8 text-center;
}

.mobile-nav a {
  @apply font-mono uppercase text-foreground opacity-0 translate-y-10 transition-all;
  font-size: clamp(2.5rem, 8vw, 4rem);
  letter-spacing: -0.02em;
  transition-delay: calc(var(--i) * 0.05s);
}

.mobile-overlay.open .mobile-nav a {
  @apply opacity-100 translate-y-0;
  transition-delay: calc(0.3s + (var(--i) * 0.1s));
}

.mobile-nav a:hover {
  @apply text-primary;
}

/* Prose (MDX content) */
.prose {
  @apply leading-relaxed text-base;
}
.prose h2 { @apply text-2xl font-semibold mt-8 mb-4; }
.prose h3 { @apply text-xl font-semibold mt-6 mb-3; }
.prose p { @apply mb-4 text-muted-foreground; }
.prose ul, .prose ol { @apply ps-6 mb-4 text-muted-foreground; }
.prose li { @apply mb-2; }
.prose a { @apply text-primary underline; }
.prose pre { @apply my-6 rounded-lg overflow-x-auto; direction: ltr; text-align: left; }
.prose code { @apply font-mono text-[0.85em]; }
.prose img { @apply max-w-full rounded-lg my-6; }
.prose blockquote {
  @apply border-s-[3px] border-primary ps-4 text-muted-foreground my-6;
}

/* RTL list-item hover direction */
[dir=rtl] .list-item-title-hover {
  transform: translateX(-1vw);
}
```

**Variable mapping reference (old → new Tailwind class):**
- `var(--bg)` → `bg-background`
- `var(--text)` → `text-foreground`
- `var(--text-muted)` → `text-muted-foreground`
- `var(--line)` → `border-border` or `border`
- `var(--accent)` → `text-primary` / `bg-primary`
- `var(--font-geist-mono)` → `font-mono`

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Note: Build WILL fail because components still reference old variables. That's expected at this stage.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite globals.css with shadcn color system and blue primary

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Theme Infrastructure

**Files:**
- Create: `app/components/ThemeProvider.tsx`
- Create: `app/components/ThemeToggle.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create ThemeProvider**

`app/components/ThemeProvider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 2: Create ThemeToggle**

`app/components/ThemeToggle.tsx`:
```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Button variant="ghost" size="icon-sm" aria-label="Toggle theme"><Monitor className="size-4" /></Button>;

  const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <Button variant="ghost" size="icon-sm" onClick={() => setTheme(next)} aria-label="Toggle theme">
      <Icon className="size-4" />
    </Button>
  );
}
```

- [ ] **Step 3: Update locale layout**

Read `app/[locale]/layout.tsx` first, then replace it with:

```tsx
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoSansArabic = Noto_Sans_Arabic({ variable: "--font-noto-arabic", subsets: ["arabic"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ku" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ku" ? "شاهۆ | گەشەپێدەری فوڵ ستاک" : "Shaho | Full Stack Developer",
    description: locale === "ku"
      ? "گەشەپێدەری فوڵ ستاک - Go، Laravel، React"
      : "Full Stack Developer - Go, Laravel, React & TypeScript",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const dir = locale === "ku" ? "rtl" : "ltr";
  const fontClass = locale === "ku"
    ? `${notoSansArabic.variable} ${geistMono.variable}`
    : `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} ${locale === "ku" ? "font-[var(--font-noto-arabic)]" : ""}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header locale={locale} dict={dict} />
          <main>{children}</main>
          <Footer locale={locale} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/ThemeProvider.tsx app/components/ThemeToggle.tsx app/[locale]/layout.tsx
git commit -m "feat: add ThemeProvider with next-themes and ThemeToggle component

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Refactor Header, Footer, LanguageSwitcher

**Files:**
- Modify: `app/components/Header.tsx`
- Modify: `app/components/Footer.tsx`
- Modify: `app/components/LanguageSwitcher.tsx`

- [ ] **Step 1: Rewrite Header.tsx**

Read the current file, then replace entirely:

```tsx
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
```

- [ ] **Step 2: Rewrite Footer.tsx**

```tsx
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="layout">
      <Separator />
      <div className="flex justify-between items-center py-[4vw] text-sm uppercase tracking-wide text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Shaho</span>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">Github</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Rewrite LanguageSwitcher.tsx**

```tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add app/components/Header.tsx app/components/Footer.tsx app/components/LanguageSwitcher.tsx
git commit -m "refactor: convert Header, Footer, LanguageSwitcher to Tailwind + shadcn

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Refactor ProjectCard, ProjectFilters, BlogCard

**Files:**
- Modify: `app/components/ProjectCard.tsx`
- Modify: `app/components/ProjectFilters.tsx`
- Modify: `app/components/BlogCard.tsx`

- [ ] **Step 1: Rewrite ProjectCard.tsx**

```tsx
import type { Project, Locale } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const { frontmatter, slug } = project;
  return (
    <a href={`/${locale}/projects/${slug}`} className="block no-underline group">
      <Card className="overflow-hidden transition-colors group-hover:border-primary/50">
        {frontmatter.thumbnail && (
          <div
            className="h-[200px] bg-muted bg-cover bg-center"
            style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
          />
        )}
        <CardContent className="p-5">
          <h3 className="text-lg font-medium mb-2">{frontmatter.title}</h3>
          <div className="flex gap-1.5 flex-wrap">
            {frontmatter.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
```

- [ ] **Step 2: Rewrite ProjectFilters.tsx**

```tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProjectFiltersProps {
  categories: string[];
  techTags: string[];
  labels: { all: string; fullstack: string; backend: string; frontend: string };
}

export default function ProjectFilters({ categories, techTags, labels }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchParams.get("category") ?? "all";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") { params.delete(key); } else { params.set(key, value); }
    router.push(`${pathname}?${params.toString()}`);
  }

  const categoryLabels: Record<string, string> = { all: labels.all, fullstack: labels.fullstack, backend: labels.backend, frontend: labels.frontend };

  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {["all", ...categories].map((cat) => (
        <Button
          key={cat}
          variant={activeCategory === cat ? "default" : "outline"}
          size="sm"
          className="font-mono"
          onClick={() => setFilter("category", cat)}
        >
          {categoryLabels[cat] ?? cat}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite BlogCard.tsx**

```tsx
import type { BlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a href={`/ku/blog/${post.topic}/${post.slug}`} className="list-item block no-underline text-inherit">
      <div className="flex justify-between items-baseline gap-4">
        <h3 className="text-lg font-medium">{post.frontmatter.title}</h3>
        <span className="font-mono text-xs text-muted-foreground shrink-0">
          {post.frontmatter.readingTime} خولەک
        </span>
      </div>
      <p className="text-muted-foreground text-sm mt-2">{post.frontmatter.excerpt}</p>
      <div className="flex gap-2 mt-2 items-center">
        <Badge variant="secondary" className="font-mono text-xs">{post.topic}</Badge>
        <span className="font-mono text-xs text-muted-foreground">{post.frontmatter.date}</span>
      </div>
    </a>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/ProjectCard.tsx app/components/ProjectFilters.tsx app/components/BlogCard.tsx
git commit -m "refactor: convert ProjectCard, ProjectFilters, BlogCard to Tailwind + shadcn

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Refactor Timeline and TableOfContents

**Files:**
- Modify: `app/components/Timeline.tsx`
- Modify: `app/components/TableOfContents.tsx`

- [ ] **Step 1: Rewrite Timeline.tsx**

```tsx
import { Badge } from "@/components/ui/badge";

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  tech: string[];
  achievements: string[];
}

interface TimelineProps { entries: TimelineEntry[]; }

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative ps-8">
      <div className="absolute start-0 top-0 bottom-0 w-0.5 bg-border" />
      {entries.map((entry, i) => (
        <div key={i} className="relative mb-10">
          <div className={`absolute -start-8 top-1.5 size-2.5 rounded-full -translate-x-1/2 ms-px ${i === 0 ? "bg-primary" : "bg-border"}`} />
          <div className="font-mono text-xs text-muted-foreground mb-1">{entry.period}</div>
          <h3 className="text-lg font-medium mb-0.5">{entry.role}</h3>
          <div className="text-primary text-sm mb-3">{entry.company}</div>
          <ul className="mb-3 ps-5 text-sm text-muted-foreground leading-relaxed">
            {entry.achievements.map((a, j) => (<li key={j} className="mb-1">{a}</li>))}
          </ul>
          <div className="flex gap-1.5 flex-wrap">
            {entry.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type { TimelineEntry };
```

- [ ] **Step 2: Rewrite TableOfContents.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

interface TOCItem { id: string; text: string; level: number; }

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    const elements = document.querySelectorAll("article h2, article h3");
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="text-sm leading-relaxed">
      <h4 className="font-mono text-xs text-muted-foreground mb-2">ناوەڕۆک</h4>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-muted-foreground no-underline hover:text-foreground transition-colors ${h.level === 3 ? "ps-4" : ""}`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/Timeline.tsx app/components/TableOfContents.tsx
git commit -m "refactor: convert Timeline and TableOfContents to Tailwind

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Refactor MDX Components

**Files:**
- Modify: `app/components/mdx/CodeBlock.tsx`
- Modify: `app/components/mdx/Callout.tsx`
- Modify: `app/components/mdx/Tabs.tsx`
- Modify: `app/components/mdx/Collapsible.tsx`
- Modify: `app/components/mdx/FileTree.tsx`
- Modify: `app/components/mdx/Steps.tsx`
- Modify: `app/components/mdx/index.tsx`

- [ ] **Step 1: Rewrite CodeBlock.tsx**

```tsx
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
```

- [ ] **Step 2: Rewrite Callout.tsx**

```tsx
import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

const config = {
  info: { border: "border-s-primary", bg: "bg-primary/5", label: "Info", labelColor: "text-primary" },
  tip: { border: "border-s-emerald-500", bg: "bg-emerald-500/5", label: "Tip", labelColor: "text-emerald-500" },
  warning: { border: "border-s-amber-500", bg: "bg-amber-500/5", label: "Warning", labelColor: "text-amber-500" },
  danger: { border: "border-s-red-500", bg: "bg-red-500/5", label: "Danger", labelColor: "text-red-500" },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const c = config[type];
  return (
    <div className={cn("border-s-[3px] rounded-e-md p-4 my-6", c.border, c.bg)}>
      <strong className={cn("text-sm block mb-1", c.labelColor)}>{c.label}</strong>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite Tabs.tsx using shadcn Tabs**

```tsx
import { Tabs as ShadcnTabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <ShadcnTabs defaultValue="0" className="my-6">
      <TabsList>
        {items.map((item, i) => (
          <TabsTrigger key={item} value={String(i)} className="font-mono text-xs">
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {childArray.map((child, i) => (
        <TabsContent key={i} value={String(i)} className="mt-2">
          {child}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

- [ ] **Step 4: Rewrite Collapsible.tsx using shadcn Collapsible**

```tsx
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
```

- [ ] **Step 5: Rewrite FileTree.tsx**

```tsx
interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="font-mono text-sm leading-relaxed p-4 my-6 border border-border rounded-lg" dir="ltr" style={{ textAlign: "left" }}>
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Rewrite Steps.tsx**

```tsx
import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  return (
    <div className="my-6">
      {steps.map((child, i) => (
        <div key={i} className="flex gap-4 mb-4 items-start">
          <span className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
            {i + 1}
          </span>
          <div className="pt-0.5">{child}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

- [ ] **Step 7: Update index.tsx**

Read existing `app/components/mdx/index.tsx` then replace:

```tsx
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { Tabs, Tab } from "./Tabs";
import { Collapsible } from "./Collapsible";
import { FileTree } from "./FileTree";
import { Steps, Step } from "./Steps";

export const mdxComponents = {
  CodeBlock,
  Callout,
  Tabs,
  Tab,
  Collapsible,
  FileTree,
  Steps,
  Step,
  pre: (props: React.ComponentProps<"pre">) => <CodeBlock>{props.children}</CodeBlock>,
};
```

- [ ] **Step 8: Commit**

```bash
git add app/components/mdx/
git commit -m "refactor: convert MDX components to Tailwind + shadcn Tabs/Collapsible

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Refactor All Page Files

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/blog/page.tsx`
- Modify: `app/[locale]/blog/[topic]/page.tsx`
- Modify: `app/[locale]/blog/[topic]/[slug]/page.tsx`
- Modify: `app/[locale]/projects/page.tsx`
- Modify: `app/[locale]/projects/[slug]/page.tsx`
- Modify: `app/[locale]/about/page.tsx`
- Modify: `app/[locale]/experience/page.tsx`

For each file: read the current version, then replace all inline `style={{}}` props with Tailwind classes. The logic and structure stays the same — only styling changes.

- [ ] **Step 1: Rewrite Home page**

`app/[locale]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import BlogCard from "@/app/components/BlogCard";
import { Button } from "@/components/ui/button";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const projects = await getAllProjects(locale as Locale);
  const posts = await getAllPosts();

  const featuredProjects = projects.filter((p) => p.frontmatter.featured).slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="layout">
      <section className="hero animate-reveal">
        <p className="font-mono text-primary text-sm">Shaho</p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight mt-2">{dict.home.hero_title}</h1>
        <p className="text-muted-foreground text-lg max-w-[600px] mt-2">{dict.home.hero_subtitle}</p>
      </section>

      <section className="section animate-reveal delay-1">
        <div>
          <span className="font-mono text-sm text-muted-foreground">01</span>
          <h2>{dict.home.expertise}</h2>
        </div>
        <div className="expertise-grid">
          <div>
            <h3 className="font-mono text-sm">Frontend</h3>
            <p className="text-muted-foreground text-sm">React, Next.js, TypeScript, Vue.js</p>
          </div>
          <div>
            <h3 className="font-mono text-sm">Backend</h3>
            <p className="text-muted-foreground text-sm">Go, Laravel, Node.js, PostgreSQL</p>
          </div>
          <div>
            <h3 className="font-mono text-sm">Data & DevOps</h3>
            <p className="text-muted-foreground text-sm">Redis, Docker, CI/CD, AWS</p>
          </div>
        </div>
      </section>

      <section className="section animate-reveal delay-2">
        <div>
          <span className="font-mono text-sm text-muted-foreground">02</span>
          <h2>{dict.home.selected_work}</h2>
        </div>
        <div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
            ))}
          </div>
          <a href={`/${locale}/projects`} className="inline-block mt-6 text-primary text-sm">
            {dict.home.view_all_projects} →
          </a>
        </div>
      </section>

      <section className="section animate-reveal delay-3">
        <div>
          <span className="font-mono text-sm text-muted-foreground">03</span>
          <h2>{dict.home.latest_posts}</h2>
        </div>
        <div>
          <div className="list-wrapper">
            {latestPosts.map((post) => (
              <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
            ))}
          </div>
          <a href="/ku/blog" className="inline-block mt-6 text-primary text-sm">
            {dict.home.view_all_posts} →
          </a>
        </div>
      </section>

      <section className="text-center py-16 animate-reveal delay-4">
        <h2>{dict.home.get_in_touch}</h2>
        <Button asChild className="mt-4 font-mono">
          <a href="mailto:hello@shaho.dev">hello@shaho.dev</a>
        </Button>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite blog listing page**

`app/[locale]/blog/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllTopics } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";
import { Button } from "@/components/ui/button";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();

  const dict = await getDictionary(locale);
  const posts = await getAllPosts();
  const topics = getAllTopics();

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.blog.title}</h1>
      </section>
      <div className="flex gap-3 mb-8 flex-wrap">
        <Button size="sm" className="font-mono">{dict.blog.all_posts}</Button>
        {topics.map((topic) => (
          <Button key={topic} variant="outline" size="sm" className="font-mono" asChild>
            <a href={`/ku/blog/${topic}`}>{topic}</a>
          </Button>
        ))}
      </div>
      <div className="list-wrapper">
        {posts.map((post) => (
          <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite topic page**

`app/[locale]/blog/[topic]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale, isTopic, topics } from "@/lib/types";
import { getPostsByTopic } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";

export function generateStaticParams() {
  return topics.map((topic) => ({ locale: "ku", topic }));
}

export default async function TopicPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const posts = await getPostsByTopic(topic);

  return (
    <div className="layout">
      <section className="hero">
        <h1 className="font-mono">{topic}</h1>
        <p className="text-muted-foreground">{posts.length} بابەت</p>
      </section>
      <div className="list-wrapper">
        {posts.map((post) => (<BlogCard key={post.slug} post={post} />))}
      </div>
      <a href="/ku/blog" className="text-primary text-sm">← هەموو بابەتەکان</a>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite blog post page**

`app/[locale]/blog/[topic]/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale, isTopic } from "@/lib/types";
import type { BlogFrontmatter, Topic } from "@/lib/types";
import { getPostSource, getPostsByTopic } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import TableOfContents from "@/app/components/TableOfContents";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; topic: string; slug: string }> }) {
  const { locale, topic, slug } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const source = await getPostSource(topic, slug);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<BlogFrontmatter>(source);

  const topicPosts = await getPostsByTopic(topic as Topic);
  const currentIndex = topicPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? topicPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < topicPosts.length - 1 ? topicPosts[currentIndex + 1] : null;

  return (
    <div className="layout">
      <a href={`/ku/blog/${topic}`} className="text-primary text-sm">← {topic}</a>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">{frontmatter.title}</h1>
          <div className="flex gap-4 font-mono text-sm text-muted-foreground mt-4 items-center">
            <span>{frontmatter.date}</span>
            <span>{frontmatter.readingTime} خولەک خوێندنەوە</span>
            <Badge variant="secondary" className="font-mono">{topic}</Badge>
          </div>
        </header>
        <div className="grid grid-cols-[1fr_200px] gap-12">
          <div className="prose">{content}</div>
          <aside className="sticky top-24 self-start">
            <TableOfContents />
          </aside>
        </div>
      </article>
      <Separator className="mt-12" />
      <nav className="flex justify-between pt-6 text-sm">
        {prevPost ? (<a href={`/ku/blog/${prevPost.topic}/${prevPost.slug}`} className="text-muted-foreground no-underline hover:text-foreground">← {prevPost.frontmatter.title}</a>) : <span />}
        {nextPost ? (<a href={`/ku/blog/${nextPost.topic}/${nextPost.slug}`} className="text-muted-foreground no-underline hover:text-foreground">{nextPost.frontmatter.title} →</a>) : <span />}
      </nav>
    </div>
  );
}
```

- [ ] **Step 5: Rewrite projects listing page**

`app/[locale]/projects/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectFilters from "@/app/components/ProjectFilters";

export default async function ProjectsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; tech?: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const allProjects = await getAllProjects(locale as Locale);
  const { category, tech } = await searchParams;

  let filtered = allProjects;
  if (category && category !== "all") { filtered = filtered.filter((p) => p.frontmatter.category === category); }
  if (tech) { filtered = filtered.filter((p) => p.frontmatter.tech.includes(tech)); }

  const categories = [...new Set(allProjects.map((p) => p.frontmatter.category))];
  const techTags = [...new Set(allProjects.flatMap((p) => p.frontmatter.tech))];

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.projects.title}</h1></section>
      <ProjectFilters categories={categories} techTags={techTags} labels={{ all: dict.projects.filter_all, fullstack: dict.projects.filter_fullstack, backend: dict.projects.filter_backend, frontend: dict.projects.filter_frontend }} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {filtered.map((project) => (<ProjectCard key={project.slug} project={project} locale={locale as Locale} />))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Rewrite project detail page**

`app/[locale]/projects/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getProjectSource(slug, locale as Locale);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<ProjectFrontmatter>(source);

  return (
    <div className="layout">
      <a href={`/${locale}/projects`} className="text-primary text-sm">← {dict.common.back}</a>
      <article className="mt-8">
        <header className="mb-8">
          <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">{frontmatter.title}</h1>
          <div className="flex gap-2 flex-wrap mt-4">
            {frontmatter.tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-primary border-primary">{t}</Badge>
            ))}
          </div>
        </header>
        <div className="prose">{content}</div>
      </article>
    </div>
  );
}
```

- [ ] **Step 7: Rewrite about page**

`app/[locale]/about/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getContentSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getContentSource("about", locale as Locale);
  if (!source) notFound();

  const { content } = await renderMDX(source);

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.about.title}</h1></section>
      <article className="prose">{content}</article>
    </div>
  );
}
```

- [ ] **Step 8: Rewrite experience page**

`app/[locale]/experience/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import Timeline from "@/app/components/Timeline";
import type { TimelineEntry } from "@/app/components/Timeline";
import fs from "fs";
import path from "path";

async function getExperienceData(locale: Locale): Promise<TimelineEntry[]> {
  const filePath = path.join(process.cwd(), "content", "experience", `${locale}.json`);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const entries = await getExperienceData(locale as Locale);

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.experience.title}</h1></section>
      <Timeline entries={entries} />
    </div>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add app/[locale]/
git commit -m "refactor: convert all page files to Tailwind utility classes

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Build Verification + Cleanup

**Files:**
- Various fixes as needed

- [ ] **Step 1: Run build**

```bash
npm run build
```

Fix any errors. Common issues to watch for:
- Old CSS variable references (`var(--bg)`, `var(--text)`, `var(--line)`, `var(--accent)`) still in use
- Missing imports for shadcn components
- Type mismatches from shadcn component props

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 3: Visual verification**

```bash
npm run dev
```

Check in browser:
1. `http://localhost:3000/en` — light mode, LTR
2. `http://localhost:3000/ku` — light mode, RTL
3. Toggle theme to dark mode — verify both locales
4. Toggle to system preference — verify it follows OS
5. `/ku/blog` — blog listing with badges
6. `/ku/blog/golang/concurrency-models` — MDX post renders with syntax highlighting, TOC
7. `/en/projects` — project cards with filters
8. `/en/experience` — timeline renders correctly
9. Mobile responsive — hamburger menu works

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors from Tailwind/shadcn refactor

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
