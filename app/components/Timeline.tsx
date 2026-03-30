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
          <div className={`absolute -start-[2.05rem] top-1.5 size-2.5 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`} />
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
