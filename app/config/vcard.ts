import { profile } from "@/app/config/profile";

const CRLF = "\r\n";

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildVCard() {
  const portfolio = profile.links.find((link) => link.id === "portfolio");
  const linkedin = profile.links.find((link) => link.id === "linkedin");
  const github = profile.links.find((link) => link.id === "github");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Alleyne;Reggie;;;",
    `FN:${escapeVCardValue(profile.name)}`,
    `TITLE:${escapeVCardValue(profile.title)}`,
    portfolio ? `URL;TYPE=Portfolio:${portfolio.href}` : undefined,
    linkedin ? `URL;TYPE=LinkedIn:${linkedin.href}` : undefined,
    github ? `URL;TYPE=GitHub:${github.href}` : undefined,
    `NOTE:${escapeVCardValue(profile.about)}`,
    "END:VCARD",
  ].filter(Boolean);

  return `${lines.join(CRLF)}${CRLF}`;
}

