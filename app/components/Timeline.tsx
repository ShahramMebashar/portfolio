import TechIcons from "./TechIcons";

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
    <div className="relative">
      {entries.map((entry, i) => (
        <div key={i} className="relative mb-10">
          {/* Dot centered on the page's architectural border line (border-x on max-w-5xl).
              Layout padding: px-6 (1.5rem) mobile, px-12 (3rem) desktop.
              Dot size: size-2.5 (10px), half = 5px.
              start = -(padding + half-dot) positions center of dot on the border.
              Logical property `start` works for both LTR and RTL. */}
          <div
            className={`absolute start-[calc(-1.5rem_-_5px)] md:start-[calc(-3rem_-_5px)] top-1.5 size-2.5 rounded-full ring-2 ring-background ${
              i === 0 ? "bg-primary" : "bg-border"
            }`}
          />
          <div className="font-mono text-xs text-muted-foreground mb-1">{entry.period}</div>
          <h3 className="text-lg font-medium mb-0.5">{entry.role}</h3>
          <div className="text-primary text-sm mb-3">{entry.company}</div>
          <ul className="mb-3 ps-5 text-sm text-muted-foreground leading-relaxed">
            {entry.achievements.map((a, j) => (<li key={j} className="mb-1">{a}</li>))}
          </ul>
          <TechIcons items={entry.tech} size="sm" />
        </div>
      ))}
    </div>
  );
}

export type { TimelineEntry };
