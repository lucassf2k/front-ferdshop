export const ListCategoriesSkeleton = () => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-8 w-20 animate-pulse rounded-full bg-white/80"
        />
      ))}
    </div>
  );
};
