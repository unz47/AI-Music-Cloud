"use client";

import { Play } from "lucide-react";
import { Track } from "@/lib/mock-data";

export function TrackCard({
  track,
  onPlay,
}: {
  track: Track;
  onPlay: (track: Track) => void;
}) {
  return (
    <button
      onClick={() => onPlay(track)}
      className="group flex flex-col overflow-hidden rounded-xl bg-surface-1 text-left transition-all hover:shadow-card-hover"
    >
      {/* Artwork */}
      <div
        className="relative flex h-[200px] w-full items-center justify-center"
        style={{ backgroundColor: track.artworkColor }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-purple text-white opacity-0 transition-opacity group-hover:opacity-100">
          <Play size={36} fill="white" />
        </span>
      </div>

      {/* Info */}
      <div className="flex w-full flex-col gap-2 p-4">
        <h3 className="truncate text-base font-semibold text-text-primary">
          {track.title}
        </h3>
        <p className="truncate text-sm text-text-secondary">{track.artist}</p>
        <div className="flex gap-1.5">
          <span className="rounded bg-accent-purple/10 px-2 py-1 text-xs font-medium text-accent-purple">
            {track.genre}
          </span>
          <span className="rounded bg-accent-cyan/10 px-2 py-1 text-xs font-medium text-accent-cyan">
            {track.aiTool}
          </span>
        </div>
      </div>
    </button>
  );
}
