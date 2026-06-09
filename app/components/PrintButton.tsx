"use client";

import { FaDownload } from "react-icons/fa6";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_0_rgba(255,255,255,0.05)]"
    >
      <FaDownload className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
