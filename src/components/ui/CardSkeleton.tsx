export default function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-4/3 w-full animate-pulse bg-slate-200" />
      <div className="flex flex-1 flex-col p-5">
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-10 animate-pulse rounded-2xl bg-slate-100" />
        </div>
        <div className="mt-6 h-11 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
