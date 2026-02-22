"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Music, Users, Heart, UserPlus, UserCheck } from "lucide-react";
import { Track } from "@/lib/mock-data";
import { AppShell } from "@/components/AppShell";
import { TrackCard } from "@/components/TrackCard";

export default function UserProfilePage() {
  const { userId: rawParam } = useParams<{ userId: string }>();
  const artistName = decodeURIComponent(rawParam);
  const { data: session } = useSession();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [artistImage, setArtistImage] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // プロフィール情報 & トラック取得
  useEffect(() => {
    fetch(`/api/users/by-artist?name=${encodeURIComponent(artistName)}`)
      .then((r) => r.json())
      .then((d: { artist: string; artistImage: string | null }) => {
        setArtistImage(d.artistImage);
      })
      .catch(() => {});

    fetch(`/api/tracks/by-artist?name=${encodeURIComponent(artistName)}`)
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
  }, [artistName]);

  // 自分のプロフィールかチェック
  useEffect(() => {
    const myName = session?.user?.name;
    setIsOwnProfile(!!myName && myName === artistName);
  }, [session?.user?.name, artistName]);

  // フォロー状態取得
  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`/api/follows/by-artist?artistName=${encodeURIComponent(artistName)}`)
      .then((r) => r.json())
      .then((d: { following: boolean }) => setIsFollowing(d.following))
      .catch(() => {});
  }, [artistName, session?.user?.email]);

  // フォロワー数はcountFor APIで（artist名→userIdの解決はサーバーサイドで行うべきだが、
  // 現状countForはuserIdベース。artist名ベースのcount APIを追加するか、トラック数で代用）
  // → 簡易的にトラック数のみ表示、followers/followingは別途対応

  const toggleFollow = useCallback(async () => {
    if (!session?.user?.email) return;
    const res = await fetch("/api/follows/by-artist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistName }),
    });
    const { following: nowFollowing } = await res.json();
    setIsFollowing(nowFollowing);
    setFollowers((c) => c + (nowFollowing ? 1 : -1));
  }, [session?.user?.email, artistName]);

  return (
    <AppShell tracks={tracks}>
      {({ currentTrack, setCurrentTrack, togglePlay, isAudioPlaying, likedIds }) => (
        <>
          {/* Hero Section */}
          <div className="flex items-start gap-8 rounded-2xl bg-surface-1 p-8">
            {artistImage ? (
              <img src={artistImage} alt={artistName} className="h-24 w-24 shrink-0 rounded-full object-cover" />
            ) : (
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-accent-purple text-3xl font-bold text-white">
                {artistName[0]?.toUpperCase()}
              </span>
            )}
            <div className="flex flex-1 flex-col gap-3">
              <h1 className="text-2xl font-bold text-white">{artistName}</h1>
              <p className="text-sm text-text-secondary">AI music creator & curator.</p>
              {!isOwnProfile && session?.user && (
                <div className="flex gap-3">
                  <button
                    onClick={toggleFollow}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isFollowing
                        ? "border border-white/10 text-white hover:bg-surface-3"
                        : "bg-accent-purple text-white hover:bg-accent-purple/80"
                    }`}
                  >
                    {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Music size={16} className="text-text-tertiary" />
              <span className="text-lg font-bold text-white">{tracks.length}</span>
              <span className="text-sm text-text-tertiary">Tracks</span>
            </div>
          </div>

          {/* Tracks */}
          <h2 className="text-lg font-bold text-white border-b border-white/5 pb-3">Tracks</h2>
          {tracks.length === 0 ? (
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
          )}
        </>
      )}
    </AppShell>
  );
}
