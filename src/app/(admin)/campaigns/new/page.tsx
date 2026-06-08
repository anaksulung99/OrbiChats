import { CampaignForm } from "@/components/campaign-form";
import { PageHeading } from "@/components/page-heading";

export default function NewCampaignPage() {
  return (
    <>
      <PageHeading
        title="Create Campaign"
        description="Buat rotator group baru dengan slug publik, metode distribusi, dan template chat."
      />
      <CampaignForm />
    </>
  );
}
