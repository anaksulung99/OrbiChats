import { notFound } from "next/navigation";

import { CampaignForm } from "@/components/campaign-form";
import { PageHeading } from "@/components/page-heading";
import { campaigns } from "@/lib/mock-data";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = campaigns.find((item) => item.id === id);

  if (!campaign) {
    notFound();
  }

  return (
    <>
      <PageHeading
        title={`Edit ${campaign.name}`}
        description="Perbarui status, slug, metode rotasi, link mode, dan template pesan."
      />
      <CampaignForm initialValues={campaign} />
    </>
  );
}
