"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";
import { TrackCard } from "@/components/TrackCard";

export default function MyTracksPage() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) { setLoading(false); return; }
    fetch(`/api/tracks/user?userId=${encodeURIComponent(session.user.email)}`)
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
    <AppShell tracks={tracks} onTrackAdded={(t) => setTracks((prev) => [t, ...prev])}>
      {({ currentTrack, setCurrentTrack, togglePlay, isAudioPlaying, likedIds }) => (
        <>
          <div className="flex items-center gap-3">
            <Music size={28} className="text-accent-purple" />
            <h1 className="text-2xl font-bold text-white">My Tracks</h1>
          </div>

          {!session ? (
            <p className="text-text-secondary">ログインすると投稿した曲が表示されます。</p>
          ) : loading ? (
            <p className="text-text-tertiary">Loading...</p>
          ) : tracks.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <Music size={48} className="text-text-tertiary" />
              <p className="text-text-secondary">まだ曲を投稿していません</p>
              <p className="text-sm text-text-tertiary">右上の「Upload」ボタンから曲をアップロードしましょう</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
              {tracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onPlay={setCurrentTrack}
                  onPause={togglePlay}
                  onDelete={async (t) => {
                    if (!confirm(`"${t.title}" を削除しますか？`)) return;
                    await fetch(`/api/tracks/${t.id}`, { method: "DELETE" });
                    setTracks((prev) => prev.filter((x) => x.id !== t.id));
                  }}
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
