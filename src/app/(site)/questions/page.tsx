import AnimatedSection from "@/components/ui/animated-section";
import { QuestionSection } from "@/components/questions/QuestionsSection";

const Questions = () => {
  return (
    <section className="py-8 md:py-12 pb-16 md:pb-24">
      <AnimatedSection variant="up" duration={0.6}>
        <QuestionSection />
      </AnimatedSection>
    </section>
  );
};

export default Questions;
