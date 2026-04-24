import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/config/profile";

const routes = ["/", "/share", "/go/portfolio", "/go/linkedin", "/go/github"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-04-24"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.4,
  }));
}

