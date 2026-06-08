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
});

try {
  const version = await pool.query(
    "select current_database() db, current_user usr, version() version"
  );
  const tables = await pool.query(`
    select table_schema, table_name
    from information_schema.tables
    where table_schema in ('public', 'drizzle')
    order by table_schema, table_name
  `);
  const enumTypes = await pool.query(`
    select n.nspname as schema, t.typname as name
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typtype = 'e'
    order by t.typname
  `);

  console.log(
    JSON.stringify(
      {
        connection: {
          database: version.rows[0].db,
          user: version.rows[0].usr,
          version: version.rows[0].version.split(",")[0],
        },
        tables: tables.rows,
        enumTypes: enumTypes.rows,
      },
      null,
      2
    )
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
