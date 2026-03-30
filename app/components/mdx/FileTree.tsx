interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.85rem",
        lineHeight: 1.8,
        padding: "1rem 1.25rem",
        margin: "1.5rem 0",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        direction: "ltr",
        textAlign: "left",
      }}
    >
      {children}
    </div>
  );
}
