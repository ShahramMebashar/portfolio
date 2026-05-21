import { FiUser, FiCalendar, FiExternalLink } from "react-icons/fi";
import TechIcons from "./TechIcons";

interface Labels {
  role: string;
  year: string;
  live: string;
  builtWith: string;
}

interface Props {
  role?: string;
  year?: string;
  liveUrl?: string;
  tech: string[];
  labels: Labels;
}

function MetaRow({ icon: Icon, label, value, href }: {
  icon: typeof FiUser;
  label: string;
  value: string;
  href?: string;
}) {
  const valueNode = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors">
      {value}
      <FiExternalLink className="w-3.5 h-3.5 opacity-60" />
    </a>
  ) : (
    <span className="text-foreground">{value}</span>
  );

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/40 border border-border/40 text-muted-foreground">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">{label}</span>
        <span className="text-sm font-medium">{valueNode}</span>
      </div>
    </div>
  );
}

export default function ProjectMeta({ role, year, liveUrl, tech, labels }: Props) {
  const hostname = liveUrl ? new URL(liveUrl).hostname.replace(/^www\./, "") : undefined;
  const hasMeta = role || year || liveUrl;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 p-6 md:p-7 rounded-2xl border border-border/50 bg-muted/20">
      {hasMeta && (
        <div className="flex flex-col gap-5">
          {role && <MetaRow icon={FiUser} label={labels.role} value={role} />}
          {year && <MetaRow icon={FiCalendar} label={labels.year} value={year} />}
          {liveUrl && hostname && <MetaRow icon={FiExternalLink} label={labels.live} value={hostname} href={liveUrl} />}
        </div>
      )}
      {tech.length > 0 && (
        <div className="flex flex-col gap-3 md:items-end">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">{labels.builtWith}</span>
          <TechIcons items={tech} size="sm" />
        </div>
      )}
    </div>
  );
}
