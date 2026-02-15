"use client";

import { useCallback, useState } from "react";
import { Menu, Search } from "lucide-react";
import { mockTracks, Track } from "@/lib/mock-data";
import { AuthButton } from "@/components/AuthButton";
import { Sidebar } from "@/components/Sidebar";
import { FilterBar } from "@/components/FilterBar";
import { TrackCard } from "@/components/TrackCard";
import { PlayerBar } from "@/components/PlayerBar";
import { UploadModal } from "@/components/UploadModal";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [filter, setFilter] = useState("All");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  const skipTrack = useCallback((dir: 1 | -1) => {
    if (!currentTrack) return;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const next = tracks[(idx + dir + tracks.length) % tracks.length];
    setCurrentTrack(next);
  }, [currentTrack, tracks]);

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between bg-surface-0 px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-surface-3"
          >
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-white">AI Music Cloud</span>
        </div>

        <div className="flex h-10 w-[480px] items-center gap-2 rounded-lg bg-surface-2 px-4">
          <Search size={20} className="text-text-tertiary" />
          <span className="text-sm text-text-tertiary">Search tracks &amp; artists...</span>
        </div>

        <AuthButton onUploadClick={() => setUploadOpen(true)} />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />

        <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 pb-28">
          <FilterBar selected={filter} onSelect={setFilter} />

          <h2 className="text-xl font-bold text-white">Trending Tracks</h2>

          <div className="grid grid-cols-5 gap-6">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} onPlay={setCurrentTrack} />
            ))}
          </div>
        </main>
      </div>

      <PlayerBar track={currentTrack} onNext={() => skipTrack(1)} onPrev={() => skipTrack(-1)} />

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(track) => setTracks((prev) => [track, ...prev])}
      />
    </div>
  );
}
