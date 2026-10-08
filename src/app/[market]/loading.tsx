export default function Loading() {
  return (
    <div className="wrap animate-pulse py-10 sm:py-16" aria-busy aria-label="Loading">
      <div className="h-4 w-40 bg-sand" />
      <div className="mt-6 h-20 w-2/3 max-w-xl bg-sand" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] bg-sand" />
            <div className="mt-3 h-4 w-3/4 bg-sand" />
            <div className="mt-2 h-4 w-1/3 bg-sand" />
          </div>
        ))}
      </div>
    </div>
  );
}
