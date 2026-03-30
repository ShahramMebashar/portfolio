import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { ViewTransitionLink } from "@/app/components/ViewTransitionLink";
import Image from "next/image";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="w-full border-b border-border/40">
      <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
        <div className="relative w-full overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 min-h-[75vh] relative z-10 w-full">
          
          {/* LEFT COLUMN: HERO TEXT */}
          <div className="flex flex-col justify-center max-w-xl animate-reveal select-none">
            
            <div className="relative mb-10 w-fit group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-[22px] blur-sm group-hover:blur-md transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[18px] bg-muted/40 border border-border/60 overflow-hidden flex items-center justify-center relative shadow-sm transition-transform duration-500 group-hover:scale-105 z-10">
                <span className="text-muted-foreground font-mono text-xs">SH</span>
                <Image 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop" 
                  alt="Avatar" 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -end-2 bg-background border border-border/80 shadow-md rounded-full p-1.5 flex items-center justify-center text-lg z-20 w-8 h-8 md:w-9 md:h-9 hover:rotate-12 transition-transform cursor-default">
                👋
              </div>
            </div>

            <h1 className="text-[3.5rem] md:text-[5.5rem] leading-[0.95] tracking-[-0.04em] font-extrabold text-foreground mb-6 transition-all">
              Hello.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                I&apos;m Shahram.
              </span>
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-muted-foreground leading-snug mb-8 tracking-tight">
              Full Stack Developer <span className="mx-2 text-border">|</span> I Bring Ideas to Life
            </h2>

            <p className="text-foreground/75 leading-relaxed mb-6 font-normal text-base md:text-[1.05rem]">
              I turn ideas into real products. From MVPs for startups to scalable production systems — I work across the entire stack with Go, Laravel, React, Vue, and Flutter to ship fast and ship right.
            </p>

            <p className="text-foreground font-medium mb-4">
              Got an idea that needs building? <span className="text-foreground/60">Let&apos;s make it happen.</span>
            </p>

            <ul className="text-foreground/70 leading-relaxed mb-10 list-none space-y-2.5 font-sans">
              {[
                "MVPs & startup products — idea to launch",
                "Full stack web apps with Go, Laravel, React & Vue",
                "Mobile apps with Flutter (iOS & Android)",
                "APIs, databases, DevOps — the full picture"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-primary opacity-70 flex-shrink-0" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <ViewTransitionLink href="mailto:hello@shaho.dev" className="group relative px-7 py-3 rounded-full bg-foreground text-background font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 text-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.05)]">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  Schedule a meeting
                  <svg className="ms-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              </ViewTransitionLink>
              <ViewTransitionLink href={`/${locale}/about`} className="px-7 py-3 rounded-full bg-transparent text-foreground border border-border/80 font-semibold transition-all hover:bg-muted/50 hover:border-foreground/20 text-sm">
                Resume
              </ViewTransitionLink>
            </div>
          </div>

          {/* RIGHT COLUMN: UI COLLAGE */}
          <div className="hidden lg:flex flex-col justify-center items-center relative animate-reveal delay-2 select-none">
            
            <div className="relative w-full max-w-[600px] h-full min-h-[550px] flex items-center justify-center perspective-[1000px]">
              
              {/* Background gradient orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[80px] opacity-60"></div>

              {/* Window 1 - Fun Code: Coffee-Driven Development */}
              <div dir="ltr" className="absolute left-[-2%] top-[10%] w-[400px] bg-[#0d0d0d] backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.3)] transform -rotate-3 hover:-translate-y-2 hover:rotate-0 transition-all duration-500 z-20 ease-out group">
                {/* Header */}
                <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="flex gap-1.5 mr-5 opacity-70 group-hover:opacity-100 transition-opacity relative z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="text-[10px] font-mono text-white/80 tracking-wide border-b border-amber-400/50 pb-1">developer.go</div>
                    <div className="text-[10px] font-mono text-white/30 tracking-wide pb-1 hover:text-white/60 transition-colors">coffee.log</div>
                  </div>
                </div>
                {/* Code Body — generous spacing */}
                <div className="px-5 py-4 font-mono text-[11px] md:text-[12px] leading-[1.7] text-white/80 overflow-hidden text-left relative">
                  <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-amber-500/8 blur-[60px] pointer-events-none rounded-full"></div>

                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">1</span><span className="text-[#ff7b72]">package</span> <span className="text-white/90">life</span></div>
                  <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">2</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">3</span><span className="text-[#ff7b72]">type</span> <span className="text-[#d2a8ff]">Developer</span> <span className="text-[#ff7b72]">struct</span> <span className="text-white">{"{"}</span></div>
                  <div className="flex gap-2 group-hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">4</span><span className="pl-4 text-[#a5d6ff]">Name</span> &nbsp;&nbsp;<span className="text-[#ff7b72]">string</span></div>
                  <div className="flex gap-2 group-hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">5</span><span className="pl-4 text-[#a5d6ff]">Coffee</span> <span className="text-[#ff7b72]">int</span></div>
                  <div className="flex gap-2 group-hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">6</span><span className="pl-4 text-[#a5d6ff]">Skills</span> <span className="text-white">[]</span><span className="text-[#ff7b72]">string</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">7</span><span className="text-white">{"}"}</span></div>
                  <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">8</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">9</span><span className="text-[#ff7b72]">func</span> <span className="text-[#d2a8ff]">main</span><span className="text-white">() {"{"}</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">10</span><span className="pl-4">me</span> <span className="text-[#ff7b72]">:=</span> <span className="text-[#d2a8ff]">Developer</span><span className="text-white">{"{"}</span></div>
                  <div className="flex gap-2 group-hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">11</span><span className="pl-8 text-[#a5d6ff]">Name</span><span className="text-[#ff7b72]">:</span> &nbsp;&nbsp;<span className="text-[#a5d6ff]">&quot;Shahram&quot;</span><span className="text-white">,</span></div>
                  <div className="flex gap-2 group-hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">12</span><span className="pl-8 text-[#a5d6ff]">Coffee</span><span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">9999</span><span className="text-white">,</span> <span className="text-[#8b949e] italic">// and counting</span></div>
                  <div className="flex gap-2 group-hover:bg-amber-500/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">13</span><span className="pl-8 text-[#a5d6ff]">Skills</span><span className="text-[#ff7b72]">:</span> <span className="text-white">[]</span><span className="text-[#ff7b72]">string</span><span className="text-white">{"{"}</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">14</span><span className="pl-12 text-[#a5d6ff]">&quot;Go&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;Laravel&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;React&quot;</span><span className="text-white">,</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">15</span><span className="pl-12 text-[#a5d6ff]">&quot;Vue&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;Flutter&quot;</span><span className="text-white">,</span> <span className="text-[#a5d6ff]">&quot;JS&quot;</span><span className="text-white">{"}"}</span><span className="text-white">,</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">16</span><span className="pl-4 text-white">{"}"}</span></div>
                  <div className="flex gap-2 h-4"><span className="text-white/20 w-6 text-right select-none shrink-0">17</span></div>
                  <div className="flex gap-2 opacity-80"><span className="text-white/20 w-6 text-right select-none shrink-0">18</span><span className="pl-4 text-[#8b949e] italic">// The secret to shipping fast</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">19</span><span className="pl-4 text-[#ff7b72]">for</span> <span className="text-white">me.Coffee &gt; </span><span className="text-[#79c0ff]">0</span> <span className="text-white">{"{"}</span></div>
                  <div className="flex gap-2 group-hover:bg-white/5 transition-colors rounded"><span className="text-white/20 w-6 text-right select-none shrink-0">20</span><span className="pl-8">me.</span><span className="text-[#d2a8ff]">BuildSomethingAwesome</span><span className="text-white">()</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">21</span><span className="pl-4 text-white">{"}"}</span></div>
                  <div className="flex gap-2"><span className="text-white/20 w-6 text-right select-none shrink-0">22</span><span className="text-white">{"}"}</span></div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
