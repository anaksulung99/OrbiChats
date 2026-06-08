import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader>
        <CardTitle>Login Admin</CardTitle>
        <CardDescription>Masuk untuk mengelola campaign rotator dan agent WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
          <Link href="/forgot-password" className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
