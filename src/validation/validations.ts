import z from "zod";

export const formSchema = z.object({
  name: z.string().min(5, { message: "نام باید حداقل 5 کاراکتر باشد." }),
  phone: z.string().min(10, { message: "شماره تماس معتبر وارد کنید." }),
  email: z.string().email({ message: "ایمیل معتبر وارد کنید." }),
  company: z.string().min(2, { message: "نام شرکت الزامی است." }),
});

export const articleSchema = z.object({
  image: z.string().url({ message: "آدرس تصویر معتبر نیست." }).optional(),
  title: z.string().min(3, { message: "عنوان باید حداقل 3 کاراکتر باشد." }),
  introduction: z
    .string()
    .min(10, { message: "معرفی باید حداقل 10 کاراکتر باشد." }),
  title1: z.string().min(1, { message: "عنوان 1 الزامی است." }),
  content1: z.string().min(1, { message: "محتوا 1 الزامی است." }),
  title2: z.string().optional(),
  content2: z.string().optional(),
  title3: z.string().optional(),
  content3: z.string().optional(),
  title4: z.string().optional(),
  content4: z.string().optional(),
  title5: z.string().optional(),
  content5: z.string().optional(),
  sources: z.string().optional(),
});

export const articleUpdateSchema = articleSchema.partial();

export const elementSchema = z.object({
  image: z.string().url({ message: "آدرس تصویر معتبر نیست." }).optional(),
  title: z.string().min(3, { message: "عنوان باید حداقل 3 کاراکتر باشد." }),
  introduction: z
    .string()
    .min(10, { message: "معرفی باید حداقل 10 کاراکتر باشد." }),
  usage: z.string().min(1, { message: "کاربرد الزامی است." }),
  standards: z.string().optional(),
  chemicalComposition: z.string().optional(),
  physicalProperties: z.string().optional(),
  thermalExpansion: z.string().optional(),
  corrosionResistance: z.string().optional(),
  heatResistance: z.string().optional(),
  manufacturing: z.string().optional(),
  hotForming: z.string().optional(),
  coldForming: z.string().optional(),
  welding: z.string().optional(),
  machining: z.string().optional(),
});

export const elementUpdateSchema = elementSchema.partial();

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Search/Filter schema
export const searchSchema = z.object({
  q: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
});
