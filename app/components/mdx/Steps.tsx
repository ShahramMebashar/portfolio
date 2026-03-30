import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  return (
    <div style={{ margin: "1.5rem 0" }}>
      {steps.map((child, i) => (
        <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
          <span
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "var(--accent)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </span>
          <div style={{ paddingTop: "3px" }}>{child}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
