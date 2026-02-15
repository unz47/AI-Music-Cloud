"use client";

import { User, Music, Heart, Clock, Settings, HelpCircle, Flag } from "lucide-react";

export function Sidebar({ open }: { open: boolean }) {
  return (
    <aside
      className="shrink-0 overflow-hidden bg-surface-0 transition-[width] duration-300 ease-in-out"
      style={{ width: open ? 240 : 0 }}
    >
      <div className="flex w-60 flex-col gap-1 p-4 px-3">
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
      {([
        { label: "Profile", icon: User },
        { label: "My Tracks", icon: Music },
        { label: "Liked", icon: Heart },
        { label: "History", icon: Clock },
        { label: "Settings", icon: Settings },
      ] as const).map((item) => (
        <button key={item.label} className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] text-text-secondary hover:bg-surface-3">
          <item.icon size={24} />
          {item.label}
        </button>
      ))}

      <div className="my-1 h-px bg-white/5" />

      {/* SUPPORT */}
      <p className="px-3 pt-2 text-[11px] font-semibold text-text-tertiary">SUPPORT</p>
      {([
        { label: "Help", icon: HelpCircle },
        { label: "Report", icon: Flag },
      ] as const).map((item) => (
        <button key={item.label} className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] text-text-secondary hover:bg-surface-3">
          <item.icon size={24} />
          {item.label}
        </button>
      ))}
      </div>
    </aside>
  );
}
