"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const hasTouch = navigator.maxTouchPoints > 0;
  const mobileUserAgent =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

  return mobileUserAgent || (hasTouch && window.innerWidth < 900);
}

export function WhatsAppRedirectCard({
  campaignName,
  agentName,
  linkMode,
  deepLinkUrl,
  standardUrl,
}: {
  campaignName: string;
  agentName: string;
  linkMode: "deep_link" | "standard";
  deepLinkUrl: string;
  standardUrl: string;
}) {
  const [manualUrl, setManualUrl] = useState(standardUrl);
  const initialUrl = useMemo(
    () => (linkMode === "standard" ? standardUrl : deepLinkUrl),
    [deepLinkUrl, linkMode, standardUrl],
  );

  useEffect(() => {
    const targetUrl =
      linkMode === "deep_link" && isMobileDevice() ? deepLinkUrl : standardUrl;

    setManualUrl(targetUrl);

    const timer = window.setTimeout(() => {
      window.location.href = targetUrl;
    }, 300);

    return () => window.clearTimeout(timer);
  }, [deepLinkUrl, linkMode, standardUrl]);

  return (
    <Card className="w-full max-w-md rounded-lg">
      <CardHeader>
        <CardTitle>{campaignName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          Kamu akan diarahkan ke {agentName} melalui WhatsApp.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <a href={manualUrl || initialUrl}>
            <MessageCircle className="size-4" />
            Buka WhatsApp
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
