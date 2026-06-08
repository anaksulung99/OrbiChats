import { AgentForm } from "@/components/agent-form";
import { PageHeading } from "@/components/page-heading";
import { createAgentAction } from "@/lib/actions";

export default function NewAgentPage() {
  return (
    <>
      <PageHeading
        title="Create Agent Number"
        description="Tambahkan nomor WhatsApp agent dengan schedule, limit, priority, dan weight."
      />
      <AgentForm action={createAgentAction} />
    </>
  );
}
