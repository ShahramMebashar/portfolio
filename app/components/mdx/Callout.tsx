interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

const styles: Record<string, { border: string; bg: string; label: string }> = {
  info: { border: "#0055FF", bg: "#0055FF10", label: "Info" },
  tip: { border: "#10B981", bg: "#10B98110", label: "Tip" },
  warning: { border: "#F59E0B", bg: "#F59E0B10", label: "Warning" },
  danger: { border: "#EF4444", bg: "#EF444410", label: "Danger" },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const s = styles[type];
  return (
    <div
      style={{
        borderInlineStart: `3px solid ${s.border}`,
        background: s.bg,
        padding: "1rem 1.25rem",
        borderRadius: "0 6px 6px 0",
        margin: "1.5rem 0",
      }}
    >
      <strong style={{ color: s.border, fontSize: "0.85rem", display: "block", marginBottom: "0.25rem" }}>
        {s.label}
      </strong>
      <div style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
