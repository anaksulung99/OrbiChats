import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

function getDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const url = new URL(process.env.DATABASE_URL);

  if (url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
}

const pool = new Pool({
  connectionString: getDatabaseUrl(),
  max: 1,
});

try {
  const db = drizzle(pool);

  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migrations applied successfully.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
