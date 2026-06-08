import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { CampaignForm } from "@/components/campaign-form";
import { PageHeading } from "@/components/page-heading";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { updateCampaignAction } from "@/lib/actions";
import type { CampaignFormValues } from "@/lib/schemas";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = db
    ? await db.query.campaigns.findFirst({
        where: eq(campaigns.id, id),
      })
    : null;

  if (!campaign) {
    notFound();
  }

  const initialValues: CampaignFormValues = {
    name: campaign.name,
    slug: campaign.slug,
    status: campaign.status,
    rotationMode: campaign.rotationMode,
    linkMode: campaign.linkMode,
    messageTemplate: campaign.messageTemplate,
    fallbackPhone: campaign.fallbackPhone ?? "+6281230000000",
    timezone: campaign.timezone,
    trafficCapPerDay: campaign.trafficCapPerDay,
    conversionGoal: campaign.conversionGoal,
  };

  return (
    <>
      <PageHeading
        title={`Edit ${campaign.name}`}
        description="Perbarui status, slug, metode rotasi, link mode, dan template pesan."
      />
      <CampaignForm
        initialValues={initialValues}
        action={updateCampaignAction.bind(null, campaign.id)}
      />
    </>
  );
}
