import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { ViewTransitionLink } from "@/app/components/ViewTransitionLink";
import Image from "next/image";
import CodeWidget from "@/app/components/CodeWidget";

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
              {dict.home.greeting}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                {dict.home.name}
              </span>
            </h1>

            <h2 className="text-lg md:text-xl font-medium text-muted-foreground leading-snug mb-8 tracking-tight">
              {dict.home.subtitle} <span className="mx-2 text-border">|</span> {dict.home.subtitle_tagline}
            </h2>

            <p className="text-foreground/75 leading-relaxed mb-6 font-normal text-base md:text-[1.05rem]">
              {dict.home.bio}
            </p>

            <p className="text-foreground font-medium mb-4">
              {dict.home.cta_question} <span className="text-foreground/60">{dict.home.cta_answer}</span>
            </p>

            <ul className="text-foreground/70 leading-relaxed mb-10 list-none space-y-2.5 font-sans">
              {[
                dict.home.skill_1,
                dict.home.skill_2,
                dict.home.skill_3,
                dict.home.skill_4,
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
                  {dict.home.btn_contact}
                  <svg className="ms-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </span>
              </ViewTransitionLink>
              <ViewTransitionLink href={`/${locale}/about`} className="px-7 py-3 rounded-full bg-transparent text-foreground border border-border/80 font-semibold transition-all hover:bg-muted/50 hover:border-foreground/20 text-sm">
                {dict.home.btn_resume}
              </ViewTransitionLink>
            </div>
          </div>

          {/* RIGHT COLUMN: UI COLLAGE */}
          <div className="hidden lg:flex flex-col justify-center items-center relative animate-reveal delay-2 select-none">
            
            <div className="relative w-full max-w-[600px] h-full min-h-[550px] flex items-center justify-center perspective-[1000px]">
              
              {/* Background gradient orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[80px] opacity-60"></div>

              <CodeWidget />

              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
