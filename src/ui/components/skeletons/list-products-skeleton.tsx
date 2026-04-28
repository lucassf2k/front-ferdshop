export const ListProductItemSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-4">
      <div className="flex justify-between">
        {/* imagem */}
        <div className="h-24 w-24 rounded-lg bg-gray-200" />

        <div className="space-y-2 text-end">
          {/* preço */}
          <div className="ml-auto h-4 w-16 rounded bg-gray-200" />

          {/* estrelas */}
          <div className="flex justify-end gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {/* título */}
        <div className="h-4 w-24 rounded bg-gray-200" />

        {/* descrição */}
        <div className="h-3 w-32 rounded bg-gray-200" />
      </div>

      {/* botão */}
      <div className="mt-10 h-10 w-12 rounded-xl bg-gray-200" />
    </div>
  );
};
