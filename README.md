# Reggie Digital Business Card

Mobile-first Next.js PWA for Reggie Alleyne's digital business card.

## Features

- Premium dark-first card UI with light mode toggle
- Portfolio, LinkedIn, and GitHub handoff routes for Netlify Web Analytics
- QR sharing page with native share sheet and copy fallback
- Public-link-only vCard download
- PWA manifest, app icons, service worker, and offline fallback
- SEO metadata, JSON-LD, sitemap, robots, and generated Open Graph image

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment

Set the deployed card URL so QR codes, sharing metadata, and canonical links point at production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-netlify-site.netlify.app
```

Without this value, the in-page QR/share UI falls back to the current browser origin. Server metadata falls back to a Netlify placeholder.

## Netlify

`netlify.toml` is configured for Next.js on Netlify:

- build command: `npm run build`
- publish directory: `.next`
- Node version: `22`
- Netlify Dev proxy: `localhost:8888` to Next on `3000`

After deployment, enable these in the Netlify dashboard:

- Web Analytics for route/page metrics, including `/go/portfolio`, `/go/linkedin`, `/go/github`, `/go/contact`, and `/share`
- Real User Monitoring for Web Vitals and field performance

The `/go/...` pages intentionally render a normal `200` page before redirecting so Netlify can count the visitor intent without adding a third-party tracker.
