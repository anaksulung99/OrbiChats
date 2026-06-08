import { Activity, Bot, Megaphone, MousePointerClick } from "lucide-react";

import { AnalyticsChart } from "@/components/analytics-chart";
import { PageHeading } from "@/components/page-heading";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agents, campaigns } from "@/lib/mock-data";

export default function DashboardPage() {
  const activeCampaigns = campaigns.filter((item) => item.status === "active").length;
  const activeAgents = agents.filter((item) => item.status === "active").length;
  const leads = campaigns.reduce((sum, item) => sum + item.leads, 0);

  return (
    <>
      <PageHeading
        title="Dashboard Analytics"
        description="Pantau performa rotator, distribusi lead, dan kesiapan agent WhatsApp."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Leads" value={leads.toLocaleString("id-ID")} note="+14% dari pekan lalu" icon={MousePointerClick} />
        <StatCard title="Campaign Active" value={String(activeCampaigns)} note="Routing menerima traffic" icon={Megaphone} />
        <StatCard title="Agent Active" value={String(activeAgents)} note="Siap menerima chat" icon={Bot} />
        <StatCard title="Avg Conversion" value="37.6%" note="Dari semua campaign" icon={Activity} />
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
            <CardTitle>Campaign Teratas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-xs text-muted-foreground">/{campaign.slug} · {campaign.lastHit}</div>
                </div>
                <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                  {campaign.conversionRate}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
