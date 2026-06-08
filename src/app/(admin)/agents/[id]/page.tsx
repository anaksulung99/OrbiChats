import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agents } from "@/lib/mock-data";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = agents.find((item) => item.id === id);

  if (!agent) {
    notFound();
  }

  return (
    <>
      <PageHeading
        title={agent.name}
        description="Detail agent WhatsApp, performa, schedule, dan konfigurasi routing."
        action={
          <Button asChild>
            <Link href={`/agents/${agent.id}/edit`}>
              <Pencil className="size-4" />
              Edit
            </Link>
          </Button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Profil Agent</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex justify-between gap-4 border-b pb-3"><span className="text-muted-foreground">Status</span><Badge>{agent.status}</Badge></div>
            <div className="flex justify-between gap-4 border-b pb-3"><span className="text-muted-foreground">Nomor</span><span>{agent.phone}</span></div>
            <div className="flex justify-between gap-4 border-b pb-3"><span className="text-muted-foreground">Daily Limit</span><span>{agent.dailyLimit || "No limit"}</span></div>
            <div className="flex justify-between gap-4 border-b pb-3"><span className="text-muted-foreground">Priority</span><span>{agent.priority}</span></div>
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">Percentage Weight</span><span>{agent.percentageWeight}%</span></div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {agent.enableSchedule ? (
              agent.schedule.map((item) => (
                <div key={`${item.day}-${item.start}`} className="rounded-lg border p-3 text-sm">
                  <div className="font-medium">{item.day}</div>
                  <div className="text-muted-foreground">{item.start} - {item.end}</div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Schedule tidak aktif.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
