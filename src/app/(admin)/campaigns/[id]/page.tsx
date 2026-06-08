import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Pencil, Trash2, Copy } from "lucide-react";
import { eq } from "drizzle-orm";

import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { deleteCampaignAction } from "@/lib/actions";
import { rotationModeLabels } from "@/lib/schemas";

export default async function CampaignDetailPage({
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

  function handleCopy() {
    if (!campaign) return;

    const publicLink = `${window.location.origin}/r/${campaign.slug}`;
    navigator.clipboard.writeText(publicLink);
  }

  return (
    <>
      <PageHeading
        title={campaign.name}
        description="Detail campaign, konfigurasi rotator, dan quick access link publik."
        action={
          <div className="flex items-center gap-2">
            <form action={deleteCampaignAction}>
              <input type="hidden" name="id" value={campaign.id} />
              <Button type="submit" variant="destructive">
                <Trash2 className="size-4" />
                Delete
              </Button>
            </form>
            <Button asChild>
              <Link href={`/campaigns/${campaign.id}/edit`}>
                <Pencil className="size-4" />
                Edit
              </Link>
            </Button>
            <CopyButton slug={campaign.slug} />
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Konfigurasi</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex justify-between gap-4 border-b pb-3">
              <span className="text-muted-foreground">Status</span>
              <Badge>{campaign.status}</Badge>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3">
              <span className="text-muted-foreground">Rotasi</span>
              <span>{rotationModeLabels[campaign.rotationMode]}</span>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3">
              <span className="text-muted-foreground">Link Mode</span>
              <span>{campaign.linkMode}</span>
            </div>
            <div className="flex justify-between gap-4 border-b pb-3">
              <span className="text-muted-foreground">Fallback</span>
              <span>{campaign.fallbackPhone}</span>
            </div>
            <div className="rounded-lg bg-muted p-3">
              {campaign.messageTemplate}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Public Link</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <code className="rounded-lg bg-muted p-3 text-sm">
              /r/{campaign.slug}
            </code>
            <Button asChild variant="outline">
              <Link href={`/r/${campaign.slug}`} target="_blank">
                <ExternalLink className="size-4" />
                Test Rotator
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
