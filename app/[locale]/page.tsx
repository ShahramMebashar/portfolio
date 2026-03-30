import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { isLocale } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="layout">
      <section className="hero">
        <h1>{dict.home.hero_title}</h1>
        <p>{dict.home.hero_subtitle}</p>
      </section>
    </div>
  );
}
