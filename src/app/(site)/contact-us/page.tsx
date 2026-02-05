import FormSection from "@/components/form/FormSection";
import CallSection from "@/components/call-us/CallSection";
import AnimatedSection from "@/components/ui/animated-section";

const ContactUs = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center py-10">
      <AnimatedSection variant="down">
        <h2 className="text-3xl font-semibold">ارتباط با ما</h2>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
        <FormSection />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <CallSection />
      </AnimatedSection>
    </section>
  );
};

export default ContactUs;
