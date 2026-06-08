import { AgentForm } from "@/components/agent-form";
import { PageHeading } from "@/components/page-heading";

export default function NewAgentPage() {
  return (
    <>
      <PageHeading
        title="Create Agent Number"
        description="Tambahkan nomor WhatsApp agent dengan schedule, limit, priority, dan weight."
      />
      <AgentForm />
    </>
  );
}
