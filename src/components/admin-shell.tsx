import Link from "next/link";
import {
  BarChart3,
  Bot,
  LifeBuoy,
  LockKeyhole,
  LogOut,
  Megaphone,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/campaigns", label: "Campaign", icon: Megaphone },
  { href: "/agents", label: "Agent WA", icon: Bot },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/security", label: "Security", icon: LockKeyhole },
];

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
  };
}) {
  const displayName = user.name ?? "Admin";
  const displayEmail = user.email ?? "No email";

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 px-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">WA Rotator</div>
            <div className="text-xs text-muted-foreground">Agent routing panel</div>
          </div>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="justify-start">
              <Link href={item.href}>
                <item.icon className="size-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="p-3">
          <div className="mb-3 rounded-lg border bg-muted/40 p-3">
            <div className="truncate text-sm font-medium">{displayName}</div>
            <div className="truncate text-xs text-muted-foreground">
              {displayEmail}
            </div>
          </div>
          <Button asChild className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
            <Link href="/campaigns/new">
              <Plus className="size-4" />
              Campaign Baru
            </Link>
          </Button>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div>
            <div className="text-sm font-medium">Admin Panel</div>
            <div className="text-xs text-muted-foreground">
              Logged in as {displayEmail}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/support">
                <LifeBuoy className="size-4" />
                Support
              </Link>
            </Button>
            <SignOutButton>
              <LogOut className="size-4" />
              Logout
            </SignOutButton>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
