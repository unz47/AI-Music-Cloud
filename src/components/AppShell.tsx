"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";
import { AuthButton } from "@/components/AuthButton";
import { Sidebar } from "@/components/Sidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { UploadModal } from "@/components/UploadModal";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const togglePlayRef = useRef<(() => void) | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // PC では初期表示でサイドバーを開く
  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch("/api/likes")
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
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between bg-surface-0 px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-surface-3"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="text-lg font-bold text-white lg:text-xl">AI Music Cloud</a>
        </div>

        {/* Desktop search */}
        {pathname === "/" && (
          <div className="hidden md:flex h-10 w-[480px] items-center gap-2 rounded-lg bg-surface-2 px-4">
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
                <X size={16} />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          {pathname === "/" && (
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-surface-3 md:hidden"
            >
              <Search size={20} />
            </button>
          )}
          <AuthButton onUploadClick={() => setUploadOpen(true)} />
        </div>
      </header>

      {/* Mobile search bar */}
      {searchOpen && pathname === "/" && (
        <div className="flex h-12 items-center gap-2 border-b border-white/5 bg-surface-0 px-4 md:hidden">
          <Search size={18} className="shrink-0 text-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks & artists..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder:text-text-tertiary outline-none"
          />
          <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }} className="text-text-tertiary hover:text-white">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pb-44 lg:p-8 lg:pb-44">
          {children({
            currentTrack,
            setCurrentTrack,
            togglePlay: () => togglePlayRef.current?.(),
            isAudioPlaying,
            likedIds,
            searchQuery,
          })}
        </main>
      </div>

      <div className="fixed bottom-[90px] left-0 right-0 z-40 md:bottom-[90px]">
        <PlayerBar
          track={currentTrack}
          onNext={() => skipTrack(1)}
          onPrev={() => skipTrack(-1)}
          toggleRef={togglePlayRef}
          onPlayingChange={setIsAudioPlaying}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-surface-0 border-t border-white/5" style={{ height: 90 }}>
        <AdSense slot="XXXXXXXXXX" format="horizontal" className="w-full max-w-[728px] overflow-hidden" style={{ height: 90 }} />
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(track) => onTrackAdded?.(track)}
      />
    </div>
  );
}
