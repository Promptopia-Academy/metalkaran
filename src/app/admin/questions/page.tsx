"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/cms/pageApi";
import type { IQuestion } from "@/types/type";
import { Plus, Pencil, Trash2 } from "lucide-react";

const textareaClass =
  "w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const load = () => {
    api
      .getQuestions()
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setQuestions(arr as IQuestion[]);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("سوال و پاسخ را پر کنید");
      return;
    }
    setSaving(true);
    try {
      await api.createQuestion({ question: newQuestion.trim(), answer: newAnswer.trim() });
      setNewQuestion("");
      setNewAnswer("");
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (q: IQuestion) => {
    setEditingId(q.id);
    setEditQuestion(q.question);
    setEditAnswer(q.answer);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null || !editQuestion.trim() || !editAnswer.trim()) return;
    setSaving(true);
    try {
      await api.updateQuestion(editingId, { question: editQuestion.trim(), answer: editAnswer.trim() });
      cancelEdit();
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در ویرایش");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("حذف این سوال؟")) return;
    setSaving(true);
    try {
      await api.deleteQuestion(id);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "خطا در حذف");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold mb-2">سوالات متداول</h1>
        <p className="text-muted-foreground">
          افزودن، ویرایش و حذف سوالات متداول نمایش داده شده در سایت
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            افزودن سوال جدید
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label>سوال</Label>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="متن سوال"
                required
              />
            </div>
            <div>
              <Label>پاسخ</Label>
              <textarea
                className={textareaClass}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="متن پاسخ"
                required
              />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? "در حال ذخیره..." : "ذخیره"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            سوالی ثبت نشده. با فرم بالا یک سوال اضافه کنید.
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
                <div key={q.id} className="border rounded-lg p-4 space-y-2">
                  {editingId === q.id ? (
                    <form onSubmit={handleUpdate} className="space-y-3">
                      <Input
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        placeholder="سوال"
                        required
                      />
                      <textarea
                        className={textareaClass}
                        value={editAnswer}
                        onChange={(e) => setEditAnswer(e.target.value)}
                        placeholder="پاسخ"
                        required
                      />
                      <div className="flex gap-2">
                        <Button type="submit" size="sm" disabled={saving}>
                          ذخیره
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                          انصراف
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {q.answer}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(q)}
                        >
                          <Pencil className="w-4 h-4 ml-1" />
                          ویرایش
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDelete(q.id)}
                          disabled={saving}
                        >
                          <Trash2 className="w-4 h-4 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
