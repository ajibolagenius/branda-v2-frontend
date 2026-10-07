export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
      {/* Hero Skeleton */}
      <div className="space-y-4 max-w-2xl">
        <div className="h-6 w-48 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-full max-w-md rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex gap-2 overflow-x-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-9 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
        ))}
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <div className="aspect-[4/3] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="pt-4 flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800">
              <div className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
