import AnimatedSection from "@/components/ui/animated-section";
import { QuestionSection } from "@/components/questions/QuestionsSection";
import { getQuestions } from "@/lib/dev/getData";


export default async function QuestionsPage() {
  const questions = await getQuestions();

  return (
    <section className="py-8 md:py-12 pb-16 md:pb-24">
      {questions && (
        <AnimatedSection variant="up" duration={0.6}>
          <QuestionSection questions={questions} title="سوالات متداول" />
        </AnimatedSection>
      )}
    </section>
  );
}
