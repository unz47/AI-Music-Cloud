"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Edit3, Share2, Music, Users, Heart } from "lucide-react";
import { Track } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";
import { TrackCard } from "@/components/TrackCard";

type Tab = "Tracks" | "Liked" | "Playlists";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [tab, setTab] = useState<Tab>("Tracks");

  const email = session?.user?.email ?? "";
  const name = session?.user?.name ?? "User";
  const image = session?.user?.image;

  useEffect(() => {
    if (!email) return;
    fetch(`/api/tracks/user?userId=${encodeURIComponent(email)}`)
      .then((r) => r.json())
      .then((dbTracks: Record<string, string | number>[]) => {
        setTracks(
          dbTracks.map((t) => ({
            id: t.id as string,
            title: t.title as string,
            artist: t.artist as string,
            artistImage: (t.artistImage as string) || undefined,
            genre: t.genre as string,
            aiTool: t.aiTool as string,
            artworkColor: t.artworkColor as string,
            artworkKey: (t.artworkKey as string) || undefined,
            audioUrl: t.audioKey as string,
            duration: t.duration as number,
            playCount: (t.playCount as number) ?? 0,
            likeCount: (t.likeCount as number) ?? 0,
            createdAt: (t.createdAt as string) ?? new Date().toISOString(),
          }))
        );
      })
      .catch(() => {});
  }, [email]);

  const TABS: Tab[] = ["Tracks", "Liked", "Playlists"];

  return (
    <AppShell tracks={tracks}>
      {({ currentTrack, setCurrentTrack, togglePlay, isAudioPlaying, likedIds }) => (
        <>
          {/* Hero Section */}
          <div className="flex items-start gap-8 rounded-2xl bg-surface-1 p-8">
            {/* Avatar */}
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-accent-purple text-3xl font-bold text-white">
                {name[0]}
              </span>
            )}

            <div className="flex flex-1 flex-col gap-3">
              <div>
                <h1 className="text-2xl font-bold text-white">{name}</h1>
                <p className="text-sm text-text-tertiary">@{email.split("@")[0]}</p>
              </div>
              <p className="text-sm text-text-secondary">
                AI music creator & curator. Exploring the boundaries of AI-generated sound.
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-surface-3">
                  <Edit3 size={16} />
                  Edit Profile
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-surface-3">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { label: "Tracks", value: tracks.length, icon: Music },
              { label: "Followers", value: "—", icon: Users },
              { label: "Following", value: "—", icon: Users },
              { label: "Likes", value: "—", icon: Heart },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon size={16} className="text-text-tertiary" />
                <span className="text-lg font-bold text-white">{s.value}</span>
                <span className="text-sm text-text-tertiary">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-white/5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-semibold ${
                  tab === t
                    ? "border-b-2 border-accent-purple text-white"
                    : "text-text-tertiary hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Content */}
          {tab === "Tracks" && (
            tracks.length === 0 ? (
              <p className="text-sm text-text-tertiary">No tracks yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
                {tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    onPlay={setCurrentTrack}
                    onPause={togglePlay}
                    initialLiked={likedIds.has(track.id)}
                    isCurrent={currentTrack?.id === track.id}
                    isPlaying={currentTrack?.id === track.id && isAudioPlaying}
                  />
                ))}
              </div>
            )
          )}
          {tab === "Liked" && (
            <p className="text-sm text-text-tertiary">Liked tracks will appear here.</p>
          )}
          {tab === "Playlists" && (
            <p className="text-sm text-text-tertiary">Playlists coming soon.</p>
          )}
        </>
      )}
    </AppShell>
  );
}
