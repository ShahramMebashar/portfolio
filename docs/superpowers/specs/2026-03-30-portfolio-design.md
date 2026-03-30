# Portfolio Website Design Spec

## Context

Shaho is a full-stack developer building a portfolio to attract freelance clients. The site showcases 8+ projects with detailed case studies, hosts a Kurdish-language technical blog covering Golang, Laravel, JavaScript, and React, and presents work experience in a timeline format. The site is bilingual (English default + Kurdish Sorani RTL), with the blog exclusively in Kurdish.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **React:** 19.2.4
- **MDX:** next-mdx-remote (with RSC support)
- **Styling:** Tailwind CSS v4 + CSS logical properties for RTL
- **Fonts:** Geist Sans/Mono (English), Noto Sans Arabic (Kurdish Sorani)
- **Theme:** System preference auto-detect (light/dark), no manual toggle
- **Language:** TypeScript 5 (strict)

## Design Tone

Technical & precise — monospace accents, code-inspired layouts, developer-focused aesthetic. Evolves the existing dot-grid, minimal color (blue accent) foundation into something that speaks to technical decision-makers.

## Pages

### Home (`/[locale]`)
- Hero section with name, title, brief value proposition
- Expertise blocks (Frontend, Backend, Data & DevOps)
- Featured projects grid (3-4 highlighted, links to full list)
- Latest blog posts (3 recent, links to blog — blog link goes to `/ku/blog`)
- CTA section for contact/hire

### Projects (`/[locale]/projects`)
- Filterable grid of 8+ projects
- Filter by: tech stack tags, category (fullstack, backend, frontend)
- Each card: thumbnail, title, tech tags, brief description
- Links to individual case study pages

### Project Detail (`/[locale]/projects/[slug]`)
- MDX-rendered case study
- Sections: overview, problem, solution, tech stack, results/metrics, marketing images
- Navigation back to projects list

### Blog (`/ku/blog`) — Kurdish Only
- Article listing with topic filters
- Shows: title, excerpt, date, reading time, topic badge
- Only accessible under `/ku` locale
- Visiting `/en/blog` redirects to `/ku/blog`

### Blog Topic (`/ku/blog/[topic]`)
- Topic landing page (golang, laravel, javascript, react)
- Filtered list of all posts in that topic
- Topic description/intro at top

### Blog Post (`/ku/blog/[topic]/[slug]`)
- MDX-rendered article with rich components
- Table of contents (auto-generated from headings)
- Reading time, date, topic badge
- Navigation: back to topic, previous/next post

### About (`/[locale]/about`)
- Personal story, background
- Skills/technologies overview
- Photo
- What you bring to projects — value proposition for clients

### Experience (`/[locale]/experience`)
- Vertical timeline layout
- Each entry: company, role, dates, key achievements
- Tech stack used per role
- Chronological order (newest first)

## Content Architecture

### Directory Structure
```
content/
├── blog/
│   ├── golang/
│   │   ├── concurrency-models.mdx
│   │   └── error-handling-patterns.mdx
│   ├── laravel/
│   │   ├── ioc-container-deep-dive.mdx
│   │   └── eloquent-performance.mdx
│   ├── javascript/
│   │   └── event-loop-explained.mdx
│   └── react/
│       └── state-management-at-scale.mdx
├── projects/
│   ├── en/
│   │   ├── aman-booking.mdx
│   │   └── analytics-engine.mdx
│   └── ku/
│       ├── aman-booking.mdx
│       └── analytics-engine.mdx
├── about/
│   ├── en.mdx
│   └── ku.mdx
└── experience/
    ├── en.mdx
    └── ku.mdx
```

### Blog Frontmatter
```yaml
---
title: مۆدێلەکانی هاوکاتی لە Go
date: 2026-03-15
tags: [concurrency, goroutines, channels]
excerpt: تێڕوانینێکی قووڵ لە...
readingTime: 8
---
```

Category is auto-derived from the parent folder name (golang, laravel, etc.).

### Project Frontmatter
```yaml
---
title: Aman Booking Platform
date: 2025-09-01
tech: [Next.js, Laravel, Redis]
category: fullstack
thumbnail: /images/projects/aman.png
featured: true
---
```

## Internationalization (i18n)

### Routing
- `app/[locale]/` dynamic segment — accepts `"en"` | `"ku"`
- Default locale: English (`en`)
- Root `/` redirects to `/en`
- Middleware handles locale detection from URL prefix
- `/en/blog` redirects to `/ku/blog`
- Blog routes only render when `locale === "ku"`

### Translation
- Static UI text in JSON files: `i18n/en.json`, `i18n/ku.json`
- Navigation labels, section titles, button text, footer, etc.
- A `useTranslation` helper or server-side `getTranslation(locale)` function

### RTL Support
- `<html lang="ku" dir="rtl">` for Kurdish, `<html lang="en" dir="ltr">` for English
- CSS logical properties throughout (`margin-inline-start`, `padding-inline-end`, etc.)
- No physical directional properties (`margin-left`, `padding-right`)
- Layout mirrors automatically via logical properties

### Fonts
- English: Geist Sans (body), Geist Mono (code) — loaded via `next/font/google`
- Kurdish: Noto Sans Arabic (body), Geist Mono (code blocks stay LTR)
- Font-family swaps based on locale in the `[locale]/layout.tsx`

### Language Switcher
- In header: `EN` / `کوردی` toggle
- Switches locale prefix, preserves current page path
- On blog pages: switcher hidden or shows only Kurdish (blog is Kurdish-only)

## Theme (Dark/Light)

- Auto-detect via `prefers-color-scheme` media query
- No manual toggle — respects system preference
- CSS custom properties for all colors, defined in `globals.css`
- Light palette: existing (white bg, near-black text, blue accent)
- Dark palette: dark bg, light text, adjusted accent

## MDX Components

Six custom components available in all MDX content:

| Component | Purpose |
|-----------|---------|
| `<CodeBlock>` | Syntax-highlighted code with language label, line numbers, copy button, line highlighting |
| `<Callout type="tip\|info\|warning\|danger">` | Colored callout boxes for key information |
| `<Tabs items={[...]}>` / `<Tab>` | Tabbed content for comparing implementations across languages |
| `<Collapsible title="...">` | Expandable sections for supplementary details |
| `<FileTree>` | Visual file/folder tree diagrams |
| `<Steps>` / `<Step>` | Numbered step-by-step tutorial guides |

Components are passed to `next-mdx-remote`'s `MDXRemote` via a shared components map. Blog MDX renders RTL (Kurdish), project MDX renders in the current locale direction. Code blocks always render LTR regardless of locale.

## App Router Structure

```
app/
├── [locale]/
│   ├── layout.tsx          # Sets dir, lang, font per locale
│   ├── page.tsx            # Home
│   ├── projects/
│   │   ├── page.tsx        # Project listing with filters
│   │   └── [slug]/
│   │       └── page.tsx    # Project case study
│   ├── about/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx        # Timeline
│   └── blog/
│       ├── page.tsx        # All posts (ku-only guard)
│       ├── [topic]/
│       │   ├── page.tsx    # Topic landing
│       │   └── [slug]/
│       │       └── page.tsx # Article
├── components/
│   ├── Header.tsx          # Nav with language switcher
│   ├── Footer.tsx
│   ├── LanguageSwitcher.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectFilters.tsx
│   ├── BlogCard.tsx
│   ├── Timeline.tsx
│   ├── TableOfContents.tsx
│   └── mdx/
│       ├── CodeBlock.tsx
│       ├── Callout.tsx
│       ├── Tabs.tsx
│       ├── Collapsible.tsx
│       ├── FileTree.tsx
│       └── Steps.tsx
├── lib/
│   ├── mdx.ts              # MDX parsing utilities (read, compile, frontmatter)
│   ├── content.ts           # Content collection helpers (list posts, projects)
│   ├── i18n.ts              # Translation loader
│   └── utils.ts             # Shared utilities
├── i18n/
│   ├── en.json
│   └── ku.json
├── middleware.ts             # Locale detection, redirects
└── globals.css               # Theme variables, base styles, dark mode
```

## Content Utilities (`lib/content.ts`)

Key functions needed:
- `getAllPosts()` — list all blog posts with frontmatter, sorted by date
- `getPostsByTopic(topic)` — filter posts by topic folder
- `getPostBySlug(topic, slug)` — get single post content + frontmatter
- `getAllTopics()` — list available blog topics
- `getAllProjects(locale)` — list all projects for a locale
- `getProjectBySlug(slug, locale)` — get single project content
- `getExperience(locale)` — get experience content

All functions read from the `content/` directory using `fs` at build time (server components).

## Verification Plan

1. **Build:** `npm run build` completes without errors
2. **Dev server:** `npm run dev` — all pages render
3. **Routing:** Verify `/en`, `/ku`, `/ku/blog`, `/ku/blog/golang/test-post` all work
4. **Redirect:** `/en/blog` redirects to `/ku/blog`, `/` redirects to `/en`
5. **RTL:** Kurdish pages render right-to-left, English left-to-right
6. **Dark mode:** Toggle system preference — both themes render correctly
7. **MDX:** Blog post with all 6 components renders properly
8. **Filters:** Project filtering by tech/category works
9. **Language switcher:** Switches locale, preserves path, hidden on blog
10. **Mobile:** Responsive layout, mobile menu works in both locales
