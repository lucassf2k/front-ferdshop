const BestSellersItemSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* IMAGE */}
      <div className="relative">
        <div className="h-27.5 w-full rounded-2xl bg-gray-200" />

        {/* BADGE (#1) */}
        <div className="absolute top-2.5 left-4 h-6 w-9 rounded-sm bg-gray-300" />
      </div>

      {/* CONTENT */}
      <div className="space-y-2 p-3 leading-6">
        {/* TITLE */}
        <div className="h-4 w-24 rounded bg-gray-200" />

        {/* DESCRIPTION */}
        <div className="h-3 w-32 rounded bg-gray-200" />

        {/* PRICE + SOLD */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export const BestSellersSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4 rounded-2xl bg-white p-5">
      {/* TITLE */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-gray-200" />
        <div className="h-4 w-40 rounded bg-gray-200" />
      </div>

      {/* GRID */}
      <div className="grid w-full grid-cols-2 gap-2">
        <BestSellersItemSkeleton />
        <BestSellersItemSkeleton />
      </div>
    </div>
  );
};
