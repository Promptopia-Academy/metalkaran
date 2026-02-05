import WhyUs from "@/components/about-us/whay-us/WhyUs";
import AnimatedSection from "@/components/ui/animated-section";
import AboutUsDes from "@/components/about-us/description/AboutUsDes";
import AboutUsCardsDiv from "@/components/about-us/cards/AboutUsCardsDiv";

const page = () => {
  return (
    <div className="px-24 py-10 flex flex-col justify-center items-center gap-10">
      <AnimatedSection variant="down">
        <AboutUsCardsDiv />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <AboutUsDes />
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <WhyUs />
      </AnimatedSection>
    </div>
  );
};

export default page;
