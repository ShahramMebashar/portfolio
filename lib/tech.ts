import {
  SiGo, SiPhp, SiJavascript, SiTypescript, SiDart, SiHtml5, SiCss,
  SiLaravel, SiReact, SiVuedotjs, SiFlutter, SiNextdotjs, SiTailwindcss,
  SiPostgresql, SiMysql, SiRedis, SiDocker, SiGit, SiLinux, SiNginx, SiInertia,
  SiSupabase, SiFirebase, SiLivewire,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { TanStackIcon, S3Icon, WebSocketIcon } from "./customTechIcons";

export interface TechMeta {
  key: string;
  Icon: IconType;
  name: string;
  color: string;
}

const registry: Record<string, Omit<TechMeta, "key">> = {
  go:         { Icon: SiGo,         name: "Go",         color: "#00ADD8" },
  php:        { Icon: SiPhp,        name: "PHP",        color: "#777BB4" },
  javascript: { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  dart:       { Icon: SiDart,       name: "Dart",       color: "#0175C2" },
  html:       { Icon: SiHtml5,      name: "HTML",       color: "#E34F26" },
  css:        { Icon: SiCss,        name: "CSS",        color: "#1572B6" },

  laravel:    { Icon: SiLaravel,     name: "Laravel",    color: "#FF2D20" },
  react:      { Icon: SiReact,       name: "React",      color: "#61DAFB" },
  vue:        { Icon: SiVuedotjs,    name: "Vue.js",     color: "#4FC08D" },
  inertia:    { Icon: SiInertia,     name: "Inertia.js", color: "#9553E9" },
  livewire:   { Icon: SiLivewire,    name: "Livewire",   color: "#FB70A9" },
  flutter:    { Icon: SiFlutter,     name: "Flutter",    color: "#02569B" },
  next:       { Icon: SiNextdotjs,   name: "Next.js",    color: "#888888" },
  tanstack:   { Icon: TanStackIcon,  name: "TanStack Start", color: "#FF4154" },
  tailwind:   { Icon: SiTailwindcss, name: "Tailwind",   color: "#06B6D4" },
  supabase:   { Icon: SiSupabase,    name: "Supabase",   color: "#3FCF8E" },
  postgresql: { Icon: SiPostgresql,  name: "PostgreSQL", color: "#4169E1" },
  mysql:      { Icon: SiMysql,       name: "MySQL",      color: "#4479A1" },
  redis:      { Icon: SiRedis,       name: "Redis",      color: "#FF4438" },
  s3:         { Icon: S3Icon,        name: "Amazon S3",  color: "#569A31" },
  firebase:   { Icon: SiFirebase,    name: "Firebase",   color: "#DD2C00" },
  websockets: { Icon: WebSocketIcon, name: "WebSockets", color: "#2563EB" },
  docker:     { Icon: SiDocker,      name: "Docker",     color: "#2496ED" },
  git:        { Icon: SiGit,         name: "Git",        color: "#F05032" },
  linux:      { Icon: SiLinux,       name: "Linux",      color: "#FCC624" },
  nginx:      { Icon: SiNginx,       name: "NGINX",      color: "#009639" },
};

const aliases: Record<string, string> = {
  "vue.js": "vue",
  "vuejs": "vue",
  "vue 3": "vue",
  "vue3": "vue",
  "next.js": "next",
  "nextjs": "next",
  "inertia.js": "inertia",
  "inertiajs": "inertia",
  "tanstack start": "tanstack",
  "tanstack": "tanstack",
  "tanstackstart": "tanstack",
  "html5": "html",
  "css3": "css",
  "postgres": "postgresql",
  "postgis": "postgresql",
  "tailwindcss": "tailwind",
  "amazon s3": "s3",
  "aws s3": "s3",
  "aws": "s3",
  "websocket": "websockets",
  "web sockets": "websockets",
  "web socket": "websockets",
};

function normalize(name: string): string {
  const k = name.toLowerCase().trim();
  return aliases[k] ?? k;
}

export function getTechMeta(name: string): TechMeta | undefined {
  const key = normalize(name);
  const hit = registry[key];
  return hit ? { key, ...hit } : undefined;
}

export const LANGUAGE_KEYS = ["go", "php", "javascript", "typescript", "dart", "html", "css"] as const;
export const TOOL_KEYS = ["laravel", "react", "vue", "flutter", "next", "tailwind", "postgresql", "mysql", "redis", "docker", "git", "linux", "nginx"] as const;

export function getTechByKeys(keys: readonly string[]): TechMeta[] {
  return keys.map((k) => ({ key: k, ...registry[k] }));
}
