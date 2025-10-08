import Badges from "@/components/badges/Badges";
import CarouselHero from "@/components/carousel/Carousel";

export default function Home() {
  return (
    <main>
      {/* carousel */}
      <section className="px-32 mt-20">
        <CarouselHero />
      </section>
      <Badges />
    </main>
  );
}
