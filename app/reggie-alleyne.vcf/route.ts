import { buildVCard } from "@/app/config/vcard";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition":
        'inline; filename="reggie-alleyne.vcf"; filename*=UTF-8\'\'reggie-alleyne.vcf',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
