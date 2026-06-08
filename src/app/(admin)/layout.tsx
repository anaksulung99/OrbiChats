import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { AdminShell } from "@/components/admin-shell";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
