import AnimatedSection from "@/components/ui/animated-section";
import { QuestionSection } from "@/components/questions/QuestionsSection";

const Questions = () => {
  return (
    <section>
      <AnimatedSection variant="up" duration={0.6}>
        <QuestionSection />
      </AnimatedSection>
    </section>
  );
};

export default Questions;
