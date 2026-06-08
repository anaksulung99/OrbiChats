import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

import * as schema from "../src/db/schema";
import { users } from "../src/db/schema";
import { hashPassword } from "../src/lib/password";

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

function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Admin Rotator";

  if (!email) {
    throw new Error("ADMIN_EMAIL is not set");
  }

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  return { email: email.toLowerCase(), name, password };
}

const pool = new Pool({
  connectionString: getDatabaseUrl(),
  max: 1,
});

async function main() {
  const db = drizzle(pool, { schema });
  const admin = getAdminCredentials();
  const passwordHash = await hashPassword(admin.password);
  const now = new Date();

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, admin.email),
  });

  const [user] = existingUser
    ? await db
        .update(users)
        .set({
          name: admin.name,
          passwordHash,
          emailVerified: existingUser.emailVerified ?? now,
          updatedAt: now,
        })
        .where(eq(users.email, admin.email))
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
        })
    : await db
        .insert(users)
        .values({
          name: admin.name,
          email: admin.email,
          emailVerified: now,
          passwordHash,
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
        });

  console.log(
    `${existingUser ? "Updated" : "Created"} admin user: ${user.email} (${user.id})`
  );
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
