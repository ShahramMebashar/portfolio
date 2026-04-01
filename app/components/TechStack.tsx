"use client";

import {
  SiGo, SiPhp, SiJavascript, SiTypescript, SiDart, SiHtml5, SiCss,
  SiLaravel, SiReact, SiVuedotjs, SiFlutter, SiNextdotjs, SiTailwindcss,
  SiPostgresql, SiMysql, SiRedis, SiDocker, SiGit, SiLinux, SiNginx,
} from "react-icons/si";
import type { IconType } from "react-icons";

const languages: { Icon: IconType; name: string; color: string }[] = [
  { Icon: SiGo,         name: "Go",         color: "#00ADD8" },
  { Icon: SiPhp,        name: "PHP",        color: "#777BB4" },
  { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { Icon: SiDart,       name: "Dart",       color: "#0175C2" },
  { Icon: SiHtml5,      name: "HTML",       color: "#E34F26" },
  { Icon: SiCss,        name: "CSS",        color: "#1572B6" },
];

const tools: { Icon: IconType; name: string; color: string }[] = [
  { Icon: SiLaravel,     name: "Laravel",    color: "#FF2D20" },
  { Icon: SiReact,       name: "React",      color: "#61DAFB" },
  { Icon: SiVuedotjs,    name: "Vue.js",     color: "#4FC08D" },
  { Icon: SiFlutter,     name: "Flutter",    color: "#02569B" },
  { Icon: SiNextdotjs,   name: "Next.js",    color: "#888888" },
  { Icon: SiTailwindcss, name: "Tailwind",   color: "#06B6D4" },
  { Icon: SiPostgresql,  name: "PostgreSQL", color: "#4169E1" },
  { Icon: SiMysql,       name: "MySQL",      color: "#4479A1" },
  { Icon: SiRedis,       name: "Redis",      color: "#FF4438" },
  { Icon: SiDocker,      name: "Docker",     color: "#2496ED" },
  { Icon: SiGit,         name: "Git",        color: "#F05032" },
  { Icon: SiLinux,       name: "Linux",      color: "#FCC624" },
  { Icon: SiNginx,       name: "NGINX",      color: "#009639" },
];

function TechItem({ Icon, name, color }: { Icon: IconType; name: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group/item">
      <div className="w-14 h-14 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-center transition-all duration-300 group-hover/item:border-border/80 group-hover/item:bg-muted/50">
        <Icon
          size={26}
          color={color}
          className="grayscale opacity-40 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100"
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground/60 group-hover/item:text-muted-foreground transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export default function TechStack({ langLabel, toolsLabel }: { langLabel: string; toolsLabel: string }) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-6">{langLabel}</h2>
        <div className="flex flex-wrap gap-3">
          {languages.map((item) => (
            <TechItem key={item.name} {...item} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-6">{toolsLabel}</h2>
        <div className="flex flex-wrap gap-3">
          {tools.map((item) => (
            <TechItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
