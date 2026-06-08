import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const campaignStatusEnum = pgEnum("campaign_status", [
  "active",
  "inactive",
]);
export const agentStatusEnum = pgEnum("agent_status", ["active", "inactive"]);
export const rotationModeEnum = pgEnum("rotation_mode", [
  "round_robin",
  "equal_distribution",
  "percentage",
  "least_assigned",
  "random",
]);
export const linkModeEnum = pgEnum("link_mode", ["deep_link", "standard"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (token) => ({
    compoundKey: primaryKey({ columns: [token.identifier, token.token] }),
  })
);

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: campaignStatusEnum("status").default("active").notNull(),
  rotationMode: rotationModeEnum("rotation_mode").default("round_robin").notNull(),
  linkMode: linkModeEnum("link_mode").default("standard").notNull(),
  messageTemplate: text("message_template").notNull(),
  fallbackPhone: text("fallback_phone"),
  timezone: text("timezone").default("Asia/Jakarta").notNull(),
  conversionGoal: text("conversion_goal").default("qualified_lead").notNull(),
  trafficCapPerDay: integer("traffic_cap_per_day").default(0).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const agents = pgTable("agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  adminId: uuid("admin_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  countryCode: text("country_code").default("ID").notNull(),
  status: agentStatusEnum("status").default("active").notNull(),
  enableSchedule: boolean("enable_schedule").default(false).notNull(),
  schedule: jsonb("schedule")
    .$type<Array<{ day: string; start: string; end: string }>>()
    .default([]),
  dailyLimit: integer("daily_limit").default(0).notNull(),
  priority: integer("priority").default(1).notNull(),
  percentageWeight: integer("percentage_weight").default(10).notNull(),
  lastAssignedAt: timestamp("last_assigned_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const campaignAgents = pgTable(
  "campaign_agents",
  {
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    agentId: uuid("agent_id")
      .notNull()
      .references(() => agents.id, { onDelete: "cascade" }),
    order: integer("order").default(0).notNull(),
    weight: integer("weight").default(10).notNull(),
    assignedCount: integer("assigned_count").default(0).notNull(),
  },
  (row) => ({
    pk: primaryKey({ columns: [row.campaignId, row.agentId] }),
  })
);

export const assignmentLogs = pgTable("assignment_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").references(() => campaigns.id, {
    onDelete: "set null",
  }),
  agentId: uuid("agent_id").references(() => agents.id, { onDelete: "set null" }),
  visitorIp: text("visitor_ip"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  message: text("message"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
