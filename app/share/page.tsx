import { ShareCardPanel } from "@/app/components/share-card-panel";

export const metadata = {
  title: "Share card",
  description: "Share Reggie Alleyne's digital business card.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SharePage() {
  const configuredCardUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    "",
  );

  return <ShareCardPanel configuredCardUrl={configuredCardUrl ?? ""} />;
}

