"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { and, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { agents, campaigns } from "@/db/schema";
import { authOptions } from "@/lib/auth";
import {
  agentSchema,
  campaignSchema,
  type AgentFormValues,
  type CampaignFormValues,
} from "@/lib/schemas";

type ActionResult = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

function getFieldErrors(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray(error.issues)
  ) {
    return Object.fromEntries(
      error.issues.map((issue: { path: Array<string | number>; message: string }) => [
        String(issue.path[0]),
        issue.message,
      ])
    );
  }

  return {};
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    typeof error.cause === "object" &&
    error.cause !== null &&
    "code" in error.cause &&
    error.cause.code === "23505"
  );
}

async function getAdminId() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session.user.id;
}

function requireDb() {
  if (!db) {
    throw new Error("DATABASE_URL is not set");
  }

  return db;
}

export async function createCampaignAction(
  values: CampaignFormValues
): Promise<ActionResult> {
  const parsed = campaignSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false, fieldErrors: getFieldErrors(parsed.error) };
  }

  const database = requireDb();
  const adminId = await getAdminId();
  let campaignId = "";

  try {
    const [campaign] = await database
      .insert(campaigns)
      .values({
        ...parsed.data,
        adminId,
      })
      .returning({ id: campaigns.id });

    campaignId = campaign.id;
  } catch (error) {
    if (isUniqueViolation(error)) {
      return {
        ok: false,
        fieldErrors: { slug: "Slug sudah dipakai campaign lain" },
      };
    }

    return { ok: false, message: "Gagal menyimpan campaign" };
  }

  revalidatePath("/campaigns");
  redirect(`/campaigns/${campaignId}`);
}

export async function updateCampaignAction(
  id: string,
  values: CampaignFormValues
): Promise<ActionResult> {
  const parsed = campaignSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false, fieldErrors: getFieldErrors(parsed.error) };
  }

  const database = requireDb();
  await getAdminId();

  const duplicate = await database.query.campaigns.findFirst({
    where: and(eq(campaigns.slug, parsed.data.slug), ne(campaigns.id, id)),
  });

  if (duplicate) {
    return {
      ok: false,
      fieldErrors: { slug: "Slug sudah dipakai campaign lain" },
    };
  }

  await database
    .update(campaigns)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(campaigns.id, id));

  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${id}`);
  redirect(`/campaigns/${id}`);
}

export async function deleteCampaignAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const database = requireDb();

  await getAdminId();

  if (id) {
    await database.delete(campaigns).where(eq(campaigns.id, id));
  }

  revalidatePath("/campaigns");
  redirect("/campaigns");
}

export async function createAgentAction(
  values: AgentFormValues
): Promise<ActionResult> {
  const parsed = agentSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false, fieldErrors: getFieldErrors(parsed.error) };
  }

  const database = requireDb();
  const adminId = await getAdminId();
  let agentId = "";

  try {
    const [agent] = await database
      .insert(agents)
      .values({
        ...parsed.data,
        adminId,
      })
      .returning({ id: agents.id });

    agentId = agent.id;
  } catch {
    return { ok: false, message: "Gagal menyimpan agent" };
  }

  revalidatePath("/agents");
  redirect(`/agents/${agentId}`);
}

export async function updateAgentAction(
  id: string,
  values: AgentFormValues
): Promise<ActionResult> {
  const parsed = agentSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false, fieldErrors: getFieldErrors(parsed.error) };
  }

  const database = requireDb();
  await getAdminId();

  await database
    .update(agents)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(agents.id, id));

  revalidatePath("/agents");
  revalidatePath(`/agents/${id}`);
  redirect(`/agents/${id}`);
}

export async function deleteAgentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const database = requireDb();

  await getAdminId();

  if (id) {
    await database.delete(agents).where(eq(agents.id, id));
  }

  revalidatePath("/agents");
  redirect("/agents");
}
