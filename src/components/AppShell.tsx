"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";
import { AuthButton } from "@/components/AuthButton";
import { Sidebar } from "@/components/Sidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { UploadModal } from "@/components/UploadModal";
import { SunoAffiliateBanner } from "@/components/SunoAffiliateBanner";
import { AdSense } from "@/components/AdSense";

export function AppShell({
  children,
  tracks,
  onTrackAdded,
}: {
  children: (ctx: {
    currentTrack: Track | null;
    setCurrentTrack: (t: Track) => void;
    togglePlay: () => void;
    isAudioPlaying: boolean;
    likedIds: Set<string>;
    searchQuery: string;
  }) => React.ReactNode;
  tracks: Track[];
  onTrackAdded?: (track: Track) => void;
}) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const togglePlayRef = useRef<(() => void) | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`/api/likes?userId=${encodeURIComponent(session.user.email)}`)
      .then((r) => r.json())
      .then((ids: string[]) => setLikedIds(new Set(ids)))
      .catch(() => {});
  }, [session?.user?.email]);

  const skipTrack = useCallback(
    (dir: 1 | -1) => {
      if (!currentTrack) return;
      const idx = tracks.findIndex((t) => t.id === currentTrack.id);
      const next = tracks[(idx + dir + tracks.length) % tracks.length];
      setCurrentTrack(next);
    },
    [currentTrack, tracks],
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      <header className="flex h-16 shrink-0 items-center justify-between bg-surface-0 px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-surface-3"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="text-xl font-bold text-white">AI Music Cloud</a>
        </div>
        {pathname === "/" && (
          <div className="flex h-10 w-[480px] items-center gap-2 rounded-lg bg-surface-2 px-4">
            <Search size={20} className="text-text-tertiary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks & artists..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-text-tertiary outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-text-tertiary hover:text-white">
                ✕
              </button>
            )}
          </div>
        )}
        <AuthButton onUploadClick={() => setUploadOpen(true)} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 pb-28">
          {children({
            currentTrack,
            setCurrentTrack,
            togglePlay: () => togglePlayRef.current?.(),
            isAudioPlaying,
            likedIds,
            searchQuery,
          })}
        </main>
        {/* 右サイドバー: 広告エリア */}
        {pathname === "/" && (
          <aside className="hidden w-[300px] shrink-0 space-y-4 overflow-y-auto p-4 pb-28 xl:block">
            <SunoAffiliateBanner />
            <AdSense slot="XXXXXXXXXX" style={{ width: 268, height: 250 }} />
            <button className="flex w-full items-center justify-center gap-1 text-[11px] text-text-tertiary hover:text-text-secondary">
              <Settings size={12} />
              Ad Preferences
            </button>
          </aside>
        )}
      </div>

      <PlayerBar
        track={currentTrack}
        onNext={() => skipTrack(1)}
        onPrev={() => skipTrack(-1)}
        toggleRef={togglePlayRef}
        onPlayingChange={setIsAudioPlaying}
      />

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(track) => onTrackAdded?.(track)}
      />
    </div>
  );
}
