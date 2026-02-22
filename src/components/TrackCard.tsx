"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Heart, Headphones, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const AVATAR_COLORS = ["#a855f7", "#22d3ee", "#ec4899", "#84cc16"];

export function TrackCard({
  track,
  onPlay,
  onPause,
  onDelete,
  initialLiked = false,
  isPlaying = false,
  isCurrent = false,
}: {
  track: Track;
  onPlay: (track: Track) => void;
  onPause?: () => void;
  onDelete?: (track: Track) => void;
  initialLiked?: boolean;
  isPlaying?: boolean;
  isCurrent?: boolean;
}) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(track.likeCount);

  const artist = track.artist ?? "Unknown";
  const avatarColor = AVATAR_COLORS[artist.length % AVATAR_COLORS.length];

  // initialLiked が後から変わった場合に反映
  useEffect(() => { setLiked(initialLiked); }, [initialLiked]);

  async function toggleLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (!session?.user?.email) return;
    const res = await fetch(`/api/tracks/${track.id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.email }),
    });
    const { liked: nowLiked } = await res.json();
    setLiked(nowLiked);
    setLikeCount((c) => c + (nowLiked ? 1 : -1));
  }

  return (
    <button
      onClick={() => isCurrent ? onPause?.() : onPlay(track)}
      className={`group flex flex-col overflow-hidden rounded-xl bg-surface-1 text-left transition-all hover:shadow-card-hover ${isCurrent ? "ring-2 ring-accent-purple" : ""}`}
    >
      {/* Artwork */}
      <div
        className="relative flex h-[200px] w-full items-center justify-center"
        style={{ backgroundColor: track.artworkKey ? undefined : track.artworkColor }}
      >
        {track.artworkKey && (
          <img src={`/api/stream?key=${encodeURIComponent(track.artworkKey)}&redirect=1`} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent-purple text-white opacity-0 transition-opacity group-hover:opacity-100">
          {isPlaying ? <Pause size={36} fill="white" /> : <Play size={36} fill="white" />}
        </span>
        {onDelete && (
          <div
            onClick={(e) => { e.stopPropagation(); onDelete(track); }}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex w-full flex-col gap-2.5 px-4 py-3">
        {/* Row 1: Title + Like */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[15px] font-semibold text-text-primary">
            {track.title}
          </h3>
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1 text-text-tertiary">
              <Headphones size={14} />
              <span className="text-xs font-medium">{track.playCount}</span>
            </span>
            <div
              onClick={toggleLike}
              className="flex items-center gap-1 text-text-tertiary hover:text-accent-pink"
            >
              <Heart size={16} className={liked ? "fill-accent-pink text-accent-pink" : ""} />
              {likeCount > 0 && <span className="text-xs font-medium">{likeCount}</span>}
            </div>
          </div>
        </div>

        {/* Row 2: Avatar + Artist + Time */}
        <div className="flex items-center gap-2">
          {track.artistImage ? (
            <img src={track.artistImage} alt="" className="h-[22px] w-[22px] shrink-0 rounded-full object-cover" />
          ) : (
            <span
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
              style={{ backgroundColor: avatarColor }}
            >
              {artist[0]}
            </span>
          )}
          <span className="truncate text-[13px] text-text-secondary">{artist}</span>
          <span className="text-[13px] text-text-tertiary">·</span>
          <span className="shrink-0 text-xs text-text-tertiary">
            {track.createdAt ? timeAgo(track.createdAt) : ""}
          </span>
        </div>

        {/* Row 3: Badges */}
        <div className="flex items-center gap-1.5">
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
