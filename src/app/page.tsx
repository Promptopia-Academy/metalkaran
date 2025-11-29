import About from "@/components/about/About";
import Badges from "@/components/badges/Badges";
import Cards from "@/components/cards/Cards";
import CarouselHero from "@/components/carousel/Carousel";
import CategoryGrid from "@/components/categories/Categories";

export default function Home() {
  return (
    <main>
      {/* carousel */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-32 mt-8 md:mt-12 lg:mt-20">
        <CarouselHero />
      </section>
      <Badges />
      <Cards />
      <CategoryGrid />
      <About />
    </main>
  );
}
