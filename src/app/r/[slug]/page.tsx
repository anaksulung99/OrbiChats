import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveRotator } from "@/lib/rotator";

export default async function RotatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveRotator(slug);

  if (!resolved) {
    notFound();
  }

  setTimeout(() => {
    redirect(resolved.url);
  }, 500);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader>
          <CardTitle>{resolved.campaign.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            Kamu akan diarahkan ke {resolved.agent.name} melalui WhatsApp.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Link href={resolved.url}>
              <MessageCircle className="size-4" />
              Buka WhatsApp
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
