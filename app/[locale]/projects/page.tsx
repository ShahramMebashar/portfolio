import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";

const sideProjects = [
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
      <div className="animate-reveal max-w-3xl">
        <section className="mb-12 md:mb-16 py-0 flex flex-col items-start">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight font-extrabold text-foreground">
            {dict.projects.title}
          </h1>
        </section>
        <ul className="space-y-0 animate-reveal delay-1">
          {sideProjects.map((project, i) => (
            <li key={i} className="group border-b border-border/40 py-6 first:border-t">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-between gap-6 no-underline"
              >
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <svg
                  className="shrink-0 mt-0.5 size-4 text-muted-foreground/40 group-hover:text-primary transition-colors rtl:-scale-x-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
