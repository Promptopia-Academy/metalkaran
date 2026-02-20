"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/cms/pageApi";
import type { IQuestion } from "@/types/type";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getQuestions()
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setQuestions(arr as IQuestion[]);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">سوالات متداول</h1>
        <p className="text-muted-foreground">
          لیست سوالات متداول نمایش داده شده در سایت (محتوا از API بارگذاری می‌شود)
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            سوالی ثبت نشده
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>لیست سوالات ({questions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="border rounded-lg p-4 space-y-2"
                  dir="rtl"
                >
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
