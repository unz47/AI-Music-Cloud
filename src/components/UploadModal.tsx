"use client";

import { useRef, useState } from "react";
import { X, Music, Upload, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Track } from "@/lib/mock-data";
import { GENRES, AI_TOOLS, ARTWORK_COLORS } from "@/lib/constants";

export function UploadModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (track: Track) => void;
}) {
  const { data: session } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState<string>(GENRES[0]);
  const [aiTool, setAiTool] = useState<string>(AI_TOOLS[0]);
  const [uploading, setUploading] = useState(false);

  if (!open) return null;

  const artist = session?.user?.name ?? "Anonymous";
  const canSubmit = title.trim().length > 0 && file !== null && !uploading;

  async function handleSubmit() {
    if (!canSubmit) return;
    setUploading(true);

    try {
      // 1. Presigned URL を取得
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type }),
      });
      const { url, key } = await res.json();

      // 2. S3 に直接アップロード
      await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });

      // 3. DynamoDB に保存
      const trackData = {
        title: title.trim(),
        artist,
        artistImage: session?.user?.image ?? undefined,
        userId: session?.user?.email ?? "anonymous",
        genre,
        aiTool,
        audioKey: key,
        artworkColor: ARTWORK_COLORS[Math.floor(Math.random() * ARTWORK_COLORS.length)],
        duration: Math.floor(Math.random() * 180) + 120,
      };
      const dbRes = await fetch("/api/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackData),
      });
      const saved = await dbRes.json();

      // 4. 画面に反映
      const track: Track = {
        id: saved.id,
        title: saved.title,
        artist: saved.artist,
        artistImage: saved.artistImage,
        genre: saved.genre,
        aiTool: saved.aiTool,
        artworkColor: saved.artworkColor,
        audioUrl: saved.audioKey,
        duration: saved.duration,
        playCount: 0,
        likeCount: 0,
        createdAt: saved.createdAt ?? new Date().toISOString(),
      };
      onSubmit(track);
      setTitle("");
      setFile(null);
      setGenre(GENRES[0]);
      setAiTool(AI_TOOLS[0]);
      onClose();
    } catch (e) {
      console.error("Upload failed:", e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-border-default bg-surface-1 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <Upload size={22} />
            Upload Track
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-text-tertiary hover:bg-surface-3 hover:text-text-primary">
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Audio file */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Audio File *</label>
            <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-20 items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-2 text-text-tertiary hover:border-accent-purple hover:text-accent-purple"
            >
              <div className="flex flex-col items-center gap-1">
                <Music size={24} />
                <span className="text-xs">{file ? file.name : "Click to select audio file"}</span>
              </div>
            </button>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Track title"
              className="rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:ring-2 focus:ring-accent-purple"
            />
          </div>

          {/* Artist (自動) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-secondary">Artist</label>
            <div className="rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-secondary">
              {artist}
            </div>
          </div>

          {/* Genre & AI Tool */}
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent-purple"
              >
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">AI Tool</label>
              <select
                value={aiTool}
                onChange={(e) => setAiTool(e.target.value)}
                className="rounded-lg bg-surface-2 px-3 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent-purple"
              >
                {AI_TOOLS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent-purple py-3 text-sm font-semibold text-white hover:bg-accent-purple-hover disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? <><Loader2 size={18} className="animate-spin" /> Uploading...</> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
