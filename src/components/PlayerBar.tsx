"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Heart, SkipBack, Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { Track } from "@/lib/mock-data";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerBar({
  track,
  onNext,
  onPrev,
}: {
  track: Track | null;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const playCountedRef = useRef(false);

  // トラックが変わったら音源をロード
  useEffect(() => {
    if (!track) return;
    const audio = audioRef.current ?? new Audio();
    audioRef.current = audio;

    async function loadAndPlay() {
      let src = "";
      const url = track!.audioUrl ?? "";
      if (url.startsWith("audio/")) {
        // S3にアップロードされたファイル → Presigned URL取得
        const res = await fetch(`/api/stream?key=${encodeURIComponent(url)}`);
        const data = await res.json();
        src = data.url;
      } else {
        src = url;
      }
      audio.src = src;
      audio.volume = volume;
      try { await audio.play(); setPlaying(true); } catch {}
    }
    playCountedRef.current = false;
    loadAndPlay();

    return () => { audio.pause(); };
  }, [track?.id]);

  // Audio イベント
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (!playCountedRef.current && audio.duration > 0 && audio.currentTime >= audio.duration * 0.1) {
        playCountedRef.current = true;
        fetch(`/api/tracks/${track!.id}/play`, { method: "POST" }).catch(() => {});
      }
    };
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => { setPlaying(false); onNext?.(); };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [track?.id, onNext]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  }, [playing]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }, [duration]);

  const changeVolume = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const v = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = v;
    setVolume(v);
  }, []);

  if (!track) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-between bg-surface-2 px-8">
      {/* Left: Track info */}
      <div className="flex w-[280px] items-center gap-3">
        <div className="h-12 w-12 shrink-0 rounded-lg" style={{ backgroundColor: track.artworkColor }} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text-primary">{track.title}</p>
          <p className="truncate text-xs text-text-tertiary">{track.artist}</p>
        </div>
        <button className="shrink-0 text-text-secondary hover:text-text-primary">
          <Heart size={24} />
        </button>
      </div>

      {/* Center: Controls + Progress */}
      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex items-center gap-6">
          <button onClick={onPrev} className="text-text-tertiary hover:text-text-primary">
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple text-white hover:bg-accent-purple-hover"
          >
            {playing ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
          </button>
          <button onClick={onNext} className="text-text-tertiary hover:text-text-primary">
            <SkipForward size={28} />
          </button>
        </div>
        <div className="flex w-full max-w-lg items-center gap-2 text-xs text-text-tertiary">
          <span className="w-8 text-right">{fmt(currentTime)}</span>
          <div className="h-1 flex-1 cursor-pointer rounded-full bg-surface-5" onClick={seek}>
            <div className="h-full rounded-full bg-accent-purple" style={{ width: `${progress}%` }} />
          </div>
          <span className="w-8">{fmt(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex w-48 items-center gap-3">
        <Volume2 size={24} className="text-text-tertiary" />
        <div className="h-1 flex-1 cursor-pointer rounded-full bg-surface-5" onClick={changeVolume}>
          <div className="h-full rounded-full bg-accent-purple" style={{ width: `${volume * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
