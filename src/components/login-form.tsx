"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Email atau password tidak sesuai.");
      return;
    }

    window.location.href = result?.url ?? callbackUrl;
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue="admin@warotator.local"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue="password123"
          />
          <FieldError>{error}</FieldError>
        </Field>
      </FieldGroup>
      <Button disabled={isPending} className="bg-emerald-600 hover:bg-emerald-700">
        <LogIn className="size-4" />
        {isPending ? "Login..." : "Login"}
      </Button>
    </form>
  );
}
