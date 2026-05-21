import { LANGUAGE_KEYS, TOOL_KEYS, getTechByKeys } from "@/lib/tech";
import TechIcons from "./TechIcons";

export default function TechStack({ langLabel, toolsLabel }: { langLabel: string; toolsLabel: string }) {
  const languages = getTechByKeys(LANGUAGE_KEYS).map((m) => m.name);
  const tools = getTechByKeys(TOOL_KEYS).map((m) => m.name);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-6">{langLabel}</h2>
        <TechIcons items={languages} size="lg" />
      </div>
      <div>
        <h2 className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest mb-6">{toolsLabel}</h2>
        <TechIcons items={tools} size="lg" />
      </div>
    </div>
  );
}
