# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/KU) portfolio site with MDX blog, project case studies, and work experience timeline.

**Architecture:** Next.js 16 App Router with `[locale]` dynamic segment, `proxy.ts` for locale detection/redirects, `next-mdx-remote/rsc` for MDX rendering, dictionary-based translations. Blog is Kurdish-only under `/ku/blog/[topic]/[slug]`.

**Tech Stack:** Next.js 16.2.1, React 19, TypeScript, Tailwind CSS v4, next-mdx-remote v5, rehype-pretty-code + shiki, Noto Sans Arabic

**Spec:** `docs/superpowers/specs/2026-03-30-portfolio-design.md`

**IMPORTANT — Next.js 16 breaking changes:**
- `middleware.ts` is deprecated → use `proxy.ts` with `export function proxy()`
- `params` is a **Promise** → always `await params`
- `cookies()`, `headers()` are fully async
- Use `PageProps<'/[locale]'>` for type-safe params
- Read `node_modules/next/dist/docs/` before implementing any Next.js API

---

## File Map

### New Files
```
proxy.ts                              # Locale detection + redirects (replaces middleware)
app/[locale]/layout.tsx               # Root layout: dir, lang, fonts per locale
app/[locale]/page.tsx                 # Home (replaces current app/page.tsx)
app/[locale]/projects/page.tsx        # Project listing with filters
app/[locale]/projects/[slug]/page.tsx # Project case study
app/[locale]/about/page.tsx           # About page
app/[locale]/experience/page.tsx      # Experience timeline
app/[locale]/blog/page.tsx            # Blog listing (ku-only)
app/[locale]/blog/[topic]/page.tsx    # Topic landing (ku-only)
app/[locale]/blog/[topic]/[slug]/page.tsx # Blog post (ku-only)
app/components/Header.tsx             # Nav with language switcher (replace existing)
app/components/Footer.tsx             # Footer component
app/components/LanguageSwitcher.tsx    # EN/KU toggle
app/components/ProjectCard.tsx        # Project grid card
app/components/ProjectFilters.tsx     # Tech/category filter bar
app/components/BlogCard.tsx           # Blog post card
app/components/Timeline.tsx           # Work experience timeline
app/components/TableOfContents.tsx    # Auto-generated TOC for blog posts
app/components/mdx/CodeBlock.tsx      # Syntax-highlighted code
app/components/mdx/Callout.tsx        # Info/warning/tip/danger boxes
app/components/mdx/Tabs.tsx           # Tabbed content
app/components/mdx/Collapsible.tsx    # Expandable sections
app/components/mdx/FileTree.tsx       # File/folder tree
app/components/mdx/Steps.tsx          # Numbered step guides
app/components/mdx/index.ts           # Component map export
lib/i18n.ts                           # Dictionary loader with server-only
lib/content.ts                        # Content collection utilities (fs-based)
lib/mdx.ts                            # MDX compilation wrapper
lib/types.ts                          # Shared TypeScript types
i18n/en.json                          # English translations
i18n/ku.json                          # Kurdish translations
content/blog/golang/concurrency-models.mdx    # Sample blog post
content/blog/react/state-management.mdx       # Sample blog post
content/projects/en/sample-project.mdx        # Sample project (EN)
content/projects/ku/sample-project.mdx        # Sample project (KU)
content/about/en.mdx                          # About content (EN)
content/about/ku.mdx                          # About content (KU)
content/experience/en.mdx                     # Experience content (EN)
content/experience/ku.mdx                     # Experience content (KU)
```

### Modified Files
```
app/globals.css          # Add dark mode, RTL support, logical properties
next.config.ts           # Add MDX/content config if needed
package.json             # New dependencies
```

### Deleted Files
```
app/page.tsx                    # Replaced by app/[locale]/page.tsx
app/layout.tsx                  # Replaced by app/[locale]/layout.tsx
app/components/Header.tsx       # Replaced by new Header with i18n
app/blog/[slug]/page.tsx        # Replaced by new blog route structure
app/work/[slug]/page.tsx        # Replaced by projects route
```

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install MDX and syntax highlighting packages**

```bash
npm install next-mdx-remote shiki rehype-pretty-code rehype-slug rehype-autolink-headings
```

- [ ] **Step 2: Install remark plugins for frontmatter**

```bash
npm install remark-gfm
```

- [ ] **Step 3: Verify installation**

```bash
npm ls next-mdx-remote shiki rehype-pretty-code
```

Expected: All packages listed without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add MDX and syntax highlighting dependencies"
```

---

## Task 2: Shared Types and i18n Infrastructure

**Files:**
- Create: `lib/types.ts`
- Create: `lib/i18n.ts`
- Create: `i18n/en.json`
- Create: `i18n/ku.json`

- [ ] **Step 1: Create shared types**

`lib/types.ts`:
```ts
export const locales = ["en", "ku"] as const;
export type Locale = (typeof locales)[number];

export const topics = ["golang", "laravel", "javascript", "react"] as const;
export type Topic = (typeof topics)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isTopic(value: string): value is Topic {
  return topics.includes(value as Topic);
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: number;
}

export interface ProjectFrontmatter {
  title: string;
  date: string;
  tech: string[];
  category: "fullstack" | "backend" | "frontend";
  thumbnail: string;
  featured: boolean;
}

export interface BlogPost {
  slug: string;
  topic: Topic;
  frontmatter: BlogFrontmatter;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
}
```

- [ ] **Step 2: Create English translations**

`i18n/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "blog": "Blog",
    "about": "About",
    "experience": "Experience"
  },
  "home": {
    "hero_title": "Full Stack Developer",
    "hero_subtitle": "Building robust systems with Go, Laravel, React & TypeScript",
    "expertise": "Expertise",
    "selected_work": "Selected Work",
    "latest_posts": "Latest Posts",
    "view_all_projects": "View All Projects",
    "view_all_posts": "View All Posts",
    "get_in_touch": "Get in Touch"
  },
  "projects": {
    "title": "Projects",
    "filter_all": "All",
    "filter_fullstack": "Full Stack",
    "filter_backend": "Backend",
    "filter_frontend": "Frontend"
  },
  "blog": {
    "title": "Blog",
    "reading_time": "min read",
    "all_posts": "All Posts"
  },
  "about": {
    "title": "About"
  },
  "experience": {
    "title": "Experience"
  },
  "common": {
    "back": "Back",
    "language": "EN"
  }
}
```

- [ ] **Step 3: Create Kurdish translations**

`i18n/ku.json`:
```json
{
  "nav": {
    "home": "سەرەتا",
    "projects": "پڕۆژەکان",
    "blog": "بلۆگ",
    "about": "دەربارە",
    "experience": "ئەزموون"
  },
  "home": {
    "hero_title": "گەشەپێدەری فوڵ ستاک",
    "hero_subtitle": "دروستکردنی سیستەمی بەهێز بە Go، Laravel، React و TypeScript",
    "expertise": "شارەزایی",
    "selected_work": "کارە هەڵبژاردەکان",
    "latest_posts": "تازەترین بابەتەکان",
    "view_all_projects": "هەموو پڕۆژەکان ببینە",
    "view_all_posts": "هەموو بابەتەکان ببینە",
    "get_in_touch": "پەیوەندیمان پێوە بکە"
  },
  "projects": {
    "title": "پڕۆژەکان",
    "filter_all": "هەموو",
    "filter_fullstack": "فوڵ ستاک",
    "filter_backend": "باکێند",
    "filter_frontend": "فرۆنتێند"
  },
  "blog": {
    "title": "بلۆگ",
    "reading_time": "خولەک خوێندنەوە",
    "all_posts": "هەموو بابەتەکان"
  },
  "about": {
    "title": "دەربارە"
  },
  "experience": {
    "title": "ئەزموون"
  },
  "common": {
    "back": "گەڕانەوە",
    "language": "کوردی"
  }
}
```

- [ ] **Step 4: Create i18n loader**

`lib/i18n.ts`:
```ts
import "server-only";
import type { Locale } from "./types";

const dictionaries = {
  en: () => import("@/i18n/en.json").then((m) => m.default),
  ku: () => import("@/i18n/ku.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
```

- [ ] **Step 5: Verify build**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts lib/i18n.ts i18n/
git commit -m "feat: add i18n infrastructure with EN/KU dictionaries"
```

---

## Task 3: Proxy (Locale Detection + Redirects)

**Files:**
- Create: `proxy.ts`

**Docs to read first:** `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`

- [ ] **Step 1: Create proxy.ts**

`proxy.ts`:
```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, isLocale } from "@/lib/types";

const defaultLocale = "en";

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().split("-")[0])
    .find((lang) => isLocale(lang));

  return preferred ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameSegments = pathname.split("/");
  const firstSegment = pathnameSegments[1];

  if (isLocale(firstSegment)) {
    // Redirect /en/blog* to /ku/blog*
    if (firstSegment === "en" && pathnameSegments[2] === "blog") {
      const blogPath = pathnameSegments.slice(2).join("/");
      request.nextUrl.pathname = `/ku/${blogPath}`;
      return NextResponse.redirect(request.nextUrl);
    }
    return;
  }

  // No locale in path — redirect to default or detected locale
  const locale = getLocaleFromHeaders(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|.*\\..*).*)"],
};
```

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/en`.

- [ ] **Step 3: Commit**

```bash
git add proxy.ts
git commit -m "feat: add locale proxy for EN/KU routing with blog redirect"
```

---

## Task 4: Theme (Dark/Light) and Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with theme-aware styles**

Read the current `app/globals.css` first, then replace it entirely. The new file must include:

1. Tailwind v4 import (`@import "tailwindcss"`)
2. Light theme CSS custom properties (existing palette: `--bg: #FAFAFA`, `--text: #050505`, `--accent: #0055FF`)
3. Dark theme via `@media (prefers-color-scheme: dark)` with dark palette (`--bg: #0A0A0A`, `--text: #FAFAFA`, `--accent: #4D8CFF`)
4. All existing CSS classes (`.dot-grid`, `.layout`, `.header`, `.hero`, `.section`, `.expertise-grid`, `.list-wrapper`, `.list-item`, `.mobile-toggle`, `.mobile-overlay`, `.mobile-nav`, `.footer`) — migrate ALL physical directional properties (`margin-left`, `padding-right`, `text-align: left`) to CSS logical properties (`margin-inline-start`, `padding-inline-end`, `text-align: start`)
5. Existing animations (`@keyframes reveal`, `@keyframes fadeIn`, delay classes)
6. All existing responsive breakpoints

Key CSS custom properties to add for dark mode:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0A0A0A;
    --text: #FAFAFA;
    --text-muted: #A0A0A0;
    --line: #2A2A2A;
    --accent: #4D8CFF;
  }
}
```

Key RTL migration examples:
```css
/* Before */
margin-left: 16px;
padding-right: 8px;
text-align: left;
border-left: 2px solid;

/* After */
margin-inline-start: 16px;
padding-inline-end: 8px;
text-align: start;
border-inline-start: 2px solid;
```

- [ ] **Step 2: Verify both themes render**

```bash
npm run dev
```

Toggle system dark mode preference and confirm both themes apply.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add dark mode support and RTL-ready logical properties"
```

---

## Task 5: Root Layout with Locale Support

**Files:**
- Create: `app/[locale]/layout.tsx`
- Delete: `app/layout.tsx` (after copying relevant parts)
- Create: `app/components/Footer.tsx`

**Docs to read first:** `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md` for layout conventions.

- [ ] **Step 1: Create root layout.tsx at app root**

The project needs a minimal `app/layout.tsx` that just passes children through (Next.js requires it):

`app/layout.tsx`:
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Create locale layout**

`app/[locale]/layout.tsx`:
```tsx
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
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
    <html lang={locale} dir={dir}>
      <body className={fontClass} style={{ fontFamily: locale === "ku" ? "var(--font-noto-arabic)" : "var(--font-geist-sans)" }}>
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create Footer component**

`app/components/Footer.tsx`:
```tsx
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="footer">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>© {new Date().getFullYear()} Shaho</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create placeholder home page**

`app/[locale]/page.tsx`:
```tsx
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { isLocale } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.home.hero_title}</h1>
        <p>{dict.home.hero_subtitle}</p>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Delete old route files**

```bash
rm app/blog/\[slug\]/page.tsx
rm app/work/\[slug\]/page.tsx
rmdir app/blog/\[slug\] app/blog app/work/\[slug\] app/work
```

- [ ] **Step 6: Verify dev server**

```bash
npm run dev
```

Visit `http://localhost:3000/en` and `http://localhost:3000/ku`. Confirm:
- EN renders LTR with Geist font
- KU renders RTL with Noto Sans Arabic
- Language in `<html>` tag is correct

- [ ] **Step 7: Commit**

```bash
git add app/ proxy.ts
git commit -m "feat: add locale-based layout with RTL support and font switching"
```

---

## Task 6: Header with Language Switcher

**Files:**
- Create: `app/components/Header.tsx` (replace existing)
- Create: `app/components/LanguageSwitcher.tsx`

- [ ] **Step 1: Create LanguageSwitcher**

`app/components/LanguageSwitcher.tsx`:
```tsx
"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Hide on blog pages (blog is Kurdish-only)
  if (pathname.includes("/blog")) return null;

  const targetLocale = locale === "en" ? "ku" : "en";
  const label = locale === "en" ? "کوردی" : "EN";

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
```

- [ ] **Step 2: Create Header**

`app/components/Header.tsx`:
```tsx
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
    { href: locale === "ku" ? "/ku/blog" : "/ku/blog", label: dict.nav.blog },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/experience`, label: dict.nav.experience },
  ];

  return (
    <header className="header">
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
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
```

- [ ] **Step 3: Verify navigation**

```bash
npm run dev
```

- Visit `/en` — nav shows English labels, language switcher shows "کوردی"
- Visit `/ku` — nav shows Kurdish labels, switcher shows "EN"
- Click switcher — toggles locale
- Visit `/ku/blog` — switcher is hidden

- [ ] **Step 4: Commit**

```bash
git add app/components/Header.tsx app/components/LanguageSwitcher.tsx
git commit -m "feat: add header with language switcher and blog-aware hiding"
```

---

## Task 7: Content Utilities

**Files:**
- Create: `lib/content.ts`
- Create: `lib/mdx.ts`
- Create sample content files

- [ ] **Step 1: Create content utilities**

`lib/content.ts`:
```ts
import fs from "fs";
import path from "path";
import type { BlogPost, BlogFrontmatter, Project, ProjectFrontmatter, Locale, Topic } from "./types";
import { topics, isTopic } from "./types";
import { compileMDX } from "next-mdx-remote/rsc";

const contentDir = path.join(process.cwd(), "content");

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  const blogDir = path.join(contentDir, "blog");

  if (!fs.existsSync(blogDir)) return posts;

  for (const topic of topics) {
    const topicDir = path.join(blogDir, topic);
    if (!fs.existsSync(topicDir)) continue;

    const files = fs.readdirSync(topicDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const source = fs.readFileSync(path.join(topicDir, file), "utf-8");
      const { frontmatter } = await compileMDX<BlogFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });
      posts.push({
        slug: file.replace(".mdx", ""),
        topic,
        frontmatter,
      });
    }
  }

  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPostsByTopic(topic: Topic): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.topic === topic);
}

export async function getPostSource(topic: string, slug: string): Promise<string | null> {
  if (!isTopic(topic)) return null;
  const filePath = path.join(contentDir, "blog", topic, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function getAllProjects(locale: Locale): Promise<Project[]> {
  const projectDir = path.join(contentDir, "projects", locale);
  if (!fs.existsSync(projectDir)) return [];

  const files = fs.readdirSync(projectDir).filter((f) => f.endsWith(".mdx"));
  const projects: Project[] = [];

  for (const file of files) {
    const source = fs.readFileSync(path.join(projectDir, file), "utf-8");
    const { frontmatter } = await compileMDX<ProjectFrontmatter>({
      source,
      options: { parseFrontmatter: true },
    });
    projects.push({
      slug: file.replace(".mdx", ""),
      frontmatter,
    });
  }

  return projects.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getProjectSource(slug: string, locale: Locale): Promise<string | null> {
  const filePath = path.join(contentDir, "projects", locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export async function getContentSource(type: "about" | "experience", locale: Locale): Promise<string | null> {
  const filePath = path.join(contentDir, type, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getAllTopics(): Topic[] {
  const blogDir = path.join(contentDir, "blog");
  if (!fs.existsSync(blogDir)) return [];
  return topics.filter((t) => fs.existsSync(path.join(blogDir, t)));
}
```

- [ ] **Step 2: Create MDX compilation wrapper**

`lib/mdx.ts`:
```ts
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/app/components/mdx";

export async function renderMDX<TFrontmatter extends Record<string, unknown>>(source: string) {
  return compileMDX<TFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
        ],
      },
    },
  });
}
```

- [ ] **Step 3: Create sample blog post**

`content/blog/golang/concurrency-models.mdx`:
```mdx
---
title: مۆدێلەکانی هاوکاتی لە Go
date: "2026-03-15"
tags:
  - concurrency
  - goroutines
  - channels
excerpt: تێڕوانینێکی قووڵ لە مۆدێلەکانی هاوکاتی لە زمانی Go
readingTime: 8
---

## پێشەکی

Go زمانێکە کە بۆ هاوکاتی دروستکراوە. لەم بابەتەدا، سەیری مۆدێلە جیاوازەکانی هاوکاتی دەکەین.

## Goroutines

```go
func main() {
    go func() {
        fmt.Println("Hello from goroutine")
    }()
    time.Sleep(time.Second)
}
```

## Channels

```go
ch := make(chan int, 10)
go func() {
    ch <- 42
}()
value := <-ch
```
```

- [ ] **Step 4: Create sample project**

`content/projects/en/sample-project.mdx`:
```mdx
---
title: "Aman Booking Platform"
date: "2025-09-01"
tech:
  - Next.js
  - Laravel
  - Redis
  - PostgreSQL
category: fullstack
thumbnail: /images/projects/aman.png
featured: true
---

## Overview

A comprehensive booking platform handling 10k+ daily reservations.

## Problem

The client needed a scalable booking system to replace their legacy PHP application.

## Solution

Built a modern full-stack application with Next.js frontend and Laravel API backend, using Redis for session management and real-time availability caching.

## Results

- 3x faster page loads
- 99.9% uptime
- 40% increase in conversion rate
```

`content/projects/ku/sample-project.mdx`:
```mdx
---
title: "پلاتفۆرمی نۆبەگرتنی ئامان"
date: "2025-09-01"
tech:
  - Next.js
  - Laravel
  - Redis
  - PostgreSQL
category: fullstack
thumbnail: /images/projects/aman.png
featured: true
---

## پوختە

پلاتفۆرمێکی نۆبەگرتنی گشتگیر کە ڕۆژانە ١٠ هەزار+ نۆبەگرتن بەڕێوە دەبات.
```

- [ ] **Step 5: Create sample about and experience content**

`content/about/en.mdx`:
```mdx
---
title: About
---

## Who I Am

I'm a full-stack developer with deep expertise in Go, Laravel, React, and TypeScript. I build robust, scalable systems for businesses that need reliability.

## What I Do

I specialize in taking complex requirements and turning them into clean, maintainable software. From real-time systems to e-commerce platforms, I deliver solutions that work.
```

`content/about/ku.mdx`:
```mdx
---
title: دەربارە
---

## کێم

من گەشەپێدەرێکی فوڵ ستاکم لەگەڵ شارەزایی قووڵ لە Go، Laravel، React، و TypeScript.
```

`content/experience/en.mdx`:
```mdx
---
title: Experience
---

This content will be replaced with structured timeline data. For now, experience is rendered by the Timeline component using frontmatter arrays.
```

`content/experience/ku.mdx`:
```mdx
---
title: ئەزموون
---

ئەم ناوەڕۆکە دەگۆڕدرێت بە داتای ڕێکخراوی تایمڵاین.
```

- [ ] **Step 6: Commit**

```bash
git add lib/content.ts lib/mdx.ts content/
git commit -m "feat: add content utilities and sample MDX content"
```

---

## Task 8: MDX Components

**Files:**
- Create: `app/components/mdx/CodeBlock.tsx`
- Create: `app/components/mdx/Callout.tsx`
- Create: `app/components/mdx/Tabs.tsx`
- Create: `app/components/mdx/Collapsible.tsx`
- Create: `app/components/mdx/FileTree.tsx`
- Create: `app/components/mdx/Steps.tsx`
- Create: `app/components/mdx/index.ts`

- [ ] **Step 1: Create CodeBlock**

`app/components/mdx/CodeBlock.tsx`:
```tsx
"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  title?: string;
}

export function CodeBlock({ children, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = (children as React.ReactElement)?.props?.children?.props?.children;
    if (typeof code === "string") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ position: "relative", margin: "1.5rem 0" }}>
      {title && (
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            padding: "0.5rem 1rem",
            borderBottom: "1px solid var(--line)",
            background: "var(--bg)",
          }}
        >
          {title}
        </div>
      )}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          insetInlineEnd: "0.75rem",
          top: title ? "2.75rem" : "0.75rem",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          background: "transparent",
          border: "1px solid var(--line)",
          borderRadius: "4px",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create Callout**

`app/components/mdx/Callout.tsx`:
```tsx
interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

const styles: Record<string, { border: string; bg: string; label: string }> = {
  info: { border: "#0055FF", bg: "#0055FF10", label: "Info" },
  tip: { border: "#10B981", bg: "#10B98110", label: "Tip" },
  warning: { border: "#F59E0B", bg: "#F59E0B10", label: "Warning" },
  danger: { border: "#EF4444", bg: "#EF444410", label: "Danger" },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const s = styles[type];
  return (
    <div
      style={{
        borderInlineStart: `3px solid ${s.border}`,
        background: s.bg,
        padding: "1rem 1.25rem",
        borderRadius: "0 6px 6px 0",
        margin: "1.5rem 0",
      }}
    >
      <strong style={{ color: s.border, fontSize: "0.85rem", display: "block", marginBottom: "0.25rem" }}>
        {s.label}
      </strong>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create Tabs**

`app/components/mdx/Tabs.tsx`:
```tsx
"use client";

import { useState } from "react";

interface TabsProps {
  items: string[];
  children: React.ReactNode;
}

export function Tabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div style={{ margin: "1.5rem 0", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => setActive(i)}
            style={{
              padding: "0.5rem 1rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              background: "transparent",
              border: "none",
              borderBottom: active === i ? "2px solid var(--accent)" : "2px solid transparent",
              color: active === i ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div style={{ padding: "1rem" }}>{childArray[active]}</div>
    </div>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

- [ ] **Step 4: Create Collapsible**

`app/components/mdx/Collapsible.tsx`:
```tsx
"use client";

import { useState } from "react";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export function Collapsible({ title, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        margin: "1.5rem 0",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.75rem 1rem",
          background: "var(--bg)",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          color: "var(--text)",
          textAlign: "start",
        }}
      >
        <span style={{ transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        {title}
      </button>
      {open && <div style={{ padding: "0 1rem 1rem" }}>{children}</div>}
    </div>
  );
}
```

- [ ] **Step 5: Create FileTree**

`app/components/mdx/FileTree.tsx`:
```tsx
interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.85rem",
        lineHeight: 1.8,
        padding: "1rem 1.25rem",
        margin: "1.5rem 0",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        direction: "ltr",
        textAlign: "left",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Create Steps**

`app/components/mdx/Steps.tsx`:
```tsx
import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  return (
    <div style={{ margin: "1.5rem 0" }}>
      {steps.map((child, i) => (
        <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "var(--accent)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </span>
          <div style={{ paddingTop: "3px" }}>{child}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

- [ ] **Step 7: Create component map**

`app/components/mdx/index.ts`:
```ts
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
  // Override default pre to use CodeBlock wrapper
  pre: (props: React.ComponentProps<"pre">) => <CodeBlock>{props.children}</CodeBlock>,
};
```

- [ ] **Step 8: Verify build**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 9: Commit**

```bash
git add app/components/mdx/
git commit -m "feat: add MDX components (CodeBlock, Callout, Tabs, Collapsible, FileTree, Steps)"
```

---

## Task 9: Blog Pages (Kurdish Only)

**Files:**
- Create: `app/[locale]/blog/page.tsx`
- Create: `app/[locale]/blog/[topic]/page.tsx`
- Create: `app/[locale]/blog/[topic]/[slug]/page.tsx`
- Create: `app/components/BlogCard.tsx`
- Create: `app/components/TableOfContents.tsx`

- [ ] **Step 1: Create BlogCard component**

`app/components/BlogCard.tsx`:
```tsx
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/ku/blog/${post.topic}/${post.slug}`}
      className="list-item"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", margin: 0 }}>{post.frontmatter.title}</h3>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            flexShrink: 0,
          }}
        >
          {post.frontmatter.readingTime} خولەک
        </span>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.5rem 0 0" }}>
        {post.frontmatter.excerpt}
      </p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            background: "var(--accent)10",
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          {post.topic}
        </span>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
          {post.frontmatter.date}
        </span>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create TableOfContents**

`app/components/TableOfContents.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

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
    <nav style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
      <h4 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
        ناوەڕۆک
      </h4>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          style={{
            display: "block",
            paddingInlineStart: h.level === 3 ? "1rem" : "0",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Create blog listing page**

`app/[locale]/blog/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllTopics } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";

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

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <a
          href="/ku/blog"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.8rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "4px",
            background: "var(--accent)",
            color: "white",
            textDecoration: "none",
          }}
        >
          {dict.blog.all_posts}
        </a>
        {topics.map((topic) => (
          <a
            key={topic}
            href={`/ku/blog/${topic}`}
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              padding: "0.3rem 0.75rem",
              borderRadius: "4px",
              border: "1px solid var(--line)",
              color: "var(--text-muted)",
              textDecoration: "none",
            }}
          >
            {topic}
          </a>
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

- [ ] **Step 4: Create topic landing page**

`app/[locale]/blog/[topic]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale, isTopic, topics } from "@/lib/types";
import { getPostsByTopic } from "@/lib/content";
import BlogCard from "@/app/components/BlogCard";

export function generateStaticParams() {
  return topics.map((topic) => ({ locale: "ku", topic }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const posts = await getPostsByTopic(topic);

  return (
    <div className="layout">
      <section className="hero">
        <h1 style={{ fontFamily: "var(--font-geist-mono)" }}>{topic}</h1>
        <p style={{ color: "var(--text-muted)" }}>
          {posts.length} بابەت
        </p>
      </section>

      <div className="list-wrapper">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <a href="/ku/blog" style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
        ← هەموو بابەتەکان
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Create blog post page**

`app/[locale]/blog/[topic]/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale, isTopic } from "@/lib/types";
import type { BlogFrontmatter, Topic } from "@/lib/types";
import { getPostSource, getPostsByTopic } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import TableOfContents from "@/app/components/TableOfContents";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string; slug: string }>;
}) {
  const { locale, topic, slug } = await params;
  if (!isLocale(locale) || locale !== "ku") notFound();
  if (!isTopic(topic)) notFound();

  const source = await getPostSource(topic, slug);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<BlogFrontmatter>(source);

  // Previous/next post navigation
  const topicPosts = await getPostsByTopic(topic as Topic);
  const currentIndex = topicPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? topicPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < topicPosts.length - 1 ? topicPosts[currentIndex + 1] : null;

  return (
    <div className="layout">
      <a href={`/ku/blog/${topic}`} style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
        ← {topic}
      </a>

      <article style={{ marginTop: "2rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>
            {frontmatter.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              marginTop: "1rem",
            }}
          >
            <span>{frontmatter.date}</span>
            <span>{frontmatter.readingTime} خولەک خوێندنەوە</span>
            <span style={{ color: "var(--accent)" }}>{topic}</span>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "3rem" }}>
          <div className="prose">{content}</div>
          <aside style={{ position: "sticky", top: "6rem", alignSelf: "start" }}>
            <TableOfContents />
          </aside>
        </div>
      </article>

      {/* Previous / Next navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--line)",
          fontSize: "0.9rem",
        }}
      >
        {prevPost ? (
          <a href={`/ku/blog/${prevPost.topic}/${prevPost.slug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            ← {prevPost.frontmatter.title}
          </a>
        ) : <span />}
        {nextPost ? (
          <a href={`/ku/blog/${nextPost.topic}/${nextPost.slug}`} style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            {nextPost.frontmatter.title} →
          </a>
        ) : <span />}
      </nav>
    </div>
  );
}
```

- [ ] **Step 6: Verify blog renders**

```bash
npm run dev
```

Visit `http://localhost:3000/ku/blog` — should show listing.
Visit `http://localhost:3000/ku/blog/golang/concurrency-models` — should render MDX post.
Visit `http://localhost:3000/en/blog` — should redirect to `/ku/blog`.

- [ ] **Step 7: Commit**

```bash
git add app/[locale]/blog/ app/components/BlogCard.tsx app/components/TableOfContents.tsx
git commit -m "feat: add blog pages with topic routing and MDX rendering (Kurdish-only)"
```

---

## Task 10: Projects Pages

**Files:**
- Create: `app/[locale]/projects/page.tsx`
- Create: `app/[locale]/projects/[slug]/page.tsx`
- Create: `app/components/ProjectCard.tsx`
- Create: `app/components/ProjectFilters.tsx`

- [ ] **Step 1: Create ProjectCard**

`app/components/ProjectCard.tsx`:
```tsx
import type { Project, Locale } from "@/lib/types";

export default function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const { frontmatter, slug } = project;

  return (
    <a
      href={`/${locale}/projects/${slug}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      {frontmatter.thumbnail && (
        <div
          style={{
            height: "200px",
            background: "var(--line)",
            backgroundImage: `url(${frontmatter.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div style={{ padding: "1.25rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>{frontmatter.title}</h3>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {frontmatter.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                border: "1px solid var(--line)",
                padding: "0.1rem 0.4rem",
                borderRadius: "3px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create ProjectFilters**

`app/components/ProjectFilters.tsx`:
```tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
  const activeTech = searchParams.get("tech") ?? "";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const categoryLabels: Record<string, string> = { all: labels.all, fullstack: labels.fullstack, backend: labels.backend, frontend: labels.frontend };

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
      {["all", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter("category", cat)}
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.8rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "4px",
            border: activeCategory === cat ? "none" : "1px solid var(--line)",
            background: activeCategory === cat ? "var(--accent)" : "transparent",
            color: activeCategory === cat ? "white" : "var(--text-muted)",
            cursor: "pointer",
          }}
        >
          {categoryLabels[cat] ?? cat}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create projects listing page**

`app/[locale]/projects/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import ProjectFilters from "@/app/components/ProjectFilters";

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tech?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const allProjects = await getAllProjects(locale as Locale);
  const { category, tech } = await searchParams;

  let filtered = allProjects;
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.frontmatter.category === category);
  }
  if (tech) {
    filtered = filtered.filter((p) => p.frontmatter.tech.includes(tech));
  }

  const categories = [...new Set(allProjects.map((p) => p.frontmatter.category))];
  const techTags = [...new Set(allProjects.flatMap((p) => p.frontmatter.tech))];

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.projects.title}</h1>
      </section>

      <ProjectFilters
        categories={categories}
        techTags={techTags}
        labels={{
          all: dict.projects.filter_all,
          fullstack: dict.projects.filter_fullstack,
          backend: dict.projects.filter_backend,
          frontend: dict.projects.filter_frontend,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create project detail page**

`app/[locale]/projects/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale, ProjectFrontmatter } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getProjectSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getProjectSource(slug, locale as Locale);
  if (!source) notFound();

  const { content, frontmatter } = await renderMDX<ProjectFrontmatter>(source);

  return (
    <div className="layout">
      <a href={`/${locale}/projects`} style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
        ← {dict.common.back}
      </a>

      <article style={{ marginTop: "2rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.2 }}>
            {frontmatter.title}
          </h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {frontmatter.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="prose">{content}</div>
      </article>
    </div>
  );
}
```

- [ ] **Step 5: Verify projects render**

```bash
npm run dev
```

Visit `http://localhost:3000/en/projects` — should show project grid.
Visit `http://localhost:3000/en/projects/sample-project` — should render case study.

- [ ] **Step 6: Commit**

```bash
git add app/[locale]/projects/ app/components/ProjectCard.tsx app/components/ProjectFilters.tsx
git commit -m "feat: add projects listing with filters and detail pages"
```

---

## Task 11: About Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Create about page**

`app/[locale]/about/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getContentSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getContentSource("about", locale as Locale);
  if (!source) notFound();

  const { content } = await renderMDX(source);

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.about.title}</h1>
      </section>
      <article className="prose">{content}</article>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Visit `http://localhost:3000/en/about` and `/ku/about`.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/about/
git commit -m "feat: add about page with MDX content"
```

---

## Task 12: Experience Page with Timeline

**Files:**
- Create: `app/[locale]/experience/page.tsx`
- Create: `app/components/Timeline.tsx`

- [ ] **Step 1: Create Timeline component**

`app/components/Timeline.tsx`:
```tsx
interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  tech: string[];
  achievements: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div style={{ position: "relative", paddingInlineStart: "2rem" }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          insetInlineStart: "0",
          top: "0",
          bottom: "0",
          width: "2px",
          background: "var(--line)",
        }}
      />

      {entries.map((entry, i) => (
        <div key={i} style={{ position: "relative", marginBottom: "2.5rem" }}>
          {/* Dot */}
          <div
            style={{
              position: "absolute",
              insetInlineStart: "-2rem",
              top: "0.35rem",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === 0 ? "var(--accent)" : "var(--line)",
              transform: "translateX(-50%)",
              marginInlineStart: "1px",
            }}
          />

          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: "0.25rem",
            }}
          >
            {entry.period}
          </div>
          <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem" }}>{entry.role}</h3>
          <div style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
            {entry.company}
          </div>
          <ul style={{ margin: "0 0 0.75rem", paddingInlineStart: "1.25rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {entry.achievements.map((a, j) => (
              <li key={j}>{a}</li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {entry.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  border: "1px solid var(--line)",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "3px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type { TimelineEntry };
```

- [ ] **Step 2: Create experience page**

The experience page reads structured data from a JSON file rather than MDX, since timeline entries need consistent structure.

Create `content/experience/en.json`:
```json
[
  {
    "company": "Company Name",
    "role": "Senior Full Stack Developer",
    "period": "2024 — Present",
    "tech": ["Go", "React", "PostgreSQL", "Docker"],
    "achievements": [
      "Architected microservices handling 50k RPM",
      "Led team of 4 developers",
      "Reduced API latency by 60%"
    ]
  },
  {
    "company": "Previous Company",
    "role": "Full Stack Developer",
    "period": "2022 — 2024",
    "tech": ["Laravel", "Vue.js", "MySQL", "Redis"],
    "achievements": [
      "Built e-commerce platform processing $2M/month",
      "Implemented real-time inventory system"
    ]
  }
]
```

Create `content/experience/ku.json`:
```json
[
  {
    "company": "ناوی کۆمپانیا",
    "role": "گەشەپێدەری سینیەری فوڵ ستاک",
    "period": "٢٠٢٤ — ئێستا",
    "tech": ["Go", "React", "PostgreSQL", "Docker"],
    "achievements": [
      "دامەزراندنی مایکرۆسێرڤیسەکان کە ٥٠ هەزار داواکاری لە خولەکێکدا بەڕێوە دەبات",
      "سەرکردایەتی تیمی ٤ گەشەپێدەر",
      "کەمکردنەوەی دواکەوتنی API بە ڕێژەی ٦٠٪"
    ]
  }
]
```

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

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const entries = await getExperienceData(locale as Locale);

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.experience.title}</h1>
      </section>
      <Timeline entries={entries} />
    </div>
  );
}
```

- [ ] **Step 3: Remove old experience MDX files, replace with JSON**

```bash
rm content/experience/en.mdx content/experience/ku.mdx
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Visit `http://localhost:3000/en/experience` and `/ku/experience`. Confirm timeline renders with correct direction.

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/experience/ app/components/Timeline.tsx content/experience/
git commit -m "feat: add experience page with timeline component"
```

---

## Task 13: Home Page (Full)

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Build complete home page**

`app/[locale]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getAllPosts, getAllProjects } from "@/lib/content";
import ProjectCard from "@/app/components/ProjectCard";
import BlogCard from "@/app/components/BlogCard";

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
      {/* Hero */}
      <section className="hero" style={{ animation: "reveal 0.8s ease forwards" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", color: "var(--accent)", fontSize: "0.9rem" }}>
          Shaho
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, margin: "0.5rem 0" }}>
          {dict.home.hero_title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px" }}>
          {dict.home.hero_subtitle}
        </p>
      </section>

      {/* Expertise */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.1s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>01</span>
          <h2>{dict.home.expertise}</h2>
        </div>
        <div className="expertise-grid">
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Frontend</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>React, Next.js, TypeScript, Vue.js</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Backend</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Go, Laravel, Node.js, PostgreSQL</p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.9rem" }}>Data & DevOps</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Redis, Docker, CI/CD, AWS</p>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.2s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>02</span>
          <h2>{dict.home.selected_work}</h2>
        </div>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale as Locale} />
            ))}
          </div>
          <a
            href={`/${locale}/projects`}
            style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--accent)", fontSize: "0.9rem" }}
          >
            {dict.home.view_all_projects} →
          </a>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section" style={{ animation: "reveal 0.8s ease forwards", animationDelay: "0.3s", opacity: 0 }}>
        <div>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>03</span>
          <h2>{dict.home.latest_posts}</h2>
        </div>
        <div>
          <div className="list-wrapper">
            {latestPosts.map((post) => (
              <BlogCard key={`${post.topic}/${post.slug}`} post={post} />
            ))}
          </div>
          <a
            href="/ku/blog"
            style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--accent)", fontSize: "0.9rem" }}
          >
            {dict.home.view_all_posts} →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "4rem 0", animation: "reveal 0.8s ease forwards", animationDelay: "0.4s", opacity: 0 }}>
        <h2>{dict.home.get_in_touch}</h2>
        <a
          href="mailto:hello@shaho.dev"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "var(--accent)",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.9rem",
          }}
        >
          hello@shaho.dev
        </a>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify home page**

```bash
npm run dev
```

Visit `http://localhost:3000/en` and `/ku`. Confirm:
- Hero section renders with correct locale text
- Featured projects appear
- Latest blog posts appear
- RTL layout correct on Kurdish

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: build complete home page with hero, projects, posts, and CTA"
```

---

## Task 14: Second Blog Sample Post + Verify Full Flow

**Files:**
- Create: `content/blog/react/state-management.mdx`

- [ ] **Step 1: Create second sample blog post**

`content/blog/react/state-management.mdx`:
```mdx
---
title: بەڕێوەبردنی دۆخ لە ئاستی گەورەدا
date: "2026-03-20"
tags:
  - react
  - state-management
  - architecture
excerpt: چۆن دۆخی ئەپڵیکەیشنی گەورە بەڕێوە ببەیت بەبێ ئاڵۆزی
readingTime: 12
---

## پێشەکی

بەڕێوەبردنی دۆخ یەکێکە لە گرنگترین بابەتەکانی گەشەپێدانی ئەپڵیکەیشنی React.

## Context API

```tsx
const ThemeContext = createContext<Theme>('light')

function App() {
  return (
    <ThemeContext value="dark">
      <Dashboard />
    </ThemeContext>
  )
}
```

## Zustand

```tsx
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
```
```

- [ ] **Step 2: Full flow verification**

```bash
npm run dev
```

Test the complete flow:
1. `http://localhost:3000/` → redirects to `/en`
2. `/en` → home page with projects and posts
3. `/en/projects` → project grid with filters
4. `/en/projects/sample-project` → case study
5. `/en/about` → about page
6. `/en/experience` → timeline
7. `/en/blog` → redirects to `/ku/blog`
8. `/ku/blog` → blog listing with topic filters
9. `/ku/blog/golang` → golang topic page
10. `/ku/blog/golang/concurrency-models` → article with syntax highlighting
11. `/ku/blog/react/state-management` → second article
12. Language switcher toggles EN ↔ KU on non-blog pages
13. Dark mode toggle via system preference

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add content/blog/react/
git commit -m "feat: add second sample blog post and verify full site flow"
```

---

## Task 15: Final Cleanup

**Files:**
- Modify: `.gitignore`
- Delete: unused old files

- [ ] **Step 1: Add .superpowers to gitignore**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 2: Clean up unused public assets**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

These are Create Next App defaults no longer used.

- [ ] **Step 3: Create images directory**

```bash
mkdir -p public/images/projects
```

- [ ] **Step 4: Final build verification**

```bash
npm run build && npm run lint
```

Both should pass without errors.

- [ ] **Step 5: Commit**

```bash
git add .gitignore public/
git commit -m "chore: clean up unused assets, add images dir, update gitignore"
```
