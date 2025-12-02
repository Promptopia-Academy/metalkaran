import { Suspense, lazy } from "react";
import {
  CarouselSkeleton,
  BadgesSkeleton,
  CardsSkeleton,
  CategoriesSkeleton,
  AboutSkeleton,
} from "@/components/ui/skeletons";

// Lazy load all components
const CarouselHero = lazy(() => import("@/components/carousel/Carousel"));
const Badges = lazy(() => import("@/components/badges/Badges"));
const Cards = lazy(() => import("@/components/cards/Cards"));
const CategoryGrid = lazy(() => import("@/components/categories/Categories"));
const About = lazy(() => import("@/components/about/About"));

export default function Home() {
  return (
    <main>
      {/* carousel */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 mt-8 md:mt-12 lg:mt-20">
        <Suspense fallback={<CarouselSkeleton />}>
          <CarouselHero />
        </Suspense>
      </section>

      <Suspense fallback={<BadgesSkeleton />}>
        <Badges />
      </Suspense>

      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoryGrid />
      </Suspense>

      <Suspense fallback={<AboutSkeleton />}>
        <About />
      </Suspense>
    </main>
  );
}
