"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const publicLink = `${window.location.origin}/r/${slug}`;

    navigator.clipboard.writeText(publicLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Button variant="outline" onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="size-4 text-emerald-600" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy Link
        </>
      )}
    </Button>
  );
}
