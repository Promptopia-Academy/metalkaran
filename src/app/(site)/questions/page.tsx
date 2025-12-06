import { QuestionSection } from "@/components/questions/QuestionsSection";
import AnimatedSection from "@/components/ui/animated-section";

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
