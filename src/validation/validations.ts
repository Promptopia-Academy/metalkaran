import z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "نام باید حداقل 5 کاراکتر باشد." }),
  phone: z.string().min(10, { message: "شماره تماس معتبر وارد کنید." }),
  email: z.string().email({ message: "ایمیل معتبر وارد کنید." }),
  company: z.string().min(2, { message: "نام شرکت الزامی است." }),
});
