import About from "@/components/about/About";
import Cards from "@/components/cards/Cards";
import Badges from "@/components/badges/Badges";
import FormSection from "@/components/form/FormSection";
import CarouselHero from "@/components/carousel/Carousel";
import CallSection from "@/components/call-us/CallSection";
import Calculator from "@/components/calculator/Calculator";
import CategoryGrid from "@/components/categories/Categories";
import IndustriesCarousel from "@/components/feature/Feature";
import AnimatedSection from "@/components/ui/animated-section";
import { getCategoriesForSite } from "@/lib/cms/categoryApi";
import { getSiteWebsiteContent } from "@/lib/cms/pageApi";
import { getProductsForSite } from "@/lib/cms/producstsApi";

export default async function Home() {
  const [categories, siteContent, productsRes] = await Promise.all([
    getCategoriesForSite(),
    getSiteWebsiteContent(),
    getProductsForSite({ limit: 20 }),
  ]);
  const products = productsRes.success ? productsRes.data : [];
  return (
    <section>
      <AnimatedSection
        className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 mt-10 md:mt-20"
        variant="down"
        duration={0.6}
      >
        <CarouselHero heroSection={siteContent?.heroSection} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <Badges />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <Cards products={products} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <CategoryGrid categories={categories} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <Calculator categories={categories} products={products} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <About homePageAbout={siteContent?.homePageAbout} />
      </AnimatedSection>

      <AnimatedSection delay={0.05} variant="scale">
        <IndustriesCarousel
          industriesCarousel={siteContent?.industriesCarousel}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <FormSection contactUsPageData={siteContent?.contactUsPageData} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <CallSection companyInfo={siteContent?.companyInformation} />
      </AnimatedSection>
    </section>
  );
}
