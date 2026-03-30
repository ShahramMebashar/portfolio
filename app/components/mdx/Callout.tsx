import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

const config = {
  info: { border: "border-s-primary", bg: "bg-primary/5", label: "Info", labelColor: "text-primary" },
  tip: { border: "border-s-emerald-500", bg: "bg-emerald-500/5", label: "Tip", labelColor: "text-emerald-500" },
  warning: { border: "border-s-amber-500", bg: "bg-amber-500/5", label: "Warning", labelColor: "text-amber-500" },
  danger: { border: "border-s-red-500", bg: "bg-red-500/5", label: "Danger", labelColor: "text-red-500" },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const c = config[type];
  return (
    <div className={cn("border-s-[3px] rounded-e-md p-4 my-6", c.border, c.bg)}>
      <strong className={cn("text-sm block mb-1", c.labelColor)}>{c.label}</strong>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
