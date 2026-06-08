import Link from "next/link";
import { Plus, Settings2, Trash2 } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { deleteAgentAction } from "@/lib/actions";

export default async function AgentsPage() {
  const agents = db
    ? await db.query.agents.findMany({
        orderBy: (agents, { desc }) => [desc(agents.createdAt)],
      })
    : [];

  return (
    <>
      <PageHeading
        title="Daftar Agent Number WhatsApp"
        description="Kelola nomor, country format, schedule, status, limit harian, priority, dan weight distribusi."
        action={
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/agents/new">
              <Plus className="size-4" />
              Agent Baru
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4">
        {!agents.length && (
          <Card className="rounded-lg">
            <CardContent className="text-sm text-muted-foreground">
              Belum ada agent. Tambahkan nomor WhatsApp pertama untuk rotator.
            </CardContent>
          </Card>
        )}
        {agents.map((agent) => (
          <Card key={agent.id} className="rounded-lg">
            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold">{agent.name}</h2>
                  <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                    {agent.status}
                  </Badge>
                  <Badge variant="outline">{agent.countryCode}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {agent.phone} - limit {agent.dailyLimit || "no limit"}/day - weight {agent.percentageWeight}%
                </p>
              </div>
              <div className="flex items-center gap-2">
                <form action={deleteAgentAction}>
                  <input type="hidden" name="id" value={agent.id} />
                  <Button type="submit" variant="destructive">
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </form>
                <Button asChild variant="outline">
                  <Link href={`/agents/${agent.id}`}>
                    <Settings2 className="size-4" />
                    Detail
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
