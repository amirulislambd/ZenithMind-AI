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
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.name}
            className="
              h-14
              w-14
              rounded-full
              border-2
              border-[#10b981]/30
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-linear-to-r
              from-[#1e293b]
              via-[#10b981]
              to-[#6366f1]
              text-xl
              font-bold
              text-[#e2e8f0]
            "
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}

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