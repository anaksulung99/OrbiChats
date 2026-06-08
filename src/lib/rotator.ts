import { agents, campaigns } from "@/lib/mock-data";

function normalizePhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export function resolveRotator(slug: string) {
  const campaign = campaigns.find((item) => item.slug === slug);
  if (!campaign || campaign.status !== "active") {
    return null;
  }

  const activeAgents = agents.filter((agent) => agent.status === "active");
  const selected =
    campaign.rotationMode === "percentage"
      ? activeAgents.sort((a, b) => b.percentageWeight - a.percentageWeight)[0]
      : activeAgents.sort((a, b) => a.assignedToday - b.assignedToday)[0];

  const agent = selected ?? {
    name: "Fallback",
    phone: campaign.fallbackPhone,
  };

  const message = campaign.messageTemplate
    .replaceAll("{agent}", agent.name)
    .replaceAll("{campaign}", campaign.name);
  const encodedMessage = encodeURIComponent(message);
  const phone = normalizePhone(agent.phone);

  return {
    campaign,
    agent,
    message,
    url:
      campaign.linkMode === "deep_link"
        ? `whatsapp://send?phone=${phone}&text=${encodedMessage}`
        : `https://wa.me/${phone}?text=${encodedMessage}`,
  };
}
