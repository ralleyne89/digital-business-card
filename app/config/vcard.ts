import { profile } from "@/app/config/profile";

const CRLF = "\r\n";
const LINE_LIMIT_BYTES = 75;
const textEncoder = new TextEncoder();

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n/g, "\\n")
    .replace(/\r/g, "\\n")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function sanitizeUriValue(value: string) {
  return value.replace(/[\r\n]/g, "");
}

function getByteLength(value: string) {
  return textEncoder.encode(value).length;
}

function foldVCardLine(line: string) {
  const foldedLines: string[] = [];
  let currentLine = "";
  let currentBytes = 0;

  for (const character of line) {
    const characterBytes = getByteLength(character);

    if (currentLine && currentBytes + characterBytes > LINE_LIMIT_BYTES) {
      foldedLines.push(currentLine);
      currentLine = ` ${character}`;
      currentBytes = 1 + characterBytes;
      continue;
    }

    currentLine += character;
    currentBytes += characterBytes;
  }

  if (currentLine) {
    foldedLines.push(currentLine);
  }

  return foldedLines.join(CRLF);
}

export function buildVCard() {
  const portfolio = profile.links.find((link) => link.id === "portfolio");
  const linkedin = profile.links.find((link) => link.id === "linkedin");
  const github = profile.links.find((link) => link.id === "github");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//Reggie Digital Card//Public Contact vCard//EN",
    "N:Alleyne;Reggie;;;",
    `FN:${escapeVCardValue(profile.name)}`,
    `TITLE:${escapeVCardValue(profile.title)}`,
    portfolio
      ? `item1.URL;TYPE=pref:${sanitizeUriValue(portfolio.href)}`
      : undefined,
    portfolio ? "item1.X-ABLabel:Portfolio" : undefined,
    linkedin ? `item2.URL:${sanitizeUriValue(linkedin.href)}` : undefined,
    linkedin ? "item2.X-ABLabel:LinkedIn" : undefined,
    github ? `item3.URL:${sanitizeUriValue(github.href)}` : undefined,
    github ? "item3.X-ABLabel:GitHub" : undefined,
    `NOTE:${escapeVCardValue(profile.about)}`,
    "END:VCARD",
  ].filter((line): line is string => Boolean(line));

  return `${lines.map((line) => foldVCardLine(line)).join(CRLF)}${CRLF}`;
}
