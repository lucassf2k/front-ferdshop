export const BannerInfoOrganizationSkeleton = () => {
  const skeletonAnimationClassname = 'animate-pulse bg-gray-300';

  return (
    <section className="-mt-28 mb-8 flex h-44 w-full items-center justify-between rounded-2xl bg-white p-6">
      <div className="flex items-center gap-6">
        {/* LOGO */}
        <div
          className={`h-30 w-30 rounded-3xl ${skeletonAnimationClassname}`}
        />

        <div>
          {/* TITLE + STATUS */}
          <div className="flex items-center gap-6">
            <div className={`h-6 w-40 rounded ${skeletonAnimationClassname}`} />
            <div
              className={`h-5 w-16 rounded-full ${skeletonAnimationClassname}`}
            />
          </div>

          {/* ADDRESS + INFO */}
          <div className="mt-2 flex items-center gap-6">
            <div className={`h-4 w-48 rounded ${skeletonAnimationClassname}`} />
            <div className={`h-4 w-32 rounded ${skeletonAnimationClassname}`} />
          </div>

          {/* STARS */}
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded ${skeletonAnimationClassname}`}
              />
            ))}
            <div className={`h-4 w-8 rounded ${skeletonAnimationClassname}`} />
          </div>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="flex items-center gap-3">
        <div
          className={`h-10 w-10 rounded-full ${skeletonAnimationClassname}`}
        />
        <div
          className={`h-10 w-10 rounded-full ${skeletonAnimationClassname}`}
        />
      </div>
    </section>
  );
};
