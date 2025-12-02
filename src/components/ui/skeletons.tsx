import { Skeleton } from "./skeleton";

// Carousel Skeleton
export function CarouselSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-[300px] md:h-[480px] rounded-xl md:rounded-2xl" />
    </div>
  );
}

// Badges Skeleton
export function BadgesSkeleton() {
  return (
    <section className="mt-12 md:mt-20 lg:mt-32 px-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 xl:gap-40">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 md:gap-3 items-center">
            <Skeleton className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}

// Cards Skeleton
export function CardsSkeleton() {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20 w-full px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="flex gap-3 md:gap-4 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 basis-[85%] sm:basis-[70%] md:basis-[45%] lg:basis-[35%] xl:basis-[16rem]"
          >
            <div className="bg-card rounded-xl md:rounded-2xl overflow-hidden">
              <Skeleton className="h-48 md:h-56 lg:h-60 w-full" />
              <div className="p-3 md:p-4 space-y-2">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
                <Skeleton className="h-9 w-32 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Categories Skeleton
export function CategoriesSkeleton() {
  return (
    <section className="py-8 md:py-12 min-h-[60vh] md:min-h-[80vh] px-4">
      <Skeleton className="h-8 md:h-10 lg:h-12 w-64 mx-auto mb-6 md:mb-8" />
      <div className="container mx-auto flex flex-wrap justify-center relative p-2 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-x-14 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-center">
              <Skeleton className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-2xl" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-x-14 -mt-4 md:-mt-8 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-center">
              <Skeleton className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Skeleton
export function AboutSkeleton() {
  return (
    <section className="bg-[url('/images/about-bg.jpg')] bg-cover bg-center w-full min-h-[60vh] md:h-[80vh] relative">
      <div className="w-full h-full bg-[#18304ce5] py-8 md:py-12 lg:py-20 flex justify-center items-center">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col lg:flex-row justify-between gap-8 lg:gap-6 xl:gap-8 w-full max-w-7xl">
          <div className="w-full lg:w-[40%] flex flex-col gap-6 md:gap-10 lg:gap-14">
            <Skeleton className="h-8 md:h-10 lg:h-12 w-full" />
            <Skeleton className="h-0.5 w-full" />
            <Skeleton className="h-9 md:h-7 w-32" />
          </div>
          <div className="w-full lg:w-[40%] flex flex-col gap-4 md:gap-6">
            <Skeleton className="h-6 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-0.5 w-[80%] mx-auto" />
            <Skeleton className="h-6 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-20 md:h-24 lg:h-32 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

