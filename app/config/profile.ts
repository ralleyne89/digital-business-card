export type ExternalLinkId = "portfolio" | "linkedin" | "github";

export type ExternalLink = {
  id: ExternalLinkId;
  label: string;
  shortLabel: string;
  href: string;
  description: string;
};

export type ResumeDownload = {
  label: string;
  shortLabel: string;
  href: string;
  description: string;
  fileName: string;
};

export const profile = {
  name: "Reggie Alleyne",
  title: "Principal UX/UI Designer | AI Product Builder",
  location: "Los Angeles, CA",
  emailLabel: "Digital product, UX, and AI automation",
  about:
    "Principal UX/UI Designer with 10+ years of experience building scalable digital products, now focused on AI-driven experiences and automation.",
  siteName: "Reggie Digital Card",
  cardDescription:
    "A premium digital business card for Reggie Alleyne, Principal UX/UI Designer and AI Product Builder.",
  headshot: {
    src: "/images/reggie-headshot.png",
    alt: "Professional headshot of Reggie Alleyne",
    width: 1122,
    height: 1402,
  },
  logo: {
    src: "/images/ra-logo-white.png",
    alt: "Reggie Alleyne logo",
    width: 657,
    height: 680,
  },
  resume: {
    label: "Download Resume",
    shortLabel: "Resume",
    href: "/resume/Reginald_Alleyne_Resume_FINAL_2026.docx",
    description: "AI product design resume in Word format",
    fileName: "Reginald_Alleyne_Resume_FINAL_2026.docx",
  } satisfies ResumeDownload,
  links: [
    {
      id: "portfolio",
      label: "View Portfolio",
      shortLabel: "Portfolio",
      href: "https://reggiealleyne.com",
      description: "Selected product, UX, and frontend work",
    },
    {
      id: "linkedin",
      label: "Connect on LinkedIn",
      shortLabel: "LinkedIn",
      href: "https://linkedin.com/in/reggiealleyne",
      description: "Connect and follow professional updates",
    },
    {
      id: "github",
      label: "View GitHub",
      shortLabel: "GitHub",
      href: "https://github.com/ralleyne89",
      description: "Explore code, prototypes, and experiments",
    },
  ] satisfies ExternalLink[],
} as const;

export const profileLinks = profile.links;

export const trackedRoutes: Record<ExternalLinkId, string> = {
  portfolio: "/go/portfolio",
  linkedin: "/go/linkedin",
  github: "/go/github",
};

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://reggie-alleyne-digital-card.netlify.app"
  );
}

export function getCardUrl() {
  return getSiteUrl();
}

export function getLinkById(id: ExternalLinkId) {
  return profileLinks.find((link) => link.id === id);
}

export function getShareText() {
  return `${profile.name} - ${profile.title}`;
}

export function getJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    image: `${getSiteUrl()}${profile.headshot.src}`,
    url: profile.links[0].href,
    sameAs: profile.links.map((link) => link.href),
    description: profile.about,
  };
}
