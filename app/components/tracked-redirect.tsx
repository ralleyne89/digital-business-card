"use client";

import { useEffect, useState } from "react";

type TrackedRedirectProps = {
  href: string;
  label: string;
  delayMs?: number;
};

export function TrackedRedirect({
  href,
  label,
  delayMs = 850,
}: TrackedRedirectProps) {
  const [seconds, setSeconds] = useState(Math.ceil(delayMs / 1000));

  useEffect(() => {
    const countdownId = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    const redirectId = window.setTimeout(() => {
      window.location.assign(href);
    }, delayMs);

    return () => {
      window.clearInterval(countdownId);
      window.clearTimeout(redirectId);
    };
  }, [delayMs, href]);

  return (
    <p className="text-sm leading-6 text-white/62">
      Opening {label}
      {seconds > 0 ? ` in ${seconds}` : ""}. If nothing happens,{" "}
      <a
        className="font-semibold text-[#c4b5fd] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
        href={href}
        rel="noopener noreferrer"
      >
        continue manually
      </a>
      .
    </p>
  );
}
