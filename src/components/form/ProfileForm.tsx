"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/validation/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({
          type: "success",
          text: "پیام شما با موفقیت ارسال شد! ما در اسرع وقت با شما تماس خواهیم گرفت.",
        });
        form.reset();
      } else {
        // بررسی Rate Limit
        if (response.status === 429) {
          setSubmitMessage({
            type: "error",
            text: data.message || "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید.",
          });
        } else {
          setSubmitMessage({
            type: "error",
            text: data.message || "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
          });
        }
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
        dir="rtl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="علیدوست"
                  {...field}
                  className="w-[250px] sm:w-[400px] h-11 rounded-2xl border-2 border-black pr-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="09123456789"
                  {...field}
                  className="w-[250px] sm:w-[400px] h-11 rounded-2xl border-2 border-black pr-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  className="w-[250px] sm:w-[400px] h-11 rounded-2xl border-2 border-black pr-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="شرکت متال‌کاران"
                  {...field}
                  className="w-[250px] sm:w-[400px] h-11 rounded-2xl border-2 border-black pr-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* پیام موفقیت/خطا */}
        {submitMessage && (
          <div
            className={`w-[250px] sm:w-[400px] p-3 rounded-2xl text-sm ${
              submitMessage.type === "success"
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : "bg-red-100 text-red-800 border-2 border-red-300"
            }`}
            dir="rtl"
          >
            {submitMessage.text}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-lg font-medium flex items-center justify-center cursor-pointer rounded-2xl w-24 sm:w-36 bg-[#1E78AA] hover:bg-[#2B517E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال"}
        </Button>
      </form>
    </Form>
  );
}
