import "dotenv/config";

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
  await pool.query(`
    drop type if exists public.agent_status cascade;
    drop type if exists public.campaign_status cascade;
    drop type if exists public.link_mode cascade;
    drop type if exists public.rotation_mode cascade;
  `);

  console.log("Partial migration enum types cleaned.");
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
