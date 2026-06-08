import { defineConfig } from "drizzle-kit";

function getDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    return "";
  }

  const url = new URL(process.env.DATABASE_URL);

  if (url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("sslmode", "verify-full");
  }

  return url.toString();
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  verbose: true,
  strict: true,
});
