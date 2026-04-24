import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TrackedRedirect } from "@/app/components/tracked-redirect";
import { type ExternalLinkId, getLinkById, profile } from "@/app/config/profile";

const destinationIds = ["portfolio", "linkedin", "github"] as const;

type Destination = (typeof destinationIds)[number];

function isDestination(value: string): value is Destination {
  return destinationIds.includes(value as Destination);
}

export function generateStaticParams() {
  return destinationIds.map((destination) => ({ destination }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;

  if (!isDestination(destination)) {
    return {};
  }

  const link = getLinkById(destination);

  return {
    title: `${link?.shortLabel ?? "Link"} handoff`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function GoDestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;

  if (!isDestination(destination)) {
    notFound();
  }

  const link = getLinkById(destination as ExternalLinkId);

  if (!link) {
    notFound();
  }

  return (
    <main className="grid min-h-svh place-items-center bg-[#09070d] px-4 py-8 text-white">
      <section className="w-full max-w-[420px] rounded-[8px] border border-white/12 bg-[#12101a] p-5 shadow-2xl shadow-black/40">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c4b5fd]">
              Opening
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">
              {link.shortLabel}
            </h1>
          </div>
          <span className="grid size-12 place-items-center rounded-[8px] bg-[#8B5CF6] text-white">
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.9} />
          </span>
        </div>

        <p className="mb-4 text-base leading-7 text-white/76">
          Leaving {profile.siteName} for {link.description.toLowerCase()}.
        </p>
        <TrackedRedirect href={link.href} label={link.shortLabel} />

        <Link
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-white/12 px-4 text-sm font-semibold text-white transition hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4b5fd]"
          href="/"
        >
          <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
          Back to card
        </Link>
      </section>
    </main>
  );
}
