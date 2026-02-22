"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Music, Heart, Clock, Settings, HelpCircle, Flag, ExternalLink } from "lucide-react";
import { SUNO_AFFILIATE_URL } from "@/lib/ad-config";

const MY_PAGE_ITEMS = [
  { label: "Profile", icon: User, href: "/profile", disabled: false },
  { label: "My Tracks", icon: Music, href: "/my-tracks", disabled: false },
  { label: "Liked", icon: Heart, href: "/liked", disabled: false },
  { label: "History", icon: Clock, href: "#", disabled: true },
  { label: "Settings", icon: Settings, href: "#", disabled: true },
] as const;

const SUPPORT_ITEMS = [
  { label: "Help", icon: HelpCircle, href: "#", disabled: true },
  { label: "Report", icon: Flag, href: "#", disabled: true },
] as const;

export function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className="shrink-0 overflow-hidden bg-surface-0 transition-[width] duration-300 ease-in-out"
      style={{ width: open ? 240 : 0 }}
    >
      <div className="flex w-60 flex-col gap-1 p-4 px-3">
        <Link
          href="/"
          className={`flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] ${
            pathname === "/"
              ? "bg-surface-3 font-semibold text-accent-purple"
              : "text-text-secondary hover:bg-surface-3"
          }`}
        >
          <Home size={24} />
          Home
        </Link>

        <div className="my-1 h-px bg-white/5" />

        {/* FOLLOWING */}
        <p className="px-3 text-[11px] font-semibold text-text-tertiary">FOLLOWING</p>
        {[
          { name: "SynthMaster", color: "bg-accent-purple" },
          { name: "LoFiBot", color: "bg-accent-cyan" },
          { name: "BeatForge AI", color: "bg-accent-pink" },
        ].map((u) => (
          <button key={u.name} className="flex h-10 items-center gap-3 rounded-lg px-3 text-text-secondary hover:bg-surface-3">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${u.color} text-xs text-white`}>
              {u.name[0]}
            </span>
            <span className="truncate text-[13px]">{u.name}</span>
          </button>
        ))}
        <p className="px-3 text-right text-xs text-accent-purple">Show more</p>

        <div className="my-1 h-px bg-white/5" />

        {/* MY PAGE */}
        <p className="px-3 pt-2 text-[11px] font-semibold text-text-tertiary">MY PAGE</p>
        {MY_PAGE_ITEMS.map((item) => {
          const active = !item.disabled && pathname === item.href;
          return item.disabled ? (
            <span
              key={item.label}
              className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] text-text-tertiary/40 cursor-not-allowed"
            >
              <item.icon size={24} />
              {item.label}
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] ${
                active
                  ? "bg-surface-3 font-semibold text-accent-purple"
                  : "text-text-secondary hover:bg-surface-3"
              }`}
            >
              <item.icon size={24} />
              {item.label}
            </Link>
          );
        })}

        <div className="my-1 h-px bg-white/5" />

        {/* SUPPORT */}
        <p className="px-3 pt-2 text-[11px] font-semibold text-text-tertiary">SUPPORT</p>
        {SUPPORT_ITEMS.map((item) => (
          <span
            key={item.label}
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] text-text-tertiary/40 cursor-not-allowed"
          >
            <item.icon size={24} />
            {item.label}
          </span>
        ))}

        <div className="my-1 h-px bg-white/5" />

        {/* Suno Affiliate */}
        <a
          href={SUNO_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group mx-1 mt-2 block overflow-hidden rounded-lg border border-white/5 bg-surface-1"
        >
          <div className="flex h-16 items-center justify-center bg-gradient-to-r from-accent-purple/30 to-accent-purple/10">
            <span className="text-sm font-extrabold tracking-wide text-white/70">MUSIC API</span>
          </div>
          <div className="flex items-center justify-center gap-1 py-2 text-[11px] font-semibold text-accent-purple group-hover:text-accent-purple/80">
            <ExternalLink size={11} />
            AIで音楽を作る
          </div>
        </a>
      </div>
    </aside>
  );
}
