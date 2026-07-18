"use client";

interface Props {
  user: {
    name?: string;
    email?: string;
    imageUrl?: string;
  };
}

export default function MobileUserCard({
  user,
}: Props) {
  return (
    <div
      className="
        mt-6
        rounded-3xl
        border
        border-[#173056]
        bg-[#081429]
        p-4
      "
    >
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-[#10b981]/30 bg-gradient-to-r from-[#1e293b] via-[#10b981] to-[#6366f1] flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={(user as any).image || (user as any).imageUrl || ""} 
            alt={user.name || "User"} 
            className="h-full w-full object-cover" 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
            style={{ display: ((user as any).image || (user as any).imageUrl) ? 'block' : 'none' }}
          />
          <span className={`text-xl font-bold text-[#e2e8f0] ${((user as any).image || (user as any).imageUrl) ? 'hidden' : ''}`}>
            {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-[#e2e8f0]">
            {user.name}
          </h3>

          <p className="truncate text-xs text-[#94a3b8]">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}