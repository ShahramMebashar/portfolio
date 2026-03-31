"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const goCode = (
  <>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">1</span><span className="text-[#ff7b72]">package</span> <span className="text-white/90">life</span></div>
    <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">2</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">3</span><span className="text-[#ff7b72]">type</span> <span className="text-[#d2a8ff]">Developer</span> <span className="text-[#ff7b72]">struct</span> <span className="text-white">{"{"}</span></div>
    <div className="flex gap-2 hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">4</span><span className="pl-4 text-[#a5d6ff]">Name</span> &nbsp;&nbsp;<span className="text-[#ff7b72]">string</span></div>
    <div className="flex gap-2 hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">5</span><span className="pl-4 text-[#a5d6ff]">Coffee</span> <span className="text-[#ff7b72]">int</span></div>
    <div className="flex gap-2 hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">6</span><span className="pl-4 text-[#a5d6ff]">Skills</span> <span className="text-white">[]</span><span className="text-[#ff7b72]">string</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">7</span><span className="text-white">{"}"}</span></div>
    <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">8</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">9</span><span className="text-[#ff7b72]">func</span> <span className="text-[#d2a8ff]">main</span><span className="text-white">() {"{"}</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">10</span><span className="pl-4">me</span> <span className="text-[#ff7b72]">:=</span> <span className="text-[#d2a8ff]">Developer</span><span className="text-white">{"{"}</span></div>
    <div className="flex gap-2 hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">11</span><span className="pl-8 text-[#a5d6ff]">Name</span><span className="text-[#ff7b72]">:</span> &nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Shahram&quot;</span><span className="text-white">,</span></div>
    <div className="flex gap-2 hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">12</span><span className="pl-8 text-[#a5d6ff]">Coffee</span><span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">9999</span><span className="text-white">,</span> <span className="text-[#8b949e] italic">// and counting</span></div>
    <div className="flex gap-2 hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">13</span><span className="pl-8 text-[#a5d6ff]">Skills</span><span className="text-[#ff7b72]">:</span> <span className="text-white">[]</span><span className="text-[#ff7b72]">string</span><span className="text-white">{"{"}</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">14</span><span className="pl-12 text-[#a5d6ff]">&quot;Go&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;Laravel&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;React&quot;</span><span className="text-white">,</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">15</span><span className="pl-12 text-[#a5d6ff]">&quot;Vue&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;Flutter&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;JS&quot;</span><span className="text-white">{"}"}</span><span className="text-white">,</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">16</span><span className="pl-4 text-white">{"}"}</span></div>
    <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">17</span></div>
    <div className="flex gap-2 opacity-80"><span className="text-white/20 w-6 text-right select-none shrink-0">18</span><span className="pl-4 text-[#8b949e] italic">// The secret to shipping fast</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">19</span><span className="pl-4 text-[#ff7b72]">for</span> <span className="text-white">me.Coffee &gt; </span><span className="text-[#79c0ff]">0</span> <span className="text-white">{"{"}</span></div>
    <div className="flex gap-2 hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">20</span><span className="pl-8">me.</span><span className="text-[#d2a8ff]">BuildSomethingAwesome</span><span className="text-white">()</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">21</span><span className="pl-4 text-white">{"}"}</span></div>
    <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">22</span><span className="text-white">{"}"}</span></div>
  </>
);

const coffeeLog = (
  <div className="space-y-1">
    <div><span className="text-white/30">[06:00]</span> <span className="text-amber-400">☕</span> <span className="text-white/60">Coffee #1 — System booting...</span></div>
    <div><span className="text-white/30">[06:15]</span> <span className="text-emerald-400">✓</span> <span className="text-white/60">Brain online. Opening VS Code.</span></div>
    <div><span className="text-white/30">[06:30]</span> <span className="text-blue-400">→</span> <span className="text-white/80">Started new feature branch</span></div>
    <div><span className="text-white/30">[08:00]</span> <span className="text-amber-400">☕</span> <span className="text-white/60">Coffee #2 — Entering flow state</span></div>
    <div><span className="text-white/30">[08:45]</span> <span className="text-emerald-400">✓</span> <span className="text-white/80">API endpoints done. Tests passing.</span></div>
    <div><span className="text-white/30">[10:00]</span> <span className="text-amber-400">☕</span> <span className="text-white/60">Coffee #3 — Peak productivity</span></div>
    <div><span className="text-white/30">[10:30]</span> <span className="text-purple-400">⚡</span> <span className="text-white/80">Deployed to staging</span></div>
    <div><span className="text-white/30">[11:00]</span> <span className="text-emerald-400">✓</span> <span className="text-white/80">Client demo — they love it</span></div>
    <div><span className="text-white/30">[12:00]</span> <span className="text-amber-400">☕</span> <span className="text-white/60">Coffee #4 — Lunch? No. Code.</span></div>
    <div><span className="text-white/30">[14:00]</span> <span className="text-emerald-400">✓</span> <span className="text-white/80">PR merged to production</span></div>
    <div><span className="text-white/30">[14:01]</span> <span className="text-amber-400">☕</span> <span className="text-white/60">Coffee #5 — Starting next feature</span></div>
    <div className="pt-1"><span className="text-white/30">[∞:∞∞]</span> <span className="text-amber-400">☕</span> <span className="text-white/40 italic">repeat(forever)</span></div>
  </div>
);

export default function CodeWidget() {
  const [tab, setTab] = useState<"code" | "log">("code");

  return (
    <div dir="ltr" className="absolute right-0 top-[10%] w-[400px] bg-[#0d0d0d] backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.3)] transform -rotate-3 hover:-translate-y-2 hover:rotate-0 transition-all duration-500 z-20 ease-out">
      {/* Header with clickable tabs */}
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-1.5 mr-5 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex gap-0">
          <button
            onClick={() => setTab("code")}
            className={cn(
              "text-[10px] font-mono tracking-wide pb-1 px-3 transition-colors border-b cursor-pointer bg-transparent",
              tab === "code"
                ? "text-white/80 border-amber-400/50"
                : "text-white/30 border-transparent hover:text-white/50"
            )}
          >
            developer.go
          </button>
          <button
            onClick={() => setTab("log")}
            className={cn(
              "text-[10px] font-mono tracking-wide pb-1 px-3 transition-colors border-b cursor-pointer bg-transparent",
              tab === "log"
                ? "text-white/80 border-emerald-400/50"
                : "text-white/30 border-transparent hover:text-white/50"
            )}
          >
            coffee.log
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 font-mono text-[11px] md:text-[12px] leading-[1.7] text-white/80 overflow-hidden text-left relative min-h-[340px]">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-amber-500/8 blur-[60px] pointer-events-none rounded-full" />
        {tab === "code" ? goCode : coffeeLog}
      </div>
    </div>
  );
}
