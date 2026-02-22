"use client";

import { useEffect, useState } from "react";
import { Track } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";
import { FilterBar } from "@/components/FilterBar";
import { TrackCard } from "@/components/TrackCard";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/tracks")
      .then((r) => r.json())
      .then((dbTracks: Record<string, string | number>[]) => {
        setTracks(dbTracks.map((t) => ({
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
        })));
      })
      .catch(() => {});
  }, []);

  return (
    <AppShell tracks={tracks} onTrackAdded={(t) => setTracks((prev) => [t, ...prev])}>
      {({ currentTrack, setCurrentTrack, togglePlay, isAudioPlaying, likedIds }) => (
        <>
          <FilterBar selected={filter} onSelect={setFilter} />
          <h2 className="text-xl font-bold text-white">Trending Tracks</h2>
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
        </>
      )}
    </AppShell>
  );
}
