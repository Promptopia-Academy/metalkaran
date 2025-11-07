import Footer from "@/components/footer/Footer";
import { QuestionSection } from "@/components/questions/QuestionsSection";
import AnimatedSection from "@/components/ui/animated-section";
import React from "react";

const Questions = () => {
  return (
    <div>
      <AnimatedSection variant="up" duration={0.6}>
        <QuestionSection />
      </AnimatedSection>
      <AnimatedSection delay={0.1} variant="fade">
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Questions;
