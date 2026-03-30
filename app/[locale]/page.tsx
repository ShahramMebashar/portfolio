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
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 min-h-[70vh]">
        
        {/* LEFT COLUMN: HERO TEXT */}
        <div className="flex flex-col justify-center max-w-xl animate-reveal">
          
          <div className="relative mb-8 mt-4 w-fit">
            <div className="w-24 h-24 rounded-2xl bg-muted border border-border overflow-hidden flex items-center justify-center relative">
              <span className="text-muted-foreground font-mono text-xs">SH</span>
              <Image 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&h=256&auto=format&fit=crop" 
                alt="Avatar" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-background border border-border shadow-sm rounded-full p-1.5 flex items-center justify-center text-lg z-10 w-9 h-9">
              👋
            </div>
          </div>

          <h1 className="text-5xl md:text-[4.5rem] leading-[1.05] tracking-tight font-extrabold text-foreground mb-4">
            Hello,<br />I'm Shahram.
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground leading-snug mb-8">
            Sr. Full Stack Engineer | Building High-Performance, User-Friendly Web Apps
          </h2>

          <p className="text-foreground/70 leading-relaxed mb-6 font-medium">
            I'm a Senior Engineer passionate about crafting web applications that excel in both speed and design. I utilize the latest technologies and prioritize a user-centric approach to build scalable, responsive, and secure architectures for businesses.
          </p>

          <p className="text-foreground font-semibold mb-3">
            Looking to elevate your web app's performance and user experience? <span className="font-normal text-foreground/70">I can help you achieve that.</span>
          </p>

          <ul className="text-foreground/70 leading-relaxed mb-10 list-disc pl-5 space-y-1">
            <li>Modern architectures, Progressive Web Apps with Next.js and Go</li>
            <li>Web performance optimization & strict typing</li>
            <li>Scalable database structures with PostgreSQL</li>
            <li>Data visualization and custom dashboards</li>
            <li>and more...</li>
          </ul>

          <div className="flex items-center gap-4">
            <ViewTransitionLink href="mailto:hello@shahram.dev" className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold transition-transform hover:scale-105 active:scale-95 text-sm">
              Schedule a meeting
            </ViewTransitionLink>
            <ViewTransitionLink href={`/${locale}/about`} className="px-6 py-2.5 rounded-full bg-background text-foreground border border-border font-semibold transition-colors hover:bg-muted text-sm">
              Resume
            </ViewTransitionLink>
          </div>
        </div>

        {/* RIGHT COLUMN: UI MOCKUPS / DECORATION */}
        <div className="hidden lg:flex flex-col justify-center items-center relative animate-reveal delay-2">
          
          <div className="relative w-full max-w-[600px] h-full min-h-[500px] flex items-center justify-center">
            
            {/* UI Component Window 1 - Projects List */}
            <div className="absolute left-0 top-[10%] w-[340px] bg-background border border-border/60 rounded-2xl p-5 shadow-sm transform -rotate-2 hover:rotate-0 transition-all duration-500 z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-sm">Projects</span>
                <span className="bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded"> + New</span>
              </div>
              <div className="relative mb-4">
                <svg className="absolute left-2.5 top-2.5 w-3 h-3 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Filter projects..." className="w-full text-xs box-border pl-8 pr-3 py-2 bg-background border border-border/60 rounded-lg outline-none" disabled />
              </div>
              <div className="space-y-3">
                <div className="border border-border/50 rounded-lg p-3">
                  <div className="font-semibold text-xs mb-1">API Integration</div>
                  <div className="text-[10px] text-muted-foreground mb-2">Engineering</div>
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-400 border border-background"></div>
                    <div className="w-4 h-4 rounded-full bg-red-400 border border-background"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-400 border border-background"></div>
                  </div>
                </div>
                <div className="border border-border/50 rounded-lg p-3">
                  <div className="font-semibold text-xs mb-1">New Benefits Plan</div>
                  <div className="text-[10px] text-muted-foreground mb-2">Human Resources</div>
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-purple-400 border border-background"></div>
                    <div className="w-4 h-4 rounded-full bg-emerald-400 border border-background"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* UI Component Window 2 - Full Stack Radio Player */}
            <div className="absolute right-0 bottom-[15%] w-[380px] bg-background border border-border/60 rounded-2xl p-5 shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-500 z-20">
              <div className="flex gap-4 items-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md flex-shrink-0"></div>
                <div>
                  <div className="text-blue-500 text-xs font-semibold uppercase mb-1">Ep. 128</div>
                  <div className="text-[10px] text-muted-foreground line-clamp-1 break-all truncate w-[200px]">Scaling architectures with Go & Redis</div>
                  <div className="font-bold text-sm">Full Stack Radio</div>
                </div>
              </div>
              
              <div className="mb-2 w-full h-1 bg-muted rounded-full overflow-hidden relative">
                <div className="w-[45%] h-full bg-blue-500 rounded-full"></div>
                <div className="absolute left-[45%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-background border-2 border-blue-500 rounded-full shadow-sm"></div>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono font-bold mb-6">
                <span className="text-blue-500">24:16</span>
                <span>75:50</span>
              </div>
              
              <div className="flex justify-center items-center gap-6">
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-4m6 11v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2"></path></svg>
                <div className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 19V5h4v14h-4zm-8 0V5h4v14H6z"></path></svg>
                </div>
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 2.5l-1.6 2.45m4.742 4.41l-2.45-1.6"></path></svg>
              </div>
            </div>

            <div className="absolute -bottom-8 right-[20%] text-xs text-muted-foreground font-mono">
              UI Components Example
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
