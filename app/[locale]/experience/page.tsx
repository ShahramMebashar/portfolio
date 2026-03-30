import { notFound } from "next/navigation";
import { isLocale } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import Timeline from "@/app/components/Timeline";
import type { TimelineEntry } from "@/app/components/Timeline";
import fs from "fs";
import path from "path";

async function getExperienceData(locale: Locale): Promise<TimelineEntry[]> {
  const filePath = path.join(process.cwd(), "content", "experience", `${locale}.json`);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const entries = await getExperienceData(locale as Locale);

  return (
    <div className="layout">
      <section className="hero"><h1>{dict.experience.title}</h1></section>
      <Timeline entries={entries} />
    </div>
  );
}
