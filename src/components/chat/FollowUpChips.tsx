"use client";

export default function FollowUpChips({
  followUps,
  isStreaming,
  onSelect,
}: {
  followUps: string[];
  isStreaming: boolean;
  onSelect: (text: string) => void;
}) {
  if (followUps.length === 0) return null;

  return (
    <div className="px-3 pb-4 sm:px-4 lg:px-6">
      <div className="flex flex-wrap gap-2">
        {followUps.map((f, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(f)}
            disabled={isStreaming}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}