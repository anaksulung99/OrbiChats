"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SignOutButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      {children}
    </Button>
  );
}
