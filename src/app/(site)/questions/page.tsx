import AnimatedSection from "@/components/ui/animated-section";
import { QuestionSection } from "@/components/questions/QuestionsSection";
import { getQuestions } from "@/lib/dev/getData";
import { IQuestion } from "@/types/type";

export default async function QuestionsPage() {


  return (
    <section className="py-8 md:py-12 pb-16 md:pb-24">
     
        <AnimatedSection variant="up" duration={0.6}>
          <QuestionSection  title="سوالات متداول" />
        </AnimatedSection>
      
    </section>
  );
}
