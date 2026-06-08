import Link from "next/link";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader>
        <CardTitle>Login Admin</CardTitle>
        <CardDescription>Masuk untuk mengelola campaign rotator dan agent WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" action="/api/auth/callback/credentials" method="post">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" defaultValue="admin@warotator.local" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" defaultValue="password123" />
            </Field>
          </FieldGroup>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <LogIn className="size-4" />
            Login
          </Button>
          <Link href="/forgot-password" className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
