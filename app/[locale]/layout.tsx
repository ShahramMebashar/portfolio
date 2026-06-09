import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { isLocale } from "@/lib/types";
import { getDictionary } from "@/lib/i18n";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoSansArabic = Noto_Sans_Arabic({ variable: "--font-noto-arabic", subsets: ["arabic"] });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ku" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "ku" ? "شەهرام | Full-Stack Developer" : "Shahram | Full Stack Developer",
    description: locale === "ku"
      ? "Full-Stack Developer - Go، Laravel، React"
      : "Full Stack Developer - Go, Laravel, React & TypeScript",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const dir = locale === "ku" ? "rtl" : "ltr";
  const fontClass = locale === "ku"
    ? `${notoSansArabic.variable} ${geistMono.variable}`
    : `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang={locale} dir={dir} className={fontClass} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Architectural Background Lines */}
          <div className="fixed inset-0 pointer-events-none z-[-1] flex justify-center w-full print:hidden">
            <div className="w-full max-w-5xl h-full border-x border-border/40"></div>
          </div>

          <div className="print:hidden">
            <Header locale={locale} dict={dict} />
          </div>
          <main>{children}</main>
          <div className="print:hidden">
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
