import { PageHeading } from "@/components/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <>
      <PageHeading title="Support" description="Checklist operasional sebelum rotator dipakai di produksi." />
      <Card className="rounded-lg">
        <CardContent className="grid gap-3 text-sm text-muted-foreground">
          <p>Hubungkan Neon PostgreSQL lewat DATABASE_URL.</p>
          <p>Jalankan migration Drizzle, lalu aktifkan email provider untuk forgot/reset password.</p>
          <p>Tambahkan logging assignment dari route /r/[slug] agar analytics memakai data real.</p>
        </CardContent>
      </Card>
    </>
  );
}
