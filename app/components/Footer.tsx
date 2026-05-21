import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedinIn } from "react-icons/fa6";

const links = [
  { href: "mailto:shahram.webdev@gmail.com", label: "Email", external: false, Icon: FaEnvelope },
  { href: "https://wa.me/9647508853530", label: "WhatsApp", external: true, Icon: FaWhatsapp },
  { href: "https://github.com/ShahramMebashar", label: "GitHub", external: true, Icon: FaGithub },
  { href: "https://www.linkedin.com/in/shahram-hassan/", label: "LinkedIn", external: true, Icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[13px] font-medium text-muted-foreground">
        <span className="text-foreground/80 tracking-tight">
          &copy; {new Date().getFullYear()} Shahram M. Hassan
        </span>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, external, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
            >
              <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
