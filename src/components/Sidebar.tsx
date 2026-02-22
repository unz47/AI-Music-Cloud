"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Music, Heart, Clock, Settings, HelpCircle, Flag } from "lucide-react";

const MY_PAGE_ITEMS = [
  { label: "Profile", icon: User, href: "#" },
  { label: "My Tracks", icon: Music, href: "/my-tracks" },
  { label: "Liked", icon: Heart, href: "/liked" },
  { label: "History", icon: Clock, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
] as const;

const SUPPORT_ITEMS = [
  { label: "Help", icon: HelpCircle, href: "#" },
  { label: "Report", icon: Flag, href: "#" },
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
          const active = item.href !== "#" && pathname === item.href;
          return (
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
          <Link
            key={item.label}
            href={item.href}
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] text-text-secondary hover:bg-surface-3"
          >
            <item.icon size={24} />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
