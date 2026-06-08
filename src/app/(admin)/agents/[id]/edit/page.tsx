import { notFound } from "next/navigation";

import { AgentForm } from "@/components/agent-form";
import { PageHeading } from "@/components/page-heading";
import { agents } from "@/lib/mock-data";

export default async function EditAgentPage({
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
        title={`Edit ${agent.name}`}
        description="Perbarui nomor, jadwal, status, limit, priority, dan percentage weight."
      />
      <AgentForm initialValues={agent} />
    </>
  );
}
