import { ViewTransitionLink } from "./ViewTransitionLink";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 mt-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-muted-foreground">
        <span className="text-foreground font-semibold">&copy; {new Date().getFullYear()} Shahram M. Hassan</span>
        <div className="flex gap-6">
          <ViewTransitionLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</ViewTransitionLink>
          <ViewTransitionLink href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Github</ViewTransitionLink>
          <ViewTransitionLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</ViewTransitionLink>
        </div>
      </div>
    </footer>
  );
}
