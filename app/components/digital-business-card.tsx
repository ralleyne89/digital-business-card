"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowUpRight,
  Briefcase,
  CodeXml,
  Download,
  Moon,
  QrCode,
  Share2,
  Sun,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type ExternalLinkId, trackedRoutes } from "@/app/config/profile";

type CardLink = {
  id: ExternalLinkId;
  label: string;
  shortLabel: string;
  description: string;
};

type CardProfile = {
  name: string;
  initials: string;
  title: string;
  location: string;
  emailLabel: string;
  about: string;
  siteName: string;
  headshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links: readonly CardLink[];
};

type DigitalBusinessCardProps = {
  cardUrl: string;
  profile: CardProfile;
};

type Theme = "dark" | "light";

const linkIcons: Record<ExternalLinkId, LucideIcon> = {
  portfolio: Briefcase,
  linkedin: UsersRound,
  github: CodeXml,
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export function DigitalBusinessCard({
  cardUrl,
  profile,
}: DigitalBusinessCardProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [resolvedCardUrl, setResolvedCardUrl] = useState(cardUrl);
  const shouldReduceMotion = useReducedMotion();

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
      setResolvedCardUrl(cardUrl || window.location.origin);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [cardUrl]);

  const displayCardUrl = useMemo(
    () => resolvedCardUrl || "https://digital-business-card.netlify.app",
    [resolvedCardUrl],
  );

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("reggie-card-theme", nextTheme);
      return nextTheme;
    });
  }

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="card-page min-h-svh w-full px-4 py-5 sm:px-6 sm:py-8"
        data-theme={theme}
      >
        <motion.article
          aria-label={`${profile.name} digital business card`}
          className="card-shell mx-auto flex w-full max-w-[420px] flex-col overflow-hidden rounded-[8px] border shadow-2xl"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerChildren}
        >
          <section className="card-hero relative px-5 pb-6 pt-5 sm:px-6">
            <motion.div
              className="mb-5 flex items-start justify-between"
              variants={revealItem}
              transition={motionTransition}
            >
              <div
                aria-hidden="true"
                className="ra-mark grid size-12 place-items-center text-[1.05rem] font-semibold"
              >
                {profile.initials}
              </div>

              <button
                type="button"
                className="theme-toggle group flex h-11 items-center gap-1 rounded-[8px] border px-1.5 transition"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
                title={
                  theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                <span className="theme-icon grid size-8 place-items-center rounded-[8px]">
                  <Sun aria-hidden="true" size={17} strokeWidth={1.9} />
                </span>
                <span className="theme-icon grid size-8 place-items-center rounded-[8px]">
                  <Moon aria-hidden="true" size={17} strokeWidth={1.9} />
                </span>
              </button>
            </motion.div>

            <motion.div
              className="flex flex-col items-center text-center"
              variants={revealItem}
              transition={motionTransition}
            >
              <div className="portrait-frame relative mb-6 size-[192px] overflow-hidden rounded-full sm:size-[212px]">
                <Image
                  src={profile.headshot.src}
                  alt={profile.headshot.alt}
                  width={profile.headshot.width}
                  height={profile.headshot.height}
                  priority
                  sizes="(min-width: 640px) 212px, 192px"
                  className="h-full w-full object-cover object-[50%_18%]"
                />
              </div>

              <h1 className="max-w-[12ch] text-balance text-[3.2rem] font-semibold leading-[0.96] tracking-normal sm:text-[3.7rem]">
                {profile.name}
              </h1>
              <span className="title-accent mt-4 block h-1 w-16 rounded-full" />
              <p className="role-title mt-5 max-w-[22rem] text-balance text-xl font-medium leading-7">
                {profile.title}
              </p>
            </motion.div>
          </section>

          <section className="card-content space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            <motion.div
              className="space-y-3"
              variants={revealItem}
              transition={motionTransition}
            >
              {profile.links.map((link) => {
                const Icon = linkIcons[link.id];

                return (
                  <motion.div
                    key={link.id}
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                  >
                    <Link
                      href={trackedRoutes[link.id]}
                      prefetch={false}
                      className="action-row group flex min-h-[76px] items-center gap-4 rounded-[8px] border px-4 py-3 transition"
                      aria-label={`${link.label}: ${link.description}`}
                    >
                      <span className="action-icon grid size-12 shrink-0 place-items-center rounded-[8px]">
                        <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1.05rem] font-semibold">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5">
                          {link.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="action-arrow shrink-0 transition"
                        size={18}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2"
              variants={revealItem}
              transition={motionTransition}
            >
              <Link
                href="/share"
                prefetch={false}
                className="utility-card secondary-action flex flex-col gap-3 rounded-[8px] border p-4 transition"
              >
                <span className="flex items-center gap-3 text-base font-semibold">
                  <Share2 aria-hidden="true" size={22} strokeWidth={1.8} />
                  Share card
                </span>
                <span className="qr-code mx-auto grid size-[126px] place-items-center rounded-[8px] p-2">
                  <QRCodeSVG
                    value={displayCardUrl}
                    size={108}
                    level="M"
                    marginSize={2}
                    bgColor="#ffffff"
                    fgColor="#07110e"
                    title={`${profile.name} digital card QR code`}
                  />
                </span>
                <span className="text-center text-sm">Scan or tap to share</span>
              </Link>

              <Link
                href="/go/contact"
                prefetch={false}
                className="utility-card secondary-action flex flex-col justify-between gap-4 rounded-[8px] border p-4 transition"
              >
                <span className="flex items-center gap-3 text-base font-semibold">
                  <UserRoundPlus aria-hidden="true" size={22} strokeWidth={1.8} />
                  Save contact
                </span>
                <span className="block text-sm leading-6">
                  Add my public links to your contacts.
                </span>
                <span className="save-vcard-button mt-auto flex min-h-11 items-center justify-center gap-2 rounded-[8px] border px-3 text-sm font-semibold">
                  <Download aria-hidden="true" size={18} strokeWidth={1.8} />
                  Save vCard
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="about-card rounded-[8px] border p-4"
              variants={revealItem}
              transition={motionTransition}
            >
              <div className="mb-3 flex items-center gap-3">
                <UserRoundPlus aria-hidden="true" size={22} strokeWidth={1.8} />
                <h2 className="text-lg font-semibold">About</h2>
              </div>
              <p className="text-pretty text-base leading-7">{profile.about}</p>
            </motion.div>

            <motion.div
              className="footer-line flex items-center justify-center gap-2 pt-1 text-xs"
              variants={revealItem}
              transition={motionTransition}
            >
              <QrCode aria-hidden="true" size={15} strokeWidth={1.8} />
              <span>Netlify-ready metrics • Fast PWA</span>
            </motion.div>
          </section>
        </motion.article>
      </main>
    </MotionConfig>
  );
}
