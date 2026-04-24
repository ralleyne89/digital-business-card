import type { MetadataRoute } from "next";
import { profile } from "@/app/config/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} Digital Business Card`,
    short_name: "Reggie Card",
    description: profile.cardDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#070807",
    theme_color: "#070807",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

