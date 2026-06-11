"use client";
import type { IQuestion, IQuestionSectionProps } from "@/types/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { getQuestions } from "@/lib/dev/getData";

export function QuestionSection({
  title = "سوالات متداول",
}: IQuestionSectionProps) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try {
      setLoading(true);
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در دریافت سوالات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <div className="min-h-0 mt-10 px-4 sm:px-6 md:px-28 pb-8">
      <div className="text-center pt-3">
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-6 justify-center items-center py-10 sm:flex-row sm:flex-wrap"
      >
        {questions?.map((item) => (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="flex flex-col bg-white rounded-2xl gap-4"
          >
            <div className="bg-[#1E78AA] flex justify-center items-center rounded-2xl text-white w-[380px]">
              <AccordionTrigger>{item.question}</AccordionTrigger>
            </div>
            <div className="bg-white text-center w-[380px] rounded-2xl">
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
