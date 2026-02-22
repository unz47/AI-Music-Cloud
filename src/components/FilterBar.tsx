"use client";

const SORT_FILTERS = ["All", "Trending", "New Releases", "Most Played"] as const;

const GENRES = [
  "Pop", "Rock", "Hip-Hop", "R&B", "EDM", "House", "Future Bass",
  "Dubstep", "Lo-Fi", "Jazz", "Classical", "Ambient", "Trap",
  "Drum & Bass", "Phonk", "Synthwave",
] as const;

export function FilterBar({
  selected,
  onSelect,
  selectedGenre,
  onGenreSelect,
}: {
  selected: string;
  onSelect: (filter: string) => void;
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/5 pb-4">
      <div className="flex gap-2">
        {SORT_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onSelect(f)}
            className={`rounded-full px-4 py-2 text-[13px] transition-colors ${
              selected === f
                ? "bg-accent-purple font-semibold text-white"
                : "bg-surface-3 text-text-secondary hover:bg-surface-4"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => onGenreSelect("All")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
            selectedGenre === "All"
              ? "bg-accent-cyan font-semibold text-white"
              : "bg-surface-3 text-text-secondary hover:bg-surface-4"
          }`}
        >
          All Genres
        </button>
        {GENRES.map((g) => (
          <button
            key={g}
            onClick={() => onGenreSelect(g)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors ${
              selectedGenre === g
                ? "bg-accent-cyan font-semibold text-white"
                : "bg-surface-3 text-text-secondary hover:bg-surface-4"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}
