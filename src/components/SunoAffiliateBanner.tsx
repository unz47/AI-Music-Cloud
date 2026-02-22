"use client";

import { ExternalLink, Music } from "lucide-react";
import { SUNO_AFFILIATE_URL } from "@/lib/ad-config";

export function SunoAffiliateBanner() {
  return (
    <a
      href={SUNO_AFFILIATE_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block overflow-hidden rounded-xl border border-white/5 bg-surface-1"
    >
      {/* ビジュアルエリア */}
      <div className="flex h-[180px] flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-purple/30 to-accent-purple/10">
        <Music size={32} className="text-white/50" />
        <span className="text-lg font-extrabold tracking-wide text-white/80">SUNO AI</span>
        <span className="text-[11px] text-white/50">Make any song you can imagine</span>
      </div>
      {/* 情報エリア */}
      <div className="space-y-2 p-3">
        <p className="text-[10px] tracking-wider text-text-tertiary">Affiliate</p>
        <p className="text-[13px] font-semibold leading-tight text-white">
          Suno AI で音楽を作ろう — 無料で始められます
        </p>
      </div>
      {/* CTA */}
      <div className="mx-3 mb-3 flex items-center justify-center gap-1.5 rounded-lg bg-accent-purple py-2 text-xs font-semibold text-white transition-colors group-hover:bg-accent-purple/80">
        <ExternalLink size={14} />
        無料で始める
      </div>
    </a>
  );
}
