"use client";

import { useEffect, useState } from "react";
import { Download, RefreshCcw } from "lucide-react";

export function ContactDownload() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStarted(true);
      window.location.href = "/reggie-alleyne.vcf";
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-white/62">
        {started
          ? "The vCard download should be starting now."
          : "Preparing Reggie Alleyne's public contact card."}
      </p>
      <a
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[#8B5CF6]/45 bg-[#8B5CF6]/14 px-4 text-sm font-semibold text-[#c4b5fd] transition hover:bg-[#8B5CF6]/22 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
        href="/reggie-alleyne.vcf"
        download="reggie-alleyne.vcf"
      >
        {started ? (
          <RefreshCcw aria-hidden="true" size={18} strokeWidth={1.8} />
        ) : (
          <Download aria-hidden="true" size={18} strokeWidth={1.8} />
        )}
        Download vCard
      </a>
    </div>
  );
}
