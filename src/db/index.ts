import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

function getDatabaseUrl(url: string) {
  const parsed = new URL(url);

  if (parsed.searchParams.get("sslmode") === "require") {
    parsed.searchParams.set("sslmode", "verify-full");
  }

  return parsed.toString();
}

const pool = connectionString
  ? new Pool({
      connectionString: getDatabaseUrl(connectionString),
      max: 1,
    })
  : null;

export const db = connectionString
  ? drizzle(pool!, { schema })
  : null;

export type Database = NonNullable<typeof db>;
