import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="layout">
      <Separator />
      <div className="flex justify-between items-center py-[4vw] text-sm uppercase tracking-wide text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Shaho</span>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">Github</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:opacity-60 transition-opacity">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
