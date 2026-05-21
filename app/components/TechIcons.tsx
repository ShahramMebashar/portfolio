import { getTechMeta } from "@/lib/tech";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: string; icon: number; label: string; gap: string }> = {
  sm: { box: "w-8 h-8 rounded-lg",      icon: 16, label: "text-[10px]", gap: "gap-1.5" },
  md: { box: "w-11 h-11 rounded-[10px]", icon: 20, label: "text-[10px]", gap: "gap-2" },
  lg: { box: "w-14 h-14 rounded-xl",    icon: 26, label: "text-[10px]", gap: "gap-3" },
};

interface Props {
  items: string[];
  size?: Size;
  showLabel?: boolean;
  max?: number;
}

export default function TechIcons({ items, size = "md", showLabel, max }: Props) {
  const sz = SIZES[size];
  const labelled = showLabel ?? size !== "sm";
  const visible = typeof max === "number" ? items.slice(0, max) : items;
  const overflow = typeof max === "number" ? items.length - max : 0;

  return (
    <div className={`flex flex-wrap ${sz.gap}`}>
      {visible.map((raw) => {
        const meta = getTechMeta(raw);
        if (!meta) {
          return (
            <div key={raw} className="flex flex-col items-center gap-2 group/item" title={raw}>
              <div className={`${sz.box} border border-border/40 bg-muted/20 flex items-center justify-center font-mono text-muted-foreground/70 text-[10px] px-2`}>
                {raw}
              </div>
              {labelled && <span className={`font-mono text-muted-foreground/60 ${sz.label}`}>{raw}</span>}
            </div>
          );
        }
        const { Icon, name, color } = meta;
        return (
          <div key={meta.key} className="flex flex-col items-center gap-2 group/item" title={name}>
            <div className={`${sz.box} border border-border/40 bg-muted/20 flex items-center justify-center transition-all duration-300 group-hover/item:border-border/80 group-hover/item:bg-muted/50`}>
              <Icon
                size={sz.icon}
                color={color}
                className="grayscale opacity-40 transition-all duration-300 group-hover/item:grayscale-0 group-hover/item:opacity-100"
              />
            </div>
            {labelled && (
              <span className={`font-mono text-muted-foreground/60 group-hover/item:text-muted-foreground transition-colors duration-300 ${sz.label}`}>
                {name}
              </span>
            )}
          </div>
        );
      })}
      {overflow > 0 && (
        <div className="flex flex-col items-center gap-2">
          <div className={`${sz.box} border border-border/40 bg-muted/20 flex items-center justify-center font-mono text-muted-foreground/70 text-xs`}>
            +{overflow}
          </div>
          {labelled && <span className={`font-mono text-transparent ${sz.label}`}>.</span>}
        </div>
      )}
    </div>
  );
}
