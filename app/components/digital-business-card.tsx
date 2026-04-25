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

type CardResume = {
  label: string;
  shortLabel: string;
  href: string;
  description: string;
  fileName: string;
};

type CardProfile = {
  name: string;
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
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  resume: CardResume;
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
  const [theme, setTheme] = useState<Theme>("light");
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
    () => resolvedCardUrl || "https://reggie-alleyne-digital-card.netlify.app",
    [resolvedCardUrl],
  );
  const portfolioLink = useMemo(
    () => profile.links.find((link) => link.id === "portfolio"),
    [profile.links],
  );
  const secondaryLinks = useMemo(
    () => profile.links.filter((link) => link.id !== "portfolio"),
    [profile.links],
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
          className="card-shell mx-auto flex w-full max-w-[460px] flex-col overflow-hidden rounded-[28px] border"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerChildren}
        >
          <section className="card-hero relative px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
            <motion.div
              className="mb-5 flex items-center justify-between gap-4"
              variants={revealItem}
              transition={motionTransition}
            >
              <div className="brand-logo" aria-label={profile.logo.alt}>
                <Image
                  src={profile.logo.src}
                  alt=""
                  width={profile.logo.width}
                  height={profile.logo.height}
                  priority
                  sizes="96px"
                  className="brand-logo-image"
                />
              </div>

              <button
                type="button"
                className="theme-toggle group flex h-11 items-center gap-1 rounded-full border px-1.5 transition"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
                title={
                  theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
                }
              >
                <span className="theme-icon grid size-8 place-items-center rounded-full">
                  <Sun aria-hidden="true" size={17} strokeWidth={1.9} />
                </span>
                <span className="theme-icon grid size-8 place-items-center rounded-full">
                  <Moon aria-hidden="true" size={17} strokeWidth={1.9} />
                </span>
              </button>
            </motion.div>

            <motion.div
              className="hero-grid grid items-stretch gap-5"
              variants={revealItem}
              transition={motionTransition}
            >
              <div className="hero-copy min-w-0">
                <p className="eyebrow mb-3 text-xs font-semibold uppercase leading-5">
                  Product Designer & AI Technologist
                </p>
                <h1 className="text-balance text-[3rem] font-semibold leading-[0.98] tracking-normal sm:text-[3.55rem]">
                  {profile.name}
                </h1>

                <motion.div
                  className="hero-actions mt-6 grid grid-cols-1 gap-3"
                  transition={motionTransition}
                >
                  {portfolioLink ? (
                    <motion.div
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.99 }
                      }
                    >
                      <Link
                        href={trackedRoutes[portfolioLink.id]}
                        prefetch={false}
                        className="primary-action primary-action-filled inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition"
                        aria-label={`${portfolioLink.label}: ${portfolioLink.description}`}
                      >
                        {portfolioLink.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.9}
                        />
                      </Link>
                    </motion.div>
                  ) : null}

                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                  >
                    <a
                      href={profile.resume.href}
                      download={profile.resume.fileName}
                      className="primary-action primary-action-outline inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition"
                      aria-label={`${profile.resume.label}: ${profile.resume.description}`}
                    >
                      <Download
                        aria-hidden="true"
                        size={17}
                        strokeWidth={1.9}
                      />
                      {profile.resume.label}
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              <div className="portrait-card relative overflow-hidden rounded-[24px] border">
                <Image
                  src={profile.headshot.src}
                  alt={profile.headshot.alt}
                  width={profile.headshot.width}
                  height={profile.headshot.height}
                  priority
                  sizes="(min-width: 480px) 154px, 100vw"
                  className="portrait-image h-full w-full object-cover object-[50%_18%]"
                />
                <div className="portrait-caption absolute inset-x-3 bottom-3 rounded-[18px] px-3 py-2">
                  <span className="block text-xs font-semibold">
                    Trust-first product systems
                  </span>
                  <span className="mt-0.5 block text-[0.68rem] leading-4">
                    UX / AI / React prototypes
                  </span>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="card-content space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            <motion.div
              className="space-y-3"
              variants={revealItem}
              transition={motionTransition}
            >
              {secondaryLinks.map((link) => {
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
                      className="action-row group flex min-h-[76px] items-center gap-4 rounded-[18px] border px-4 py-3 transition"
                      aria-label={`${link.label}: ${link.description}`}
                    >
                      <span className="action-icon grid size-11 shrink-0 place-items-center rounded-full">
                        <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[1rem] font-semibold">
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
                className="utility-card secondary-action flex flex-col gap-3 rounded-[20px] border p-4 transition"
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
                className="utility-card secondary-action flex flex-col justify-between gap-4 rounded-[20px] border p-4 transition"
              >
                <span className="flex items-center gap-3 text-base font-semibold">
                  <UserRoundPlus aria-hidden="true" size={22} strokeWidth={1.8} />
                  Save contact
                </span>
                <span className="block text-sm leading-6">
                  Add my public links to your contacts.
                </span>
                <span className="save-vcard-button mt-auto flex min-h-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-semibold">
                  <Download aria-hidden="true" size={18} strokeWidth={1.8} />
                  Save vCard
                </span>
              </Link>
            </motion.div>

            <motion.div
              className="about-card rounded-[20px] border p-4"
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
              className="footer-line flex items-center justify-center pt-1 text-xs"
              variants={revealItem}
              transition={motionTransition}
            >
              <span>&copy; 2026 Reggie Alleyne</span>
            </motion.div>
          </section>
        </motion.article>
      </main>
    </MotionConfig>
  );
}
