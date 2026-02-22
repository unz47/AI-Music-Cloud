"use client";

import { useEffect } from "react";
import { ADSENSE_PUB_ID, ADSENSE_ENABLED } from "@/lib/ad-config";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSense({
  slot,
  format = "auto",
  style,
  className,
}: {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  if (!ADSENSE_ENABLED) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
