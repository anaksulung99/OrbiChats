import Link from "next/link";
import { Plus, Settings2 } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { campaigns } from "@/lib/mock-data";
import { rotationModeLabels } from "@/lib/schemas";

export default function CampaignsPage() {
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
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="rounded-lg">
            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{campaign.name}</h2>
                  <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                  <Badge variant="outline">{rotationModeLabels[campaign.rotationMode]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">/r/{campaign.slug} · {campaign.agents} agents · {campaign.leads.toLocaleString("id-ID")} leads</p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/campaigns/${campaign.id}`}>
                  <Settings2 className="size-4" />
                  Detail
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
