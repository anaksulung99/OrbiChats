# WA Rotator

Admin panel untuk mengelola WhatsApp Agent Rotator berbasis Next.js 16, Tailwind CSS 4, shadcn UI, Zod, React Hook Form, Drizzle, Neon PostgreSQL, dan next-auth.

## Fitur

- Dashboard analytics campaign dan distribusi lead.
- CRUD surface untuk Campaign Rotator Group.
- CRUD surface untuk Agent Number WhatsApp.
- Metode rotasi: Round Robin, Sama Rata, Percentage, Least Assigned, dan Random.
- Template chat dengan variable `{agent}` dan `{campaign}`.
- Mode link WhatsApp: `wa.me` standard global dan `whatsapp://` deep link.
- Profile dan Security admin.
- Login, forgot password, dan reset password page.
- Drizzle schema untuk users, sessions, campaign, agents, pivot campaign-agent, dan assignment logs.

## Development

```bash
pnpm install
pnpm dev
```

Login demo:

```txt
Email: admin@warotator.local
Password: password123
```

## Database

Copy `.env.example` ke `.env.local`, isi `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, dan `ADMIN_PASSWORD`.

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

## Deploy Vercel

Tambahkan environment variables yang sama di Vercel Project Settings. Gunakan Neon PostgreSQL untuk `DATABASE_URL`.
