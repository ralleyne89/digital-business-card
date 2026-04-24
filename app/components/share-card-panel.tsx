"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Home, Share2 } from "lucide-react";
import { getShareText, profile } from "@/app/config/profile";

type ShareCardPanelProps = {
  configuredCardUrl: string;
};

export function ShareCardPanel({ configuredCardUrl }: ShareCardPanelProps) {
  const [cardUrl, setCardUrl] = useState(configuredCardUrl);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setCardUrl(configuredCardUrl || window.location.origin);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [configuredCardUrl]);

  useEffect(() => {
    if (!status) {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatus(""), 2600);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const shareData = useMemo(
    () => ({
      title: profile.name,
      text: getShareText(),
      url: cardUrl || "https://digital-business-card.netlify.app",
    }),
    [cardUrl],
  );

  async function shareCard() {
    try {
      if (
        navigator.share &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        await navigator.share(shareData);
        setStatus("Share sheet opened");
        return;
      }

      await copyLink();
    } catch {
      setStatus("Share canceled");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setStatus("Link copied");
    } catch {
      setStatus("Copy unavailable");
    }
  }

  const qrValue = cardUrl || "https://digital-business-card.netlify.app";

  return (
    <main className="grid min-h-svh place-items-center bg-[#09070d] px-4 py-8 text-white">
      <section className="w-full max-w-[420px] rounded-[8px] border border-white/12 bg-[#12101a] p-5 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c4b5fd]">
              Share card
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              {profile.name}
            </h1>
          </div>
          <Link
            className="grid size-11 place-items-center rounded-[8px] border border-white/12 text-white/70 transition hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
            href="/"
            aria-label="Return to card"
          >
            <Home aria-hidden="true" size={19} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="rounded-[8px] border border-[#8B5CF6]/40 bg-[#100820] p-4">
          <div className="mx-auto grid size-[220px] place-items-center rounded-[8px] bg-white p-4 text-[#07110e]">
            <QRCodeSVG
              value={qrValue}
              size={188}
              level="M"
              marginSize={2}
              bgColor="#ffffff"
              fgColor="#100820"
              title={`${profile.name} digital card QR code`}
            />
          </div>
          <p className="mt-4 break-words text-center text-sm leading-6 text-white/62">
            {qrValue}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[#8B5CF6]/45 bg-[#8B5CF6] px-4 text-sm font-semibold text-white transition hover:bg-[#a78bfa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
            onClick={shareCard}
          >
            <Share2 aria-hidden="true" size={18} strokeWidth={1.8} />
            Native share
          </button>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-white/12 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
            onClick={copyLink}
          >
            {status === "Link copied" ? (
              <Check aria-hidden="true" size={18} strokeWidth={1.8} />
            ) : (
              <Copy aria-hidden="true" size={18} strokeWidth={1.8} />
            )}
            Copy link
          </button>
        </div>

        <p className="mt-4 min-h-6 text-center text-sm text-[#c4b5fd]" aria-live="polite">
          {status}
        </p>
      </section>
    </main>
  );
}
