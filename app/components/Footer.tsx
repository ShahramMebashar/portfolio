import { ViewTransitionLink } from "./ViewTransitionLink";

export default function Footer() {
  return (
    <footer className="w-full py-16 px-6 md:px-12 mt-20 border-t border-border/40 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[13px] font-medium text-muted-foreground">
        <span className="text-foreground/80 tracking-tight">&copy; {new Date().getFullYear()} Shahram M. Hassan</span>
        <div className="flex gap-8">
          <ViewTransitionLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground relative group transition-colors">
            Twitter
            <span className="absolute -bottom-1 start-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
          </ViewTransitionLink>
          <ViewTransitionLink href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground relative group transition-colors">
            Github
            <span className="absolute -bottom-1 start-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
          </ViewTransitionLink>
          <ViewTransitionLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground relative group transition-colors">
            LinkedIn
            <span className="absolute -bottom-1 start-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
          </ViewTransitionLink>
        </div>
      </div>
    </footer>
  );
}
