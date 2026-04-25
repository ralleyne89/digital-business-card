"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight, Check, Copy, Home, Share2 } from "lucide-react";
import { getShareText, profile } from "@/app/config/profile";

type ShareCardPanelProps = {
  configuredCardUrl: string;
};

type Theme = "dark" | "light";

export function ShareCardPanel({ configuredCardUrl }: ShareCardPanelProps) {
  const [cardUrl, setCardUrl] = useState(configuredCardUrl);
  const [status, setStatus] = useState("");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedTheme = window.localStorage.getItem("reggie-card-theme");

      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

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
      url: cardUrl || "https://reggie-alleyne-digital-card.netlify.app",
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

  const qrValue = cardUrl || "https://reggie-alleyne-digital-card.netlify.app";

  return (
    <main
      className="card-page share-page grid min-h-svh place-items-center px-4 py-8"
      data-theme={theme}
    >
      <section className="share-shell w-full max-w-[440px] rounded-[28px] border p-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="brand-logo share-logo" aria-label={profile.logo.alt}>
              <Image
                src={profile.logo.src}
                alt=""
                width={profile.logo.width}
                height={profile.logo.height}
                priority
                sizes="48px"
                className="brand-logo-image"
              />
            </span>
            <div className="min-w-0">
              <p className="eyebrow text-xs font-semibold uppercase leading-5">
                Share card
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-normal">
                {profile.name}
              </h1>
            </div>
          </div>
          <Link
            className="icon-home grid size-11 shrink-0 place-items-center rounded-full border transition"
            href="/"
            aria-label="Return to card"
          >
            <Home aria-hidden="true" size={19} strokeWidth={1.8} />
          </Link>
        </div>

        <div className="share-qr-panel rounded-[24px] border p-4">
          <div className="share-qr-code mx-auto grid size-[220px] place-items-center rounded-[22px] bg-white p-4 text-[#07110e]">
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
          <p className="share-url mt-4 break-words text-center text-sm leading-6">
            {qrValue}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
          <button
            type="button"
            className="share-action share-action-filled inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition"
            onClick={shareCard}
          >
            <Share2 aria-hidden="true" size={18} strokeWidth={1.8} />
            Native share
          </button>
          <button
            type="button"
            className="share-action share-action-outline inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition"
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

        <Link
          className="share-portfolio-link mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition"
          href="/go/portfolio"
          prefetch={false}
        >
          View selected work
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.9} />
        </Link>

        <p className="share-status mt-4 min-h-6 text-center text-sm" aria-live="polite">
          {status}
        </p>
      </section>
    </main>
  );
}
