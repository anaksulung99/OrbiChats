import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const adminEmail = process.env.ADMIN_EMAIL ?? "admin@warotator.local";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";

        if (
          parsed.data.email !== adminEmail ||
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
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "admin-demo";
      }

      return session;
    },
  },
};
