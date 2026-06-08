import { KeyRound, Save } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
  return (
    <>
      <PageHeading
        title="Security"
        description="Update password admin dan persiapkan reset flow berbasis email link."
      />
      <Card className="max-w-2xl rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><KeyRound className="size-4" /> Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="currentPassword">Password Saat Ini</FieldLabel>
                <Input id="currentPassword" type="password" />
              </Field>
              <Field>
                <FieldLabel htmlFor="newPassword">Password Baru</FieldLabel>
                <Input id="newPassword" type="password" />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">Konfirmasi Password</FieldLabel>
                <Input id="confirmPassword" type="password" />
                <FieldDescription>Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</FieldDescription>
              </Field>
            </FieldGroup>
            <Button className="w-fit bg-emerald-600 hover:bg-emerald-700">
              <Save className="size-4" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
