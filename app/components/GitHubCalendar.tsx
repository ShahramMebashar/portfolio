"use client";

import { GitHubCalendar as GitHubCalendarLib } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GitHubCalendar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-[120px]" />;

  return (
    <GitHubCalendarLib
      username="ShahramMebashar"
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      blockSize={11}
      blockMargin={4}
      fontSize={12}
      style={{ fontFamily: "inherit" }}
      theme={{
        dark: ["#1a1a1a", "#1d3a2a", "#2a5c3f", "#37845a", "#4ade80"],
        light: ["#f0fdf4", "#bbf7d0", "#86efac", "#4ade80", "#16a34a"],
      }}
    />
  );
}
