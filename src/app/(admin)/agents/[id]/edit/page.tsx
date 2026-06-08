import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { AgentForm } from "@/components/agent-form";
import { PageHeading } from "@/components/page-heading";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { updateAgentAction } from "@/lib/actions";
import type { AgentFormValues } from "@/lib/schemas";

type AgentSchedule = Array<{ day: string; start: string; end: string }>;

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = db
    ? await db.query.agents.findFirst({
        where: eq(agents.id, id),
      })
    : null;

  if (!agent) {
    notFound();
  }

  const initialValues: AgentFormValues = {
    name: agent.name,
    phone: agent.phone,
    countryCode: agent.countryCode,
    status: agent.status,
    enableSchedule: agent.enableSchedule,
    schedule: ((agent.schedule ?? []) as AgentSchedule).length
      ? ((agent.schedule ?? []) as AgentSchedule)
      : [{ day: "Mon-Fri", start: "08:00", end: "17:00" }],
    dailyLimit: agent.dailyLimit,
    priority: agent.priority,
    percentageWeight: agent.percentageWeight,
  };

  return (
    <>
      <PageHeading
        title={`Edit ${agent.name}`}
        description="Perbarui nomor, jadwal, status, limit, priority, dan percentage weight."
      />
      <AgentForm
        initialValues={initialValues}
        action={updateAgentAction.bind(null, agent.id)}
      />
    </>
  );
}
