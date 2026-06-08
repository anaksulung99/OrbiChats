import { notFound } from "next/navigation";

import { resolveRotator } from "@/lib/rotator";
import { WhatsAppRedirectCard } from "@/components/whatsapp-redirect-card";

export default async function RotatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveRotator(slug);

  if (!resolved) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <WhatsAppRedirectCard
        campaignName={resolved.campaign.name}
        agentName={resolved.agent.name}
        linkMode={resolved.linkMode}
        deepLinkUrl={resolved.deepLinkUrl}
        standardUrl={resolved.standardUrl}
      />
    </main>
  );
}
