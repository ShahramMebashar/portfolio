import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

const sideProjects: { name: string; description: string; tech: string[]; github?: string; appStore?: string; docs?: string }[] = [
  {
    name: "Kisa",
    description: "A private expense tracker for iPhone. Budgets, recurring bills, receipt scanning with on-device OCR, insights, and widgets on one clean screen. Data stays in a local SQLite store and, optionally, your own private iCloud; couples can share individual accounts and settle up. Ships in English, Arabic, Spanish, and both Kurdish dialects. Solo: design, code, and release.",
    tech: ["Swift", "SQLite", "CloudKit", "iOS"],
    appStore: "https://apps.apple.com/us/app/kisa-expense-tracker/id6789903357",
  },
  {
    name: "Shot Done",
    description: "An iOS app that turns the screenshot pile into an inbox you can clear. It pulls out the QR codes, links, phone numbers and dates you actually screenshotted for, sorts everything into a searchable library, and walks you through the backlog one at a time. All of it runs on device — no account, nothing uploaded. Solo: design, code, and release.",
    tech: ["Swift", "SQLite", "iOS"],
    appStore: "https://apps.apple.com/us/app/shot-done-screenshot-inbox/id6790685817",
  },
  {
    name: "ParaKit (پارەکیت)",
    description: "Laravel-native payment kit for Kurdistan & Iraq — FIB, ZainCash, Nass Pay/Wallet, FastPay, QiCard. Idempotent webhooks, retry & circuit-breaker, redacted logging, a sweeper for lost webhooks, and en/ar/ckb UIs out of the box.",
    tech: ["Laravel", "PHP", "Payments"],
    github: "https://github.com/ShahramMebashar/parakit",
    docs: "https://shahrammebashar.github.io/parakit/",
  },
  {
    name: "Cairn",
    description: "A cross-platform desktop app that keeps task management inside the repo. Tasks are plain Markdown files tracked in git, so you and your AI agents work from one shared task graph — no database, no separate tool. Also runs as a web board or an MCP server.",
    tech: ["Go", "Desktop", "MCP"],
    github: "https://github.com/ShahramMebashar/cairn",
  },
  {
    name: "debugd",
    description: "An always-on request profiler for Laravel you can actually leave running. A small Go binary sits next to your app and captures every request — SQL queries, N+1s, logs, timings, memory — in a live UI, with no database or Docker to set up.",
    tech: ["Go", "Laravel", "Desktop"],
    github: "https://github.com/ShahramMebashar/debugd",
  },
  {
    name: "GoPoke",
    description: "A desktop app for running and iterating on Go snippets quickly — Tinkerwell for Go. Write Go code against a real local project, run it instantly, and see output in real time.",
    tech: ["Go", "Desktop"],
    github: "https://github.com/ShahramMebashar/gopoke",
  },
  {
    name: "C++ Playground",
    description: "A browser-based C++ compiler and runtime. Write, compile, and run C++ code entirely in the browser — no server required.",
    tech: ["C++", "WebAssembly"],
    github: "https://github.com/ShahramMebashar/cpp-playground",
  },
  {
    name: "JobWiz",
    description: "Real-time job aggregator with SSE streaming and multi-source scraping.",
    tech: ["Go", "SSE", "Scraping"],
    github: "https://github.com/ShahramMebashar/jobwize",
  },
  {
    name: "Taxi WebSocket Simulation",
    description: "Real-time simulation and visualization of 1,000 taxi drivers across Erbil and Duhok using a quadtree algorithm for spatial indexing. Go backend with WebSocket streaming, JavaScript/Leaflet frontend.",
    tech: ["Go", "WebSocket", "Leaflet", "Quadtree"],
    github: "https://github.com/ShahramMebashar/taxi-websocket-simulation",
  },
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="animate-reveal">
        <section className="mb-12 md:mb-16 py-0 flex flex-col items-start">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight font-extrabold text-foreground">
            {dict.projects.title}
          </h1>
        </section>
        <ul className="space-y-0 animate-reveal delay-1">
          {sideProjects.map((project, i) => {
            const href = project.github ?? project.appStore;
            return (
            <li key={i} className="group relative border-b border-border/40 py-6 first:border-t">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={project.name}
                className="absolute inset-0 z-0"
              />
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h2>
                    <div className="flex gap-1.5 flex-wrap">
                      {project.tech.map((t) => (
                        <span key={t} className="font-mono text-[10px] tracking-wide text-muted-foreground px-2 py-0.5 rounded bg-muted/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    {project.docs && (
                      <a
                        href={project.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 mt-2 inline-block font-mono text-xs text-primary hover:underline"
                      >
                        Documentation ↗
                      </a>
                    )}
                    {project.appStore && project.appStore !== href && (
                      <a
                        href={project.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 mt-2 inline-block font-mono text-xs text-primary hover:underline"
                      >
                        App Store ↗
                      </a>
                    )}
                  </div>
                </div>
                <svg
                  className="shrink-0 mt-0.5 size-4 text-muted-foreground/40 group-hover:text-primary transition-colors rtl:-scale-x-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
