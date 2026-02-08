import { QUESTION_ITEMS } from "@/lib/constants";
import type { IQuestionSectionProps } from "@/types/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function QuestionSection({
  questions = QUESTION_ITEMS,
  title = "سوالات متداول",
}: IQuestionSectionProps) {
  return (
    <div className="h-96 mt-10 md:px-28">
      <div className="text-center pt-3">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-6 justify-center items-center py-10 sm:flex-row sm:flex-wrap"
      >
        {questions.map((item) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="flex flex-col bg-white rounded-2xl gap-4"
          >
            <div className="bg-[#1E78AA] flex justify-center items-center rounded-2xl text-white w-64 sm:w-[400px]">
              <AccordionTrigger>{item.question}</AccordionTrigger>
            </div>
            <div className="bg-white text-center w-64 sm:w-[400px] rounded-2xl">
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="mt-1">{item.answer}</p>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
