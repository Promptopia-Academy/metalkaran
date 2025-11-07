import About from "@/components/about/About";
import Badges from "@/components/badges/Badges";
import Cards from "@/components/cards/Cards";
import CarouselHero from "@/components/carousel/Carousel";
import CategoryGrid from "@/components/categories/Categories";
import CallSection from "@/components/call-us/CallSection";
import FormSection from "@/components/form/FormSection";
import IndustriesCarousel from "@/components/feature/Feature";
import Footer from "@/components/footer/Footer";
import AnimatedSection from "@/components/ui/animated-section";

export default function Home() {
  return (
    <main>
      {/* carousel */}
      <AnimatedSection className="px-32 mt-20" variant="down" duration={0.6}>
        <CarouselHero />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <Badges />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <Cards />
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <CategoryGrid />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <About />
      </AnimatedSection>

      <AnimatedSection delay={0.15} variant="scale">
        <IndustriesCarousel />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FormSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CallSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1} variant="fade">
        <Footer />
      </AnimatedSection>
    </main>
  );
}
