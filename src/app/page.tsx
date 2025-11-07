import About from "@/components/about/About";
import Badges from "@/components/badges/Badges";
import Cards from "@/components/cards/Cards";
import CarouselHero from "@/components/carousel/Carousel";
import CategoryGrid from "@/components/categories/Categories";
import CallSection from "@/components/call-us/CallSection";
import FormSection from "@/components/form/FormSection";
import IndustriesCarousel from "@/components/feature/Feature";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      {/* carousel */}
      <section className="px-32 mt-20">
        <CarouselHero />
      </section>
      <Badges />
      <Cards />
      <CategoryGrid />
      <About />
      <IndustriesCarousel />
      <FormSection />
      <CallSection />
      <Footer />
    </main>
  );
}
