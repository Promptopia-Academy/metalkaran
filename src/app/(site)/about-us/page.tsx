import WhyUs from "@/components/about-us/whay-us/WhyUs";
import AnimatedSection from "@/components/ui/animated-section";
import AboutUsDes from "@/components/about-us/description/AboutUsDes";
import AboutUsCardsDiv from "@/components/about-us/cards/AboutUsCardsDiv";
import { getSiteAboutUs } from "@/lib/cms/pageApi";
import type { IAboutUsPageData } from "@/types/type";

export default async function AboutUsPage() {
  const aboutUsData = (await getSiteAboutUs()) as IAboutUsPageData | null;

  return (
    <div className="px-24 py-10 flex flex-col justify-center items-center gap-10">
      <AnimatedSection variant="down">
        <AboutUsCardsDiv aboutUsPageData={aboutUsData} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <AboutUsDes aboutUsPageData={aboutUsData} />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <WhyUs aboutUsPageData={aboutUsData} />
      </AnimatedSection>
    </div>
  );
}
