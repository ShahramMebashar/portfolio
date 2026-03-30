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
    <div style={{ position: "relative", paddingInlineStart: "2rem" }}>
      <div style={{ position: "absolute", insetInlineStart: "0", top: "0", bottom: "0", width: "2px", background: "var(--line)" }} />
      {entries.map((entry, i) => (
        <div key={i} style={{ position: "relative", marginBottom: "2.5rem" }}>
          <div style={{ position: "absolute", insetInlineStart: "-2rem", top: "0.35rem", width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? "var(--accent)" : "var(--line)", transform: "translateX(-50%)", marginInlineStart: "1px" }} />
          <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{entry.period}</div>
          <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem" }}>{entry.role}</h3>
          <div style={{ color: "var(--accent)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{entry.company}</div>
          <ul style={{ margin: "0 0 0.75rem", paddingInlineStart: "1.25rem", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {entry.achievements.map((a, j) => (<li key={j}>{a}</li>))}
          </ul>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {entry.tech.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--text-muted)", border: "1px solid var(--line)", padding: "0.1rem 0.4rem", borderRadius: "3px" }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type { TimelineEntry };
