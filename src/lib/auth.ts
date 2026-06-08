import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword } from "@/lib/password";
import { authSchemas } from "@/lib/schemas";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = authSchemas.login.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (db) {
          const user = await db.query.users.findFirst({
            where: eq(users.email, parsed.data.email.toLowerCase()),
          });

          if (user?.passwordHash) {
            const isValid = await verifyPassword(
              parsed.data.password,
              user.passwordHash
            );

            if (isValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
              };
            }
          }
        }

        const adminEmail = process.env.ADMIN_EMAIL ?? "admin@warotator.local";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";

        if (
          parsed.data.email.toLowerCase() !== adminEmail.toLowerCase() ||
          parsed.data.password !== adminPassword
        ) {
          return null;
        }

        return {
          id: "admin-demo",
          name: "Admin Rotator",
          email: adminEmail,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "admin-demo";
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
};
