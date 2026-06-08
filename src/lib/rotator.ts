import { eq } from "drizzle-orm";

import { db } from "@/db";
import { agents, assignmentLogs, campaigns } from "@/db/schema";

function normalizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export async function resolveRotator(slug: string) {
  if (!db) {
    return null;
  }

  const campaign = await db.query.campaigns.findFirst({
    where: eq(campaigns.slug, slug),
  });

  if (!campaign || campaign.status !== "active") {
    return null;
  }

  const activeAgents = await db.query.agents.findMany({
    where: eq(agents.status, "active"),
  });

  const selected =
    campaign.rotationMode === "percentage"
      ? activeAgents.sort((a, b) => b.percentageWeight - a.percentageWeight)[0]
      : activeAgents.sort((a, b) => a.priority - b.priority)[0];

  const agent = selected ?? {
    id: null,
    name: "Fallback",
    phone: campaign.fallbackPhone ?? "",
  };

  if (!agent.phone) {
    return null;
  }

  const message = campaign.messageTemplate
    .replaceAll("{agent}", agent.name)
    .replaceAll("{campaign}", campaign.name);
  const encodedMessage = encodeURIComponent(message);
  const phone = normalizePhone(agent.phone);

  await db.insert(assignmentLogs).values({
    campaignId: campaign.id,
    agentId: agent.id,
    message,
  });

  return {
    campaign,
    agent,
    message,
    linkMode: campaign.linkMode,
    deepLinkUrl: `whatsapp://send?phone=${phone}&text=${encodedMessage}`,
    standardUrl: `https://wa.me/${phone}?text=${encodedMessage}`,
  };
}
