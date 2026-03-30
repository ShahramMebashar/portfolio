"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={`header animate-fade ${isOpen ? "menu-active" : ""}`}>
        <Link href="/" className="brand" onClick={closeMenu}>
          <span style={{ color: "var(--accent)" }}>&lt;</span>Shaho <span style={{ color: "var(--accent)" }}>/&gt;</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="nav desktop-nav">
          <Link href="/#expertise">_Expertise</Link>
          <Link href="/#work">_Work</Link>
          <Link href="/#writing">_Writing</Link>
          <a href="mailto:hello@shaho.dev">_Contact</a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="mono" style={{ color: "var(--accent)" }}>[</span>
          <span className="mono toggle-text">{isOpen ? " Close " : " Menu "}</span>
          <span className="mono" style={{ color: "var(--accent)" }}>]</span>
        </button>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      <div className={`mobile-overlay ${isOpen ? "open" : ""}`}>
        <div className="mobile-overlay-bg"></div>
        <nav className="mobile-nav">
          <Link href="/#expertise" onClick={closeMenu} style={{ '--i': 1 } as React.CSSProperties}>_Expertise</Link>
          <Link href="/#work" onClick={closeMenu} style={{ '--i': 2 } as React.CSSProperties}>_Work</Link>
          <Link href="/#writing" onClick={closeMenu} style={{ '--i': 3 } as React.CSSProperties}>_Writing</Link>
          <a href="mailto:hello@shaho.dev" onClick={closeMenu} style={{ '--i': 4 } as React.CSSProperties}>_Contact</a>
        </nav>
      </div>
    </>
  );
}
