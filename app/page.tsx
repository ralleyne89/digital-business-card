import { DigitalBusinessCard } from "@/app/components/digital-business-card";
import { profile } from "@/app/config/profile";

export default function Home() {
  const configuredCardUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    "",
  );

  return (
    <DigitalBusinessCard
      cardUrl={configuredCardUrl ?? ""}
      profile={profile}
    />
  );
}
