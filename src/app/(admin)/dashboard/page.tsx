import { Activity, Bot, Megaphone, MousePointerClick } from "lucide-react";

import { AnalyticsChart } from "@/components/analytics-chart";
import { PageHeading } from "@/components/page-heading";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";

export default async function DashboardPage() {
  const [campaigns, agents, assignmentLogs] = db
    ? await Promise.all([
        db.query.campaigns.findMany({
          orderBy: (campaigns, { desc }) => [desc(campaigns.createdAt)],
          limit: 5,
        }),
        db.query.agents.findMany(),
        db.query.assignmentLogs.findMany(),
      ])
    : [[], [], []];
  const activeCampaigns = campaigns.filter((item) => item.status === "active").length;
  const activeAgents = agents.filter((item) => item.status === "active").length;
  const leads = assignmentLogs.length;

  return (
    <>
      <PageHeading
        title="Dashboard Analytics"
        description="Pantau performa rotator, distribusi lead, dan kesiapan agent WhatsApp."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={leads.toLocaleString("id-ID")}
          note="Dari assignment logs"
          icon={MousePointerClick}
        />
        <StatCard
          title="Campaign Active"
          value={String(activeCampaigns)}
          note="Routing menerima traffic"
          icon={Megaphone}
        />
        <StatCard
          title="Agent Active"
          value={String(activeAgents)}
          note="Siap menerima chat"
          icon={Bot}
        />
        <StatCard
          title="Avg Conversion"
          value={campaigns.length ? "0%" : "-"}
          note="Menunggu data conversion real"
          icon={Activity}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Lead Routed 7 Hari</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart />
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Campaign Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {!campaigns.length && (
              <p className="text-sm text-muted-foreground">
                Belum ada campaign tersimpan.
              </p>
            )}
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-xs text-muted-foreground">/{campaign.slug}</div>
                </div>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
