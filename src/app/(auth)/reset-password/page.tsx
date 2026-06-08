import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Buat password baru dari link reset email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Password Baru</FieldLabel>
              <Input id="password" type="password" />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Konfirmasi Password</FieldLabel>
              <Input id="confirmPassword" type="password" />
            </Field>
          </FieldGroup>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <KeyRound className="size-4" />
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
