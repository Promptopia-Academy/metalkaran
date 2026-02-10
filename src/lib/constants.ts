import { Box, FileText, Home, MessageSquare, Settings } from "lucide-react";
import type { IArticle, ICategory, IMechanicalProperties, IPhysicalProperties, IProduct, IQuestion, IUsage } from "@/types/type";

export const CHEMICAL_COLORS = [
  "#AC0C0C",
  "#000000",
  "#238D8D",
  "#AD9B14",
  "#1E78AA",
  "#2C5D3F",
  "#9d4edd",
  "#f28482",
] as const;

export const FORM_MAIN_PARAPH =
  "ما از تمام سوالات مشتریان استقبال می‌کنیم و اگر در مورد راه‌حل‌ها و خدمات فویل‌های نوارهای دقیق ما سؤالی دارید، لطفاً از طریق فرم تماس زیر با ما تماس بگیرید.ما در اسرع وقت به شما پاسخ خواهیم داد.";

export const FORM_SUB_PARAPH =
  "همکاران ما در اسرع وقت با شما تماس خواهند گرفت.";

export const PHONE_NUMBER = "09123456789";

export const EMAIL_ADDRESS = "sh.abbasi7527@gmail.com";

export const ABOUT_US_CARDS = [
  {
    id: 1,
    image: "/images/about-us1.png",
    title: "رویکرد مشتری محور",
  },
  {
    id: 2,
    image: "/images/about-us2.png",
    title: "تمرکز بر صنعت",
  },
  {
    id: 3,
    image: "/images/about-us3.png",
    title: "کیفیت بی‌نظیر",
  },
];

export const WHY_US = {
  title: "چرا ما را انتخاب کنید",
  description:
    "تمرکز بر صنعت نوارهای فولادی ضد زنگ تولید نوارهای فولادی ضد زنگ با کیفیت، از نوارهای فولادی ضد زنگ 304 با کیفیت بالا گرفته تا تولید و ارائه نوارهای فولادی ضد زنگ سوپر آستنیتی 904L دقیق، اینجا جای درستی آمده‌اید.",
};

export const ABOUT_US_DESCRIPTION = [
  {
    id: 1,
    image: "/images/about-des.png",
    alt: "توضیحات درباره ما",
    width: 580,
    height: 400,
    title: "رویکرد مشتری محور",
    contentClassName: "flex flex-col items-end gap-5",
    description:
      "برای ارائه محصولات نوار فولادی با کیفیت خوب به مشتریان، راهکارهای کامل و خدمات کامل که به هر پروژه صنعتی اجازه می‌دهد روان‌تر، ایمن‌تر و کارآمدتر اجرا شود.",
  },
  {
    id: 2,
    image: "/images/about-des.png",
    alt: "توضیحات درباره ما",
    width: 580,
    height: 730,
    title: "کیفیت بی نظیر",
    contentClassName: "flex flex-col justify-end items-end gap-5",
    description:
      "روحیه شرکت ما این است که ایمنی پایه و اساس تولید است و کیفیت، مشتریان را می‌سازد. ما بیشتر به پشتیبانی کیفیت، دامنه تأمین، بازرسی، استاندارد آزمایش، بسته‌بندی حمل و نقل، خدمات پس از فروش توجه می‌کنیم. مواد اولیه آسیابی با کیفیت بالا، سنگ بنای تولید نوارهای با بالاترین کیفیت است. ما فقط کویل‌های مادر با کیفیت بالا را خریداری می‌کنیم و مطمئن می‌شویم که تمام موادی که استفاده می‌کنیم مطابق با استانداردهای کارخانه ما باشد.",
  },
];

export const NAV_LINKS = [
  { href: "/products", label: "محصولات" },
  { href: "/articles", label: "مقالات" },
  { href: "/questions", label: "سوالات متداول" },
  { href: "/about-us", label: "درباره ما" },
  { href: "/contact-us", label: "تماس با ما" },
];

export const INDUSTRIES_CAROUSEL = [
  { id: 1, image: "/images/industry-oil.jpg", title: "صنعت نفت و گاز" },
  { id: 2, image: "/images/industry-tech.jpg", title: "الکترونیک و فناوری" },
  { id: 3, image: "/images/industry-auto.jpg", title: "خودروسازی" },
  { id: 4, image: "/images/industry-jet.jpg", title: "خودروسازی" },
  { id: 5, image: "/images/industry-jet.jpg", title: "خودروسازی" },
];

export const CATEGORIES_ARRAY: ICategory[] = [
  { id: 1, image: "/images/aluminum_profile.png", slug: "aluminum-profiles", title: "آلومینیوم پروفایل" },
  { id: 2, image: "/images/metal_coils.png", slug: "metal-coils", title: "متال کویل" },
  { id: 3, image: "/images/steel_sheets.png", slug: "steel-sheets", title: "صلب پیچ" },
  { id: 4, image: "/images/platinum_ingots.png", slug: "platinum-ingots", title: "بلورهای پلاتین" },
  { id: 5, image: "/images/aluminum_sheets.png", slug: "aluminum-sheets", title: "صلب صفحه ای" },
  { id: 6, image: "/images/tin_alloy.png", slug: "tin-alloys", title: "تین آلای" },
  { id: 7, image: "/images/ingots.png", slug: "ingots", title: "بلورهای فلزی" },
];

export const CAROUSEL_IMAGES = [
  {
    slug: 1,
    src: "/carousel-img/img-1.jpg",
    alt: "Carousel Image 1",
    size: { width: 882, height: 480 },
    basis: "lg:basis-7/10",
  },
  {
    slug: 2,
    src: "/carousel-img/img-2.jpg",
    alt: "Carousel Image 2",
    size: { width: 278, height: 480 },
    basis: "lg:basis-3/13",
  },
  {
    slug: 3,
    src: "/carousel-img/img-3.jpg",
    alt: "Carousel Image 3",
    size: { width: 278, height: 480 },
    basis: "lg:basis-3/10",
  },
];

export const ABOUT_ARRAY = {
  title:
    "تنها جایی که می‌توانید راه‌حل‌های ایده‌آل برای نوار فلزی برای تمام نیازهای صنعتی خود را دریافت کنید.",
  detail:
    "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
  extraTitle: "فویل‌های استیل ضد زنگ",
  extraDetail: `فویل‌های استیل ضد زنگ خواسته‌های شما، پیگیری ما.درجه و ضخامت را می‌توان طبق درخواست شما سفارشی کرد.`,
};

export const ADMIN_MENU_ITEMS = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: Home,
  },
  {
    title: "مقالات",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    title: "المنت‌ها",
    href: "/admin/elements",
    icon: Box,
  },
  {
    title: "پیام‌های تماس",
    href: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];

export const ARTICLE_ITEMS: IArticle[] = [
  {
    id: 1,
    title: "صنعت نفت و گاز",
    introduction:
      "صنعت نفت و گاز یکی از بزرگترین مصرف‌کنندگان نوارها و لوله‌های فولادی ضد زنگ است. هر ساله حجم بالایی از گریدهای استنلس استیل برای خطوط لوله، مخازن و تجهیزات فرآوری در این صنعت استفاده می‌شود.",
    title1: "صنعت نفت و گاز",
    content1:
      "صنعت نفت و گاز یکی از بزرگترین مصرف‌کنندگان نوارها و لوله‌های فولادی ضد زنگ است. هر ساله حجم بالایی از گریدهای استنلس استیل برای خطوط لوله، مخازن و تجهیزات فرآوری در این صنعت استفاده می‌شود. کیفیت و مقاومت در برابر خوردگی از الزامات اصلی این بخش است.",
    image: "/images/articles.png",
  },
  {
    id: 2,
    title: "نوارهای فولادی ضد زنگ در خودروسازی",
    introduction:
      "در صنعت خودروسازی از نوارهای استیل ضد زنگ برای اگزوز، سیستم‌های ترمز، قطعات موتور و تزئینات داخلی استفاده می‌شود. دقت ابعادی و کیفیت سطح در این کاربردها بسیار حائز اهمیت است.",
    title1: "نوارهای فولادی ضد زنگ در خودروسازی",
    content1:
      "در صنعت خودروسازی از نوارهای استیل ضد زنگ برای اگزوز، سیستم‌های ترمز، قطعات موتور و تزئینات داخلی استفاده می‌شود. دقت ابعادی و کیفیت سطح در این کاربردها بسیار حائز اهمیت است. تامین‌کنندگان ما با استانداردهای بین‌المللی همخوانی کامل دارند.",
    image: "/images/articles.png",
  },
  {
    id: 3,
    title: "کاربرد استنلس استیل در صنایع غذایی",
    introduction:
      "به دلیل مقاومت در برابر خوردگی و قابلیت شست‌وشوی آسان، فولاد ضد زنگ در تجهیزات فرآوری مواد غذایی، خطوط تولید و بسته‌بندی به طور گسترده استفاده می‌شود.",
    title1: "کاربرد استنلس استیل در صنایع غذایی",
    content1:
      "به دلیل مقاومت در برابر خوردگی و قابلیت شست‌وشوی آسان، فولاد ضد زنگ در تجهیزات فرآوری مواد غذایی، خطوط تولید و بسته‌بندی به طور گسترده استفاده می‌شود. گریدهای ۳۰۴ و ۳۱۶ بیشترین کاربرد را در این صنعت دارند.",
    image: "/images/articles.png",
  },
  {
    id: 4,
    title: "مبدل‌های حرارتی و لوله پره‌دار",
    introduction:
      "مبدل‌های حرارتی صنعتی برای تبادل گرما بین سیالات از لوله و نوارهای استیل ضد زنگ استفاده می‌کنند. انتخاب گرید مناسب با توجه به دما و محیط کاری ضروری است.",
    title1: "مبدل‌های حرارتی و لوله پره‌دار",
    content1:
      "مبدل‌های حرارتی صنعتی برای تبادل گرما بین سیالات از لوله و نوارهای استیل ضد زنگ استفاده می‌کنند. انتخاب گرید مناسب با توجه به دما و محیط کاری ضروری است. ما طیف وسیعی از ابعاد و ضخامت‌ها را برای پروژه‌های مختلف ارائه می‌دهیم.",
    image: "/images/articles.png",
  },
  {
    id: 5,
    title: "کنترل کیفیت در تولید نوارهای دقیق",
    introduction:
      "بازرسی صددرصد و آزمایش‌های مکانیکی و متالورژی از مراحل ضروری در تولید نوارهای فولادی با تلرانس دقیق است. گواهی تست کارخانه برای هر محموله صادر می‌شود.",
    title1: "کنترل کیفیت در تولید نوارهای دقیق",
    content1:
      "بازرسی صددرصد و آزمایش‌های مکانیکی و متالورژی از مراحل ضروری در تولید نوارهای فولادی با تلرانس دقیق است. گواهی تست کارخانه برای هر محموله صادر می‌شود. تجهیزات اندازه‌گیری پیشرفته دقت ابعادی را تضمین می‌کنند.",
    image: "/images/articles.png",
  },
  {
    id: 6,
    title: "گریدهای متداول استنلس استیل",
    introduction:
      "گریدهای ۳۰۴، ۳۱۶، ۳۱۶ال و ۳۲۱ از پرکاربردترین انواع فولاد ضد زنگ در صنعت هستند. هر گرید با توجه به مقاومت خوردگی و شرایط کاری انتخاب می‌شود.",
    title1: "گریدهای متداول استنلس استیل",
    content1:
      "گریدهای ۳۰۴، ۳۱۶، ۳۱۶ال و ۳۲۱ از پرکاربردترین انواع فولاد ضد زنگ در صنعت هستند. هر گرید با توجه به مقاومت خوردگی و شرایط کاری انتخاب می‌شود. مشاوره فنی برای انتخاب بهینه در اختیار مشتریان قرار می‌گیرد.",
    image: "/images/articles.png",
  },
  {
    id: 7,
    title: "صنعت داروسازی و استانداردهای بهداشتی",
    introduction:
      "در صنعت داروسازی و تجهیزات پزشکی، سطح تمیز و بدون درز فولاد ضد زنگ و انطباق با استانداردهای GMP از الزامات اساسی است.",
    title1: "صنعت داروسازی و استانداردهای بهداشتی",
    content1:
      "در صنعت داروسازی و تجهیزات پزشکی، سطح تمیز و بدون درز فولاد ضد زنگ و انطباق با استانداردهای GMP از الزامات اساسی است. محصولات ما در گریدهای مناسب برای این صنایع عرضه می‌شوند.",
    image: "/images/articles.png",
  },
  {
    id: 8,
    title: "کاربردهای صنعت نفت و گاز",
    introduction: "",
    title1: "کاربردهای صنعت نفت و گاز",
    content1: "",
    applicationTitle: "کاربردهای صنعت نفت و گاز",
    application: [
      { id: 1, slug: "stainless-belt", faTitle: "تسمه و سگک نواری استیل ضد زنگ", description: "" },
      { id: 2, slug: "welded-pipe", faTitle: "لوله جوش داده شده از جنس استنلس استیل", description: "" },
      { id: 3, slug: "flexible-hose", faTitle: "شیلنگ و لوله راه راه انعطاف پذیر از جنس استنلس استیل", description: "" },
      { id: 4, slug: "pall-ring", faTitle: "حلقه پال بسته بندی تصادفی برج", description: "" },
      { id: 5, slug: "heat-exchanger", faTitle: "لوله پره دار مبدل حرارتی صنعتی", description: "" },
      { id: 6, slug: "others", faTitle: "دیگران", description: "" },
    ],
    image: "/images/articles.png",
  },
];

export const PRODUCT_DETAIL_MOCK: Record<number, IProduct> = {
  1: {
    id: 1,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ UNS N08904",
    slug: "uns-n08904",
    category: CATEGORIES_ARRAY[2],
    introduction: "نوار فولادی ضد زنگ UNS N08904 با مقاومت بالا در برابر خوردگی و حرارت، مناسب برای صنایع نفت و گاز و پتروشیمی.",
    usage: [
      { id: "u1-1", title: "صنعت نفت و گاز", image: "/images/industry-oil.jpg" },
      { id: "u1-2", title: "پتروشیمی", image: "/carousel-img/image-1.png" },
      { id: "u1-3", title: "خطوط لوله و مخازن تحت فشار", image: "/images/industry-tech.jpg" },
    ] as IUsage[],
    standards: "ASTM A240, ASME SB-625",
    chemicalComposition: [
      { id: 1, title: "کروم", value: "19-23%", slug: "chrome" },
      { id: 2, title: "نیکل", value: "23-28%", slug: "nickel" },
      { id: 3, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 4, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 5, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 6, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 7, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 8, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
      { id: 9, title: "مولیبدن", value: "4-5%", slug: "molybdenum" },
    ],
    description: "نوار فولادی ضد زنگ UNS N08904 با مقاومت بالا در برابر خوردگی و حرارت، مناسب برای صنایع نفت و گاز و پتروشیمی.",
    mechanicalProperties: {
      hardness: "حداکثر ۹۰ HRB",
      elasticModulus: "۱۹۵ GPa",
      elongation: "حداقل ۳۵٪",
      yieldStrength: "حداقل ۲۲۰ MPa",
      tensileStrength: "حداقل ۵۰۰ MPa",
    },
    physicalProperties: {
      density: "۸٫۰۴ g/cm³",
      electricalResistivity: "۰٫۹۵ Ω·mm²/m",
      meltingPoint: "۱۳۵۰-۱۴۰۰ °C",
      molarHeatCapacity: "۵۰۰ J/(kg·K)",
    },
    thermalExpansion: "۱۴٫۹ μm/(m·K)",
    corrosionResistance: "مقاومت عالی در برابر خوردگی در محیط‌های کلریدی و اسیدی",
    heatResistance: "مقاوم تا ۹۰۰ درجه سانتی‌گراد",
    manufacturing: "نورد سرد و گرم، آنیل",
    hotForming: "۱۰۰۰-۱۱۵۰ °C",
    coldForming: "قابل انجام با آنیل میانی",
    welding: "جوش قوس الکتریکی، TIG، MIG",
    machining: "قابل ماشینکاری با سرعت متوسط",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  2: {
    id: 2,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ۳۰۴",
    slug: "304",
    description: "نوار فولادی ۳۰۴ با مقاومت خوب در برابر خوردگی.",
    category: CATEGORIES_ARRAY[2],
    introduction: "نوار فولادی ضد زنگ ۳۰۴ پرکاربردترین گرید استنلس استیل با مقاومت خوب در برابر خوردگی.",
    usage: [
      { id: "u2-1", title: "صنایع غذایی", image: "/carousel-img/image-1.png" },
      { id: "u2-2", title: "دارویی و آشپزخانه", image: "/images/industry-tech.jpg" },
      { id: "u2-3", title: "تزئینات", image: "/images/industry-auto.jpg" },
    ] as IUsage[],
    standards: "ASTM A240, EN 10088",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  3: {
    id: 3,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ۳۱۶",
    slug: "316",
    description: "نوار فولادی ۳۱۶ با افزودن مولیبدن، مقاومت بالاتر در محیط‌های خورنده.",
    category: CATEGORIES_ARRAY[2],
    introduction: "نوار فولادی ضد زنگ ۳۱۶ با افزودن مولیبدن، مقاومت بالاتر در محیط‌های خورنده.",
    usage: [
      { id: "u3-1", title: "صنایع دریایی", image: "/carousel-img/image-1.png" },
      { id: "u3-2", title: "شیمیایی و داروسازی", image: "/images/industry-tech.jpg" },
    ] as IUsage[],
    standards: "ASTM A240, EN 10088",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  4: {
    id: 4,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ۳۱۶ال",
    slug: "316l",
    description: "نوار فولادی ۳۱۶ال با مقاومت بهتر در جوشکاری.",
    category: CATEGORIES_ARRAY[1],
    introduction: "نسخه کم‌کربن ۳۱۶ با مقاومت بهتر در جوشکاری.",
    usage: [
      { id: "u4-1", title: "مخازن جوشکاری شده", image: "/carousel-img/image-1.png" },
      { id: "u4-2", title: "تجهیزات فرآوری", image: "/images/industry-oil.jpg" },
    ] as IUsage[],
    standards: "ASTM A240",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  5: {
    id: 5,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ۳۲۱",
    slug: "321",
    category: CATEGORIES_ARRAY[0],
    introduction: "نوار فولادی ضد زنگ ۳۲۱ با پایداری بالا در دماهای بالا.",
    usage: [
      { id: "u5-1", title: "اگزوز و مبدل حرارتی", image: "/images/industry-auto.jpg" },
      { id: "u5-2", title: "صنعت هواپیمایی", image: "/images/industry-jet.jpg" },
    ] as IUsage[],
    standards: "ASTM A240",
    description: "نوار فولادی ۴۳۰ با هزینه کمتر، مناسب برای کاربردهای عمومی.",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  6: {
    id: 6,
    description: "نوار فولادی ۴۳۰ با هزینه کمتر، مناسب برای کاربردهای عمومی.",
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ۴۳۰",
    slug: "430",
    category: CATEGORIES_ARRAY[5],
    introduction: "نوار فولادی فرومغناطیسی با هزینه کمتر، مناسب برای کاربردهای عمومی.",
    usage: [
      { id: "u6-1", title: "تزئینات", image: "/carousel-img/image-1.png" },
      { id: "u6-2", title: "لوازم خانگی", image: "/images/industry-tech.jpg" },
      { id: "u6-3", title: "خودروسازی", image: "/images/industry-auto.jpg" },
    ] as IUsage[],
    standards: "ASTM A240",
    createdAt: "2025-01-01T00:00:00.000Z",
  },
};

export const PRODUCT_ITEMS: IProduct[] = Object.values(PRODUCT_DETAIL_MOCK);

export const QUESTION_ITEMS: IQuestion[] = [
  {
    id: 1,
    question: "چگونه می‌توانید کیفیت نوارهای استیل ضد زنگ را تضمین کنید؟",
    answer:
      "اطمینان حاصل کردن از اینکه بازرسی ۱۰۰٪ بر اساس استانداردهای بین‌المللی و مطابق با نیاز مشتری انجام می‌شود. ما تجهیزات بازرسی پیشرفته‌ای داریم که می‌تواند کیفیت بالای نوارهای فولادی ضد زنگ نهایی را تضمین کند.",
  },
  {
    id: 2,
    question: "حداقل سفارش برای نوارهای استیل ضد زنگ چقدر است؟",
    answer:
      "حداقل مقدار سفارش بسته به نوع محصول و گرید متفاوت است. برای اطلاع از حداقل سفارش و شرایط تحویل با تیم فروش ما تماس بگیرید.",
  },
  {
    id: 3,
    question: "زمان تحویل معمول سفارشات چقدر است؟",
    answer:
      "زمان تحویل بسته به موجودی و حجم سفارش معمولاً بین ۲ تا ۶ هفته است. برای سفارشات فوری امکان هماهنگی وجود دارد.",
  },
  {
    id: 4,
    question: "آیا گواهی‌نامه‌های کیفیت (MTC) ارائه می‌دهید؟",
    answer:
      "بله، برای تمام محموله‌ها گواهی تست کارخانه (Mill Test Certificate) مطابق استانداردهای بین‌المللی صادر می‌شود.",
  },
  {
    id: 5,
    question: "امکان نمونه‌گیری قبل از سفارش وجود دارد؟",
    answer:
      "بله، برای اکثر محصولات امکان ارسال نمونه برای تأیید کیفیت و ابعاد قبل از ثبت سفارش نهایی وجود دارد.",
  },
  {
    id: 6,
    question: "روش‌های پرداخت و شرایط مالی چگونه است؟",
    answer:
      "پرداخت بر اساس اعتبار اسنادی (LC)، حواله بانکی (TT) و در برخی موارد چک و سفته با هماهنگی قبلی امکان‌پذیر است.",
  },
];

export const MECHANICAL_COLUMNS: { header: string; accessor: keyof IMechanicalProperties }[] = [
  { header: "سختی (HV)", accessor: "hardness" },
  { header: "مدول الاستیک (GPa)", accessor: "elasticModulus" },
  { header: "درصد تغییر طول در 50 میلی‌متر", accessor: "elongation" },
  { header: "استحکام تسلیم (MPa)", accessor: "yieldStrength" },
  { header: "استحکام کششی (MPa)", accessor: "tensileStrength" },
];

export const PHYSICAL_COLUMNS: { header: string; accessor: keyof IPhysicalProperties }[] = [
  { header: "چگالی (g/cm³)", accessor: "density" },
  { header: "مقاومت الکتریکی (µΩ.cm)", accessor: "electricalResistivity" },
  { header: "نقطه ذوب (°C)", accessor: "meltingPoint" },
  { header: "ظرفیت گرمایی ویژه (J/mol.°C)", accessor: "molarHeatCapacity" },
];
