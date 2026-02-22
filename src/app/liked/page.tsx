"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";
import { TrackCard } from "@/components/TrackCard";

export default function LikedPage() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) { setLoading(false); return; }
    fetch("/api/likes/tracks")
      .then((r) => r.json())
      .then((items: Record<string, string | number>[]) => {
        setTracks(items.map((t) => ({
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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session?.user?.email]);

  return (
    <AppShell tracks={tracks}>
      {({ currentTrack, setCurrentTrack, togglePlay, isAudioPlaying, likedIds }) => (
        <>
          <div className="flex items-center gap-3">
            <Heart size={28} className="text-accent-pink" />
            <h1 className="text-2xl font-bold text-white">Liked Tracks</h1>
          </div>

          {!session ? (
            <p className="text-text-secondary">ログインするといいねした曲が表示されます。</p>
          ) : loading ? (
            <p className="text-text-tertiary">Loading...</p>
          ) : tracks.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <Heart size={48} className="text-text-tertiary" />
              <p className="text-text-secondary">まだいいねした曲がありません</p>
              <p className="text-sm text-text-tertiary">気に入った曲の ♡ をクリックしていいねしましょう</p>
            </div>
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
          )}
        </>
      )}
    </AppShell>
  );
}
