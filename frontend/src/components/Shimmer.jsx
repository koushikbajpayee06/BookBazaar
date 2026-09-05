const Shimmer = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 h-9 w-64 animate-pulse rounded-lg bg-gray-300" />

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="h-12 min-w-72 flex-1 animate-pulse rounded-lg bg-gray-300" />
        <div className="h-12 w-28 animate-pulse rounded-lg bg-gray-300" />
        <div className="h-12 w-32 animate-pulse rounded-lg bg-gray-300" />
        <div className="h-12 w-44 animate-pulse rounded-lg bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl bg-white shadow-md"
          >
            <div className="h-72 animate-pulse bg-gray-300" />

            <div className="space-y-4 p-5">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300" />

              <div className="flex justify-between">
                <div className="h-5 w-20 animate-pulse rounded bg-gray-300" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-300" />
              </div>

              <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Shimmer;