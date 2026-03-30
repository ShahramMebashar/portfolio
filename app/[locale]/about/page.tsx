import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import { getContentSource } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const source = await getContentSource("about", locale as Locale);
  if (!source) notFound();

  const { content } = await renderMDX(source);

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.about.title}</h1></section>
      <article className="prose">{content}</article>
    </div>
  );
}
