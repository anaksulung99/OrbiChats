import { Save } from "lucide-react";

import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <>
      <PageHeading
        title="Profile Admin"
        description="Update nama dan email admin yang sedang login."
      />
      <Card className="max-w-2xl rounded-lg">
        <CardHeader>
          <CardTitle>Data Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nama</FieldLabel>
                <Input id="name" defaultValue="Admin Rotator" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" defaultValue="admin@warotator.local" />
                <FieldDescription>Perubahan email sebaiknya diverifikasi ulang sebelum aktif.</FieldDescription>
              </Field>
            </FieldGroup>
            <Button className="w-fit bg-emerald-600 hover:bg-emerald-700">
              <Save className="size-4" />
              Simpan Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
