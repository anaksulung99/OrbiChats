import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Kirim link reset password ke email admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="admin@domain.com" />
            </Field>
          </FieldGroup>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Mail className="size-4" />
            Kirim Reset Link
          </Button>
          <Link href="/login" className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline">
            Kembali ke login
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
