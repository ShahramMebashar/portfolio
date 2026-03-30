interface FileTreeProps {
  children: React.ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="font-mono text-sm leading-relaxed p-4 my-6 border border-border rounded-lg" dir="ltr" style={{ textAlign: "left" }}>
      {children}
    </div>
  );
}
