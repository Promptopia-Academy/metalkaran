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

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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

        <Button
          type="submit"
          className="flex items-center justify-center cursor-pointer text-base rounded-2xl font-normal w-24 sm:w-36 bg-[#1E78AA] hover:bg-[#2B517E] transition-all duration-300"
        >
          ارسال
        </Button>
      </form>
    </Form>
  );
}
