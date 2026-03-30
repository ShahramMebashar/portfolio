import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaho | Full Stack Developer",
  description: "Portfolio and Blog of Shaho, Full Stack Developer",
};

import Link from "next/link";
import Header from "./components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="layout">
          <Header />

          {children}

          <footer id="contact" className="footer">
            <div>© {new Date().getFullYear()} Shaho</div>
            <div>
              <a href="#">Twitter</a>
              <a href="#">Github</a>
              <a href="#">LinkedIn</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
