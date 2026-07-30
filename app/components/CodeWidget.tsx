"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Palette sampled from the code block on tailwindcss.com.
const KEY = "text-[#fb64b6]";   // keywords
const STR = "text-[#74d4ff]";   // strings and numbers
const FLD = "text-[#b2bdc9]";   // field and attribute names
const TXT = "text-[#dee0e3]";   // plain text
const DIM = "text-[#73777e]";   // comments and line numbers

// One entry per line; the gutter numbers them, so they never drift out of sync
// with the code the way hand-written numbers do.
const goLines: ReactNode[] = [
  <><span className={KEY}>package</span> <span className={TXT}>life</span></>,
  null,
  <><span className={KEY}>type</span> <span className={TXT}>Developer</span> <span className={KEY}>struct</span> <span className={TXT}>{"{"}</span></>,
  <><span className={FLD}>{"  "}Name</span>   <span className={KEY}>string</span></>,
  <><span className={FLD}>{"  "}Coffee</span> <span className={KEY}>int</span></>,
  <><span className={FLD}>{"  "}Skills</span> <span className={TXT}>[]</span><span className={KEY}>string</span></>,
  <><span className={TXT}>{"}"}</span></>,
  null,
  <><span className={KEY}>func</span> <span className={TXT}>main</span><span className={TXT}>() {"{"}</span></>,
  <><span className={TXT}>{"  "}me</span> <span className={KEY}>:=</span> <span className={TXT}>Developer{"{"}</span></>,
  <><span className={FLD}>{"    "}Name</span><span className={TXT}>:</span>   <span className={STR}>&quot;Shahram&quot;</span><span className={TXT}>,</span></>,
  <><span className={FLD}>{"    "}Coffee</span><span className={TXT}>:</span> <span className={STR}>9999</span><span className={TXT}>,</span> <span className={cn(DIM, "italic")}>// and counting</span></>,
  <><span className={FLD}>{"    "}Skills</span><span className={TXT}>:</span> <span className={TXT}>[]</span><span className={KEY}>string</span><span className={TXT}>{"{"}</span></>,
  <><span className={STR}>{"      "}&quot;Go&quot;</span><span className={TXT}>,</span> <span className={STR}>&quot;Laravel&quot;</span><span className={TXT}>,</span> <span className={STR}>&quot;React&quot;</span><span className={TXT}>,</span></>,
  <><span className={STR}>{"      "}&quot;Vue&quot;</span><span className={TXT}>,</span> <span className={STR}>&quot;Flutter&quot;</span><span className={TXT}>,</span> <span className={STR}>&quot;Swift&quot;</span><span className={TXT}>{"},"}</span></>,
  <><span className={TXT}>{"  }"}</span></>,
  null,
  <><span className={cn(DIM, "italic")}>{"  "}// The secret to shipping fast</span></>,
  <><span className={TXT}>{"  "}</span><span className={KEY}>for</span> <span className={TXT}>me.Coffee &gt;</span> <span className={STR}>0</span> <span className={TXT}>{"{"}</span></>,
  <><span className={TXT}>{"    "}me.BuildSomethingAwesome()</span></>,
  <><span className={TXT}>{"  }"}</span></>,
  <><span className={TXT}>{"}"}</span></>,
];

const logLines: ReactNode[] = [
  <><span className={DIM}>[06:00]</span> <span className="text-[#fbbf24]">☕</span> <span className={FLD}>Coffee #1 — System booting...</span></>,
  <><span className={DIM}>[06:15]</span> <span className="text-[#4ade80]">✓</span> <span className={FLD}>Brain online. Opening VS Code.</span></>,
  <><span className={DIM}>[06:30]</span> <span className={STR}>→</span> <span className={TXT}>Started new feature branch</span></>,
  <><span className={DIM}>[08:00]</span> <span className="text-[#fbbf24]">☕</span> <span className={FLD}>Coffee #2 — Entering flow state</span></>,
  <><span className={DIM}>[08:45]</span> <span className="text-[#4ade80]">✓</span> <span className={TXT}>API endpoints done. Tests passing.</span></>,
  <><span className={DIM}>[10:00]</span> <span className="text-[#fbbf24]">☕</span> <span className={FLD}>Coffee #3 — Peak productivity</span></>,
  <><span className={DIM}>[10:30]</span> <span className={KEY}>⚡</span> <span className={TXT}>Deployed to staging</span></>,
  <><span className={DIM}>[11:00]</span> <span className="text-[#4ade80]">✓</span> <span className={TXT}>Client demo — they love it</span></>,
  <><span className={DIM}>[12:00]</span> <span className="text-[#fbbf24]">☕</span> <span className={FLD}>Coffee #4 — Lunch? No. Code.</span></>,
  <><span className={DIM}>[14:00]</span> <span className="text-[#4ade80]">✓</span> <span className={TXT}>PR merged to production</span></>,
  <><span className={DIM}>[14:01]</span> <span className="text-[#fbbf24]">☕</span> <span className={FLD}>Coffee #5 — Starting next feature</span></>,
  <><span className={DIM}>[∞:∞∞]</span> <span className="text-[#fbbf24]">☕</span> <span className={cn(DIM, "italic")}>repeat(forever)</span></>,
];

function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <div className="flex">
      <div aria-hidden className={cn("shrink-0 select-none text-right pe-5 ps-1", DIM)}>
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="min-w-0 flex-1 whitespace-pre">
        {lines.map((line, i) => (
          <div key={i}>{line ?? " "}</div>
        ))}
      </div>
    </div>
  );
}

export default function CodeWidget() {
  const [tab, setTab] = useState<"code" | "log">("code");
  const lines = tab === "code" ? goLines : logLines;

  return (
    // No dir here: the shell must inherit the page direction so the logical
    // rounding and the bleed margin flip on the Kurdish side. Only the code
    // itself is pinned to LTR.
    <div className="w-full overflow-hidden rounded-s-2xl bg-[#1c202a]">
      <div className="flex items-center gap-5 bg-[#030712] px-5 py-3.5">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-[#353941]" />
          <span className="size-3 rounded-full bg-[#353941]" />
          <span className="size-3 rounded-full bg-[#353941]" />
        </div>
        <div className="flex gap-1">
          {(["code", "log"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={cn(
                "cursor-pointer rounded-md bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors",
                tab === key ? "bg-white/8 text-[#dee0e3]" : "text-[#73777e] hover:text-[#b2bdc9]"
              )}
            >
              {key === "code" ? "developer.go" : "coffee.log"}
            </button>
          ))}
        </div>
      </div>

      {/* Padding stays direction-aware (pe-10 clears the squared-off bleeding
          edge); only the code inside is pinned to LTR. */}
      <div className="overflow-x-auto py-5 ps-5 pe-10 font-mono text-[12.5px] leading-[1.9]">
        <div dir="ltr" className="text-left">
          <Lines lines={lines} />
        </div>
      </div>
    </div>
  );
}
