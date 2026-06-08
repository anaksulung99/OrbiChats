import Link from "next/link";
import { Plus, Settings2, Trash2 } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { db } from "@/db";
import { deleteCampaignAction } from "@/lib/actions";
import { rotationModeLabels } from "@/lib/schemas";

export default async function CampaignsPage() {
  const campaigns = db
    ? await db.query.campaigns.findMany({
        orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
      })
    : [];

  return (
    <>
      <PageHeading
        title="Campaign Rotator Group"
        description="Kelola group, custom slug, metode distribusi, template pesan, dan mode link WhatsApp."
        action={
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/campaigns/new">
              <Plus className="size-4" />
              Campaign Baru
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4">
        {!campaigns.length && (
          <Card className="rounded-lg">
            <CardContent className="text-sm text-muted-foreground">
              Belum ada campaign. Buat campaign pertama untuk mulai routing
              WhatsApp.
            </CardContent>
          </Card>
        )}
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="rounded-lg">
            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{campaign.name}</h2>
                  <Badge
                    variant={
                      campaign.status === "active" ? "default" : "secondary"
                    }
                  >
                    {campaign.status}
                  </Badge>
                  <Badge variant="outline">
                    {rotationModeLabels[campaign.rotationMode]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  /r/{campaign.slug} - cap{" "}
                  {campaign.trafficCapPerDay || "no limit"} visits/day
                </p>
              </div>
              <div className="flex items-center gap-2">
                <form action={deleteCampaignAction}>
                  <input type="hidden" name="id" value={campaign.id} />
                  <Button type="submit" variant="destructive">
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </form>
                <Button asChild variant="outline">
                  <Link href={`/campaigns/${campaign.id}`}>
                    <Settings2 className="size-4" />
                    Detail
                  </Link>
                </Button>
                <CopyButton slug={campaign.slug} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
