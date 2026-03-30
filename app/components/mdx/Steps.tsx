import React from "react";

export function Steps({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  return (
    <div className="my-6">
      {steps.map((child, i) => (
        <div key={i} className="flex gap-4 mb-4 items-start">
          <span className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
            {i + 1}
          </span>
          <div className="pt-0.5">{child}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
