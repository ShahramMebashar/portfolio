import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { isLocale } from "@/lib/types";
import { getAllProjects } from "@/lib/content";
import TechIcons from "@/app/components/TechIcons";
import PrintButton from "@/app/components/PrintButton";
import type { TimelineEntry } from "@/app/components/Timeline";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaGlobe,
} from "react-icons/fa6";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ku" }];
}

export const metadata: Metadata = {
  title: "CV | Shahram M. Hassan",
  description: "Curriculum Vitae — Shahram M. Hassan, Full-Stack Developer.",
};

// CV is English-only: always read the English experience + projects.
function getExperience(): TimelineEntry[] {
  const filePath = path.join(process.cwd(), "content", "experience", "en.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const CONTACT = {
  name: "Shahram M. Hassan",
  title: "Full-Stack Developer",
  summary:
    "Full-stack developer who turns ideas into shipped products. I work across the entire stack — Go and Laravel on the backend, React and Vue on the frontend, Flutter for mobile — building MVPs, real-time systems, and production platforms for startups, businesses, and government. I've led teams and owned projects end to end, from architecture to deployment.",
  links: [
    { Icon: FaEnvelope, label: "shahram.webdev@gmail.com", href: "mailto:shahram.webdev@gmail.com" },
    { Icon: FaWhatsapp, label: "+964 750 885 3530", href: "https://wa.me/9647508853530" },
    { Icon: FaGithub, label: "github.com/ShahramMebashar", href: "https://github.com/ShahramMebashar" },
    { Icon: FaLinkedinIn, label: "linkedin.com/in/shahram-hassan", href: "https://www.linkedin.com/in/shahram-hassan/" },
    { Icon: FaGlobe, label: "resume.krd", href: "https://resume.krd" },
  ],
};

const SKILL_GROUPS = [
  { label: "Languages", items: ["Go", "PHP", "JavaScript", "TypeScript", "Dart", "HTML", "CSS"] },
  { label: "Frameworks & Libraries", items: ["Laravel", "React", "Vue.js", "Inertia.js", "Livewire", "Flutter", "Next.js", "TanStack Start", "Tailwind"] },
  { label: "Data & Infrastructure", items: ["PostgreSQL", "PostGIS", "MySQL", "Redis", "Tile38", "Amazon S3", "Firebase", "Supabase", "WebSockets", "Docker", "Git", "Linux", "NGINX"] },
];

const EDUCATION = [
  {
    degree: "BSc Computer Engineering",
    school: "Lebanese French University (LFU), Erbil",
    period: "2024 — Present",
    note: "Third year",
  },
  {
    degree: "Associate of Science: IT",
    school: "Erbil Technical Institute, Erbil",
    period: "2010 — 2012",
  },
];

const LANGUAGES = [
  { name: "Kurdish", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Persian", level: "Good" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
      {children}
    </h2>
  );
}

export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const experience = getExperience();
  const projects = await getAllProjects("en");

  return (
    <div dir="ltr" className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div id="cv-root" className="mx-auto max-w-3xl animate-reveal text-start">
        {/* Action bar — hidden in print */}
        <div className="print:hidden mb-10 flex justify-end">
          <PrintButton label="Save as PDF" />
        </div>

        {/* Header */}
        <header className="cv-break-avoid pb-8 mb-10 border-b border-border">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {CONTACT.name}
          </h1>
          <p className="mt-2 text-lg text-primary font-medium">{CONTACT.title}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {CONTACT.links.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground no-underline transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </header>

        {/* Summary */}
        <section className="cv-break-avoid mb-12">
          <SectionLabel>Summary</SectionLabel>
          <p className="text-foreground/80 leading-relaxed">{CONTACT.summary}</p>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <SectionLabel>Skills</SectionLabel>
          <div className="space-y-7">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="cv-break-avoid">
                <h3 className="text-sm font-medium text-foreground mb-3">{group.label}</h3>
                <TechIcons items={group.items} size="sm" showLabel />
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <SectionLabel>Experience</SectionLabel>
          <div className="space-y-8">
            {experience.map((entry, i) => (
              <div key={i} className="cv-break-avoid">
                <div className="font-mono text-xs text-muted-foreground mb-1">{entry.period}</div>
                <h3 className="text-lg font-medium text-foreground">{entry.role}</h3>
                <div className="text-primary text-sm mb-3">{entry.company}</div>
                <ul className="mb-3 ps-5 list-disc text-sm text-muted-foreground leading-relaxed marker:text-muted-foreground/50">
                  {entry.achievements.map((a, j) => (
                    <li key={j} className="mb-1">{a}</li>
                  ))}
                </ul>
                <TechIcons items={entry.tech} size="sm" />
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <SectionLabel>Education</SectionLabel>
          <div className="space-y-5">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="cv-break-avoid">
                <div className="font-mono text-xs text-muted-foreground mb-1">{edu.period}</div>
                <h3 className="text-base font-medium text-foreground">{edu.degree}</h3>
                <div className="text-sm text-muted-foreground">
                  {edu.school}
                  {edu.note && <span> · {edu.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-12">
          <SectionLabel>Selected Projects</SectionLabel>
          <div className="space-y-7">
            {projects.map((project) => {
              const fm = project.frontmatter;
              return (
                <div key={project.slug} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-foreground">{fm.title}</h3>
                    {fm.liveUrl && (
                      <a
                        href={fm.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        {fm.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                      </a>
                    )}
                  </div>
                  {fm.role && <div className="text-xs text-muted-foreground mt-0.5">{fm.role}</div>}
                  {fm.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-3">
                      {fm.description}
                    </p>
                  )}
                  <TechIcons items={fm.tech} size="sm" max={10} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Languages */}
        <section className="cv-break-avoid">
          <SectionLabel>Languages</SectionLabel>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="text-sm">
                <span className="text-foreground font-medium">{lang.name}</span>
                <span className="text-muted-foreground"> — {lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
