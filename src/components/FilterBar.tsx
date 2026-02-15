"use client";

const FILTERS = ["All", "Trending", "New Releases", "Most Played"] as const;

export function FilterBar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (filter: string) => void;
}) {
  return (
    <div className="flex gap-2 border-b border-white/5 pb-4">
      {FILTERS.map((f) => (
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
  );
}
