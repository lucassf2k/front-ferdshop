export const ShoppingCartSkeleton = () => {
  return (
    <div className="sticky top-24 max-h-115 max-w-104 rounded-2xl bg-white">
      <div className="animate-pulse py-5">
        {/* Header */}
        <div className="flex items-center gap-5 px-8">
          <div className="h-12 w-12 rounded-xl bg-gray-200" />

          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-3 w-24 rounded bg-gray-200" />
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gray-200" />

        {/* Empty / Items placeholder */}
        <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
          <div className="h-20 w-20 rounded-3xl bg-gray-200" />
          <div className="h-4 w-40 rounded bg-gray-200" />
          <div className="h-3 w-48 rounded bg-gray-200" />
          <div className="h-3 w-36 rounded bg-gray-200" />
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gray-200" />

        {/* Button */}
        <div className="w-full px-8">
          <div className="flex h-13.5 w-full items-center justify-between rounded-2xl bg-gray-200 px-4">
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="h-8 w-8 rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
