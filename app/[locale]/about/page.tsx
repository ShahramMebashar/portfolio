import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getContentSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import GitHubCalendar from "@/app/components/GitHubCalendar";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getContentSource("about", locale as Locale);
  if (!source) notFound();

  const { content } = await renderMDX(source);

  return (
    <div className="layout pt-32 pb-24 md:pt-40 min-h-screen max-w-3xl">
      <div className="animate-reveal">
        <section className="mb-12 md:mb-16 py-0 flex flex-col items-start">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight font-extrabold text-foreground">
            {dict.about.title}
          </h1>
        </section>
        <article className="prose animate-reveal delay-1 w-full max-w-none text-lg">
          {content}
        </article>
        <div className="mt-12 pt-12 border-t border-border/40 animate-reveal delay-2">
          <h2 className="text-sm font-mono text-muted-foreground mb-6 tracking-wide uppercase">GitHub Contributions</h2>
          <GitHubCalendar />
        </div>
      </div>
    </div>
  );
}
