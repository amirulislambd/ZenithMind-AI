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
        border-cyan-500/20
        bg-gradient-to-br
        from-cyan-500/10
        to-blue-500/10
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
              border-cyan-500/30
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
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              text-xl
              font-bold
              text-white
            "
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">
            {user.name}
          </h3>

          <p className="truncate text-xs text-slate-400">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}