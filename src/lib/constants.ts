import { Box, FileText, Home, MessageSquare, Settings } from "lucide-react";
import type {
  IAboutUsPageData,
  IArticle,
  ICategory,
  IContactUsPageData,
  IMechanicalProperties,
  IPhysicalProperties,
  IProduct,
  IQuestion,
  IUsage,
} from "@/types/type";
import { parseDensityFromProduct } from "./parseDensityFromProduct";

// ============ PAGES DATA ==============

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

export const PHONE_NUMBER = "09123456789";

export const EMAIL_ADDRESS = "sh.abbasi7527@gmail.com";


export const CONTACT_US_PAGE_DATA: IContactUsPageData = {
  mainParagraph:
    "ما از تمام سوالات مشتریان استقبال می‌کنیم و اگر در مورد راه‌حل‌ها و خدمات فویل‌های نوارهای دقیق ما سؤالی دارید، لطفاً از طریق فرم تماس زیر با ما تماس بگیرید.ما در اسرع وقت به شما پاسخ خواهیم داد.",
  subParagraph: "همکاران ما در اسرع وقت با شما تماس خواهند گرفت.",
};

export const ABOUT_US_PAGE_DATA: IAboutUsPageData = {
  aboutUsCards: [
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
  ],
  whyUs: {
    title: "چرا ما را انتخاب کنید",
    description:
      "تمرکز بر صنعت نوارهای فولادی ضد زنگ تولید نوارهای فولادی ضد زنگ با کیفیت، از نوارهای فولادی ضد زنگ 304 با کیفیت بالا گرفته تا تولید و ارائه نوارهای فولادی ضد زنگ سوپر آستنیتی 904L دقیق، اینجا جای درستی آمده‌اید.",
  },
  aboutUsDescription: [
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
  ],
};

// ============ PAGES CONSTANTS ==============
export const MECHANICAL_COLUMNS: {
  header: string;
  accessor: keyof IMechanicalProperties;
}[] = [
    { header: "سختی (HV)", accessor: "hardness" },
    { header: "مدول الاستیک (GPa)", accessor: "elasticModulus" },
    { header: "درصد تغییر طول در 50 میلی‌متر", accessor: "elongation" },
    { header: "استحکام تسلیم (MPa)", accessor: "yieldStrength" },
    { header: "استحکام کششی (MPa)", accessor: "tensileStrength" },
  ];

export const PHYSICAL_COLUMNS: {
  header: string;
  accessor: keyof IPhysicalProperties;
}[] = [
    { header: "چگالی (g/cm³)", accessor: "density" },
    { header: "مقاومت الکتریکی (µΩ.cm)", accessor: "electricalResistivity" },
    { header: "نقطه ذوب (°C)", accessor: "meltingPoint" },
    { header: "ظرفیت گرمایی ویژه (J/mol.°C)", accessor: "molarHeatCapacity" },
  ];

export const EXTRA_CONTENT_SECTIONS = [
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
  { title: "title4", content: "content4" },
  { title: "title5", content: "content5" },
] as const;

// ============ NAV LINKS ==============
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
  {
    id: 1,
    image: "/images/aluminum_profile.png",
    slug: "aluminum-profiles",
    title: "آلومینیوم پروفایل",
  },
  {
    id: 2,
    image: "/images/metal_coils.png",
    slug: "metal-coils",
    title: "متال کویل",
  },
  {
    id: 3,
    image: "/images/steel_sheets.png",
    slug: "steel-sheets",
    title: "صلب پیچ",
  },
  {
    id: 4,
    image: "/images/platinum_ingots.png",
    slug: "platinum-ingots",
    title: "بلورهای پلاتین",
  },
  {
    id: 5,
    image: "/images/aluminum_sheets.png",
    slug: "aluminum-sheets",
    title: "صلب صفحه ای",
  },
  {
    id: 6,
    image: "/images/tin_alloy.png",
    slug: "tin-alloys",
    title: "تین آلای",
  },
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

// ============ MOCK DATA ==============

export const ARTICLE_ITEMS: IArticle[] = [
  {
    id: 1,
    title: "صنعت نفت و گاز",
    introduction:
      "صنعت نفت و گاز یکی از بزرگترین مصرف‌کنندگان نوارها و لوله‌های فولادی ضد زنگ است. هر ساله حجم بالایی از گریدهای استنلس استیل برای خطوط لوله، مخازن و تجهیزات فرآوری در این صنعت استفاده می‌شود.",
    title1: "صنعت نفت و گاز",
    content1:
      "صنعت نفت و گاز یکی از بزرگترین مصرف‌کنندگان نوارها و لوله‌های فولادی ضد زنگ است. هر ساله حجم بالایی از گریدهای استنلس استیل برای خطوط لوله، مخازن و تجهیزات فرآوری در این صنعت استفاده می‌شود. کیفیت و مقاومت در برابر خوردگی از الزامات اصلی این بخش است.",
    title2: "استانداردهای مورد استفاده",
    content2:
      "در این صنعت رعایت استانداردهای API و NACE برای تجهیزات در معرض خوردگی و محیط‌های سخت ضروری است. گواهی مواد (MTR) برای هر محموله ارائه می‌شود.",
    title3: "گریدهای پیشنهادی",
    content3:
      "گریدهای ۳۱۶، ۳۱۶ال، ۳۱۷ال و آلیاژهای دوبلکس برای خطوط لوله و مخازن تحت فشار در صنعت نفت و گاز توصیه می‌شوند. انتخاب نهایی با توجه به دما و محیط خورنده انجام می‌گیرد.",
    image: "/images/articles.png",
    sources: [
      { id: 1, title: "استاندارد API 5LC", url: "https://www.api.org/" },
      { id: 2, title: "NACE MR0175", url: "https://www.nace.org/" },
    ],
  },
  {
    id: 2,
    title: "نوارهای فولادی ضد زنگ در خودروسازی",
    introduction:
      "در صنعت خودروسازی از نوارهای استیل ضد زنگ برای اگزوز، سیستم‌های ترمز، قطعات موتور و تزئینات داخلی استفاده می‌شود. دقت ابعادی و کیفیت سطح در این کاربردها بسیار حائز اهمیت است.",
    title1: "نوارهای فولادی ضد زنگ در خودروسازی",
    content1:
      "در صنعت خودروسازی از نوارهای استیل ضد زنگ برای اگزوز، سیستم‌های ترمز، قطعات موتور و تزئینات داخلی استفاده می‌شود. دقت ابعادی و کیفیت سطح در این کاربردها بسیار حائز اهمیت است. تامین‌کنندگان ما با استانداردهای بین‌المللی همخوانی کامل دارند.",
    title2: "کاربرد در اگزوز و سیستم اگزوز",
    content2:
      "نوار و ورق استنلس استیل گرید ۴۰۹ و ۴۳۹ در ساخت لوله اگزوز، مافلر و قطعات مرتبط به‌طور گسترده استفاده می‌شود. مقاومت در برابر حرارت و گازهای خورنده از ویژگی‌های کلیدی است.",
    image: "/images/articles.png",
    sources: [
      {
        id: 1,
        title: "ISO 9445 - نوارهای فولادی",
        url: "https://www.iso.org/",
      },
    ],
  },
  {
    id: 3,
    title: "کاربرد استنلس استیل در صنایع غذایی",
    introduction:
      "به دلیل مقاومت در برابر خوردگی و قابلیت شست‌وشوی آسان، فولاد ضد زنگ در تجهیزات فرآوری مواد غذایی، خطوط تولید و بسته‌بندی به طور گسترده استفاده می‌شود.",
    title1: "کاربرد استنلس استیل در صنایع غذایی",
    content1:
      "به دلیل مقاومت در برابر خوردگی و قابلیت شست‌وشوی آسان، فولاد ضد زنگ در تجهیزات فرآوری مواد غذایی، خطوط تولید و بسته‌بندی به طور گسترده استفاده می‌شود. گریدهای ۳۰۴ و ۳۱۶ بیشترین کاربرد را در این صنعت دارند.",
    title2: "سطح تمیز و بهداشتی",
    content2:
      "پرداخت سطح 2B یا BA و در موارد خاص پولیش آینه‌ای برای کاهش تجمع باکتری و شست‌وشوی آسان الزامی است. انطباق با دستورالعمل‌های FDA و EC برای تماس با مواد غذایی رعایت می‌شود.",
    title3: "گرید ۳۰۴ و ۳۱۶",
    content3:
      "گرید ۳۰۴ برای محیط‌های کم‌خورنده و ۳۱۶ برای محیط‌های حاوی کلر یا اسید مناسب‌تر است. گرید ۳۱۶ال در جوشکاری و جلوگیری از حساس‌زدایی ترجیح داده می‌شود.",
    image: "/images/articles.png",
    sources: [
      {
        id: 1,
        title: "FDA - مواد در تماس با غذا",
        url: "https://www.fda.gov/",
      },
      { id: 2, title: "EHEDG Guidelines", url: "https://www.ehedg.org/" },
    ],
  },
  {
    id: 4,
    title: "مبدل‌های حرارتی و لوله پره‌دار",
    introduction:
      "مبدل‌های حرارتی صنعتی برای تبادل گرما بین سیالات از لوله و نوارهای استیل ضد زنگ استفاده می‌کنند. انتخاب گرید مناسب با توجه به دما و محیط کاری ضروری است.",
    title1: "مبدل‌های حرارتی و لوله پره‌دار",
    content1:
      "مبدل‌های حرارتی صنعتی برای تبادل گرما بین سیالات از لوله و نوارهای استیل ضد زنگ استفاده می‌کنند. انتخاب گرید مناسب با توجه به دما و محیط کاری ضروری است. ما طیف وسیعی از ابعاد و ضخامت‌ها را برای پروژه‌های مختلف ارائه می‌دهیم.",
    title2: "انتخاب گرید بر اساس دما",
    content2:
      "برای دماهای معمول تا ۵۵۰ درجه سانتی‌گراد گرید ۳۲۱ یا ۳۴۷ و برای دماهای بالاتر آلیاژهای نیکل‌دار مانند اینکونل پیشنهاد می‌شود. ضخامت دیواره لوله با توجه به فشار طراحی تعیین می‌گردد.",
    title3: "لوله پره‌دار (Finned Tube)",
    content3:
      "نوارهای دقیق استنلس استیل برای پره‌گذاری روی لوله و افزایش سطح تبادل حرارت استفاده می‌شوند. ابعاد پره و فاصله آن با توجه به سیال و میزان رسوب‌گیری طراحی می‌شود.",
    title4: "بازرسی و تست",
    content4:
      "تست هیدرواستاتیک، بازرسی ذرات مغناطیسی و در صورت نیاز تست اولتراسونیک برای اطمینان از یکپارچگی جوش و بدنه انجام می‌گیرد.",
    image: "/images/articles.png",
    sources: [
      { id: 1, title: "ASME BPVC - دیگ و مبدل", url: "https://www.asme.org/" },
    ],
  },
  {
    id: 5,
    title: "کنترل کیفیت در تولید نوارهای دقیق",
    introduction:
      "بازرسی صددرصد و آزمایش‌های مکانیکی و متالورژی از مراحل ضروری در تولید نوارهای فولادی با تلرانس دقیق است. گواهی تست کارخانه برای هر محموله صادر می‌شود.",
    title1: "کنترل کیفیت در تولید نوارهای دقیق",
    content1:
      "بازرسی صددرصد و آزمایش‌های مکانیکی و متالورژی از مراحل ضروری در تولید نوارهای فولادی با تلرانس دقیق است. گواهی تست کارخانه برای هر محموله صادر می‌شود. تجهیزات اندازه‌گیری پیشرفته دقت ابعادی را تضمین می‌کنند.",
    title2: "آزمایش‌های مکانیکی",
    content2:
      "تست کشش، سختی و در صورت درخواست ضربه شارپی برای تعیین خواص مکانیکی انجام می‌شود. نتایج با استاندارد EN یا ASTM مقایسه می‌گردد.",
    title3: "گواهی مواد (MTR)",
    content3:
      "برای هر بچ تولید، گواهی تست کارخانه شامل ترکیب شیمیایی، خواص مکانیکی و نتایج بازرسی صادر می‌شود. امکان صدور گواهی سوم شخص (۳.۱ EN 10204) وجود دارد.",
    image: "/images/articles.png",
    sources: [
      {
        id: 1,
        title: "EN 10204 - گواهی مواد",
        url: "https://www.en-standard.eu/",
      },
      { id: 2, title: "ASTM A240", url: "https://www.astm.org/" },
    ],
  },
  {
    id: 6,
    title: "گریدهای متداول استنلس استیل",
    introduction:
      "گریدهای ۳۰۴، ۳۱۶، ۳۱۶ال و ۳۲۱ از پرکاربردترین انواع فولاد ضد زنگ در صنعت هستند. هر گرید با توجه به مقاومت خوردگی و شرایط کاری انتخاب می‌شود.",
    title1: "گریدهای متداول استنلس استیل",
    content1:
      "گریدهای ۳۰۴، ۳۱۶، ۳۱۶ال و ۳۲۱ از پرکاربردترین انواع فولاد ضد زنگ در صنعت هستند. هر گرید با توجه به مقاومت خوردگی و شرایط کاری انتخاب می‌شود. مشاوره فنی برای انتخاب بهینه در اختیار مشتریان قرار می‌گیرد.",
    title2: "۳۰۴ و ۳۰۴ال",
    content2:
      "گرید ۳۰۴ پرکاربردترین گرید آستنیتی برای محیط‌های معمول است. ۳۰۴ال برای جوشکاری و کاهش حساس‌زدایی به‌کار می‌رود. مقاومت خوردگی خوب در محیط‌های غیرخورنده.",
    title3: "۳۱۶ و ۳۱۶ال",
    content3:
      "مقاومت بالاتر در برابر خوردگی حفره‌ای و شکافی به‌خاطر مولیبدن. برای محیط‌های دریایی، شیمیایی و حاوی کلر مناسب است.",
    title4: "۳۲۱ و ۳۴۷",
    content4:
      "گریدهای تثبیت‌شده با تیتانیوم یا نیوبیم برای کاربرد در دماهای بالا (حدود ۵۵۰–۸۵۰ درجه سانتی‌گراد) و جلوگیری از خوردگی بین‌دانه‌ای.",
    title5: "جداول مقایسه‌ای",
    content5:
      "انتخاب نهایی گرید با توجه به محیط کاری، دما، نوع خوردگی و الزامات مکانیکی انجام می‌شود. کاتالوگ گریدها و جداول مقایسه در اختیار مشتریان قرار دارد.",
    image: "/images/articles.png",
    sources: [
      { id: 1, title: "ASTM A240 - ورق و نوار", url: "https://www.astm.org/" },
      {
        id: 2,
        title: "EN 10088 - فولادهای ضد زنگ",
        url: "https://www.en-standard.eu/",
      },
    ],
  },
  {
    id: 7,
    title: "صنعت داروسازی و استانداردهای بهداشتی",
    introduction:
      "در صنعت داروسازی و تجهیزات پزشکی، سطح تمیز و بدون درز فولاد ضد زنگ و انطباق با استانداردهای GMP از الزامات اساسی است.",
    title1: "صنعت داروسازی و استانداردهای بهداشتی",
    content1:
      "در صنعت داروسازی و تجهیزات پزشکی، سطح تمیز و بدون درز فولاد ضد زنگ و انطباق با استانداردهای GMP از الزامات اساسی است. محصولات ما در گریدهای مناسب برای این صنایع عرضه می‌شوند.",
    title2: "پرداخت سطح و جوش",
    content2:
      "پرداخت الکتروپولیش یا پولیش مکانیکی برای کاهش زبری سطح و تمیزپذیری بهتر انجام می‌شود. جوش بدون درز یا با پرکن مناسب برای جلوگیری از تجمع آلودگی الزامی است.",
    applicationTitle: "مواد و تجهیزات تماس با دارو",
    application: [
      {
        id: 1,
        slug: "vessel",
        faTitle: "ظروف و تانک‌های فرآوری",
        description: "گرید ۳۱۶ال با پرداخت سطح مناسب",
      },
      {
        id: 2,
        slug: "piping",
        faTitle: "لوله و اتصالات استنلس",
        description: "مطابق با الزامات ASME BPE",
      },
    ],
    image: "/images/articles.png",
    sources: [
      { id: 1, title: "FDA GMP", url: "https://www.fda.gov/" },
      { id: 2, title: "ASME BPE", url: "https://www.asme.org/" },
    ],
  },
  {
    id: 8,
    title: "کاربردهای صنعت نفت و گاز",
    introduction:
      "نمونه‌ای از کاربردهای نوار و لوله استنلس استیل در صنعت نفت و گاز در زیر آمده است.",
    title1: "کاربردهای صنعت نفت و گاز",
    content1:
      "در صنایع بالادستی و پایین‌دستی نفت و گاز، نوار و لوله فولاد ضد زنگ در خطوط لوله، مخازن، جداکننده‌ها و تجهیزات فرآوری استفاده می‌شود.",
    applicationTitle: "کاربردهای صنعت نفت و گاز",
    application: [
      {
        id: 1,
        slug: "stainless-belt",
        faTitle: "تسمه و سگک نواری استیل ضد زنگ",
        description: "برای اتصال و بست در محیط خورنده",
      },
      {
        id: 2,
        slug: "welded-pipe",
        faTitle: "لوله جوش داده شده از جنس استنلس استیل",
        description: "خطوط انتقال سیال و گاز",
      },
      {
        id: 3,
        slug: "flexible-hose",
        faTitle: "شیلنگ و لوله راه راه انعطاف پذیر از جنس استنلس استیل",
        description: "برای ارتعاش و جابه‌جایی محدود",
      },
      {
        id: 4,
        slug: "pall-ring",
        faTitle: "حلقه پال بسته بندی تصادفی برج",
        description: "برج‌های جذب و شست‌وشو",
      },
      {
        id: 5,
        slug: "heat-exchanger",
        faTitle: "لوله پره دار مبدل حرارتی صنعتی",
        description: "تبادل حرارت در واحدهای فرآوری",
      },
      {
        id: 6,
        slug: "others",
        faTitle: "دیگران",
        description: "سایر کاربردها با مشاوره فنی",
      },
    ],
    image: "/images/articles.png",
    sources: [
      { id: 1, title: "API Standards", url: "https://www.api.org/" },
      { id: 2, title: "NACE International", url: "https://www.nace.org/" },
    ],
  },
];

export const PRODUCT_DETAIL_MOCK: Record<number, IProduct> = {
  1: {
    id: 1,
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ UNS N08904",
    slug: "uns-n08904",
    category: CATEGORIES_ARRAY[2],
    introduction:
      "نوار فولادی ضد زنگ UNS N08904 با مقاومت بالا در برابر خوردگی و حرارت، مناسب برای صنایع نفت و گاز و پتروشیمی.",
    usage: [
      {
        id: "u1-1",
        title: "صنعت نفت و گاز",
        image: "/images/industry-oil.jpg",
      },
      { id: "u1-2", title: "پتروشیمی", image: "/carousel-img/image-1.png" },
      {
        id: "u1-3",
        title: "خطوط لوله و مخازن تحت فشار",
        image: "/images/industry-tech.jpg",
      },
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
    description:
      "نوار فولادی ضد زنگ UNS N08904 با مقاومت بالا در برابر خوردگی و حرارت، مناسب برای صنایع نفت و گاز و پتروشیمی.",
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
    corrosionResistance:
      "مقاومت عالی در برابر خوردگی در محیط‌های کلریدی و اسیدی",
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
    introduction:
      "نوار فولادی ضد زنگ ۳۰۴ پرکاربردترین گرید استنلس استیل با مقاومت خوب در برابر خوردگی.",
    usage: [
      { id: "u2-1", title: "صنایع غذایی", image: "/carousel-img/image-1.png" },
      {
        id: "u2-2",
        title: "دارویی و آشپزخانه",
        image: "/images/industry-tech.jpg",
      },
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
    description:
      "نوار فولادی ۳۱۶ با افزودن مولیبدن، مقاومت بالاتر در محیط‌های خورنده.",
    category: CATEGORIES_ARRAY[2],
    introduction:
      "نوار فولادی ضد زنگ ۳۱۶ با افزودن مولیبدن، مقاومت بالاتر در محیط‌های خورنده.",
    usage: [
      { id: "u3-1", title: "صنایع دریایی", image: "/carousel-img/image-1.png" },
      {
        id: "u3-2",
        title: "شیمیایی و داروسازی",
        image: "/images/industry-tech.jpg",
      },
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
      {
        id: "u4-1",
        title: "مخازن جوشکاری شده",
        image: "/carousel-img/image-1.png",
      },
      {
        id: "u4-2",
        title: "تجهیزات فرآوری",
        image: "/images/industry-oil.jpg",
      },
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
      {
        id: "u5-1",
        title: "اگزوز و مبدل حرارتی",
        image: "/images/industry-auto.jpg",
      },
      {
        id: "u5-2",
        title: "صنعت هواپیمایی",
        image: "/images/industry-jet.jpg",
      },
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
    introduction:
      "نوار فولادی فرومغناطیسی با هزینه کمتر، مناسب برای کاربردهای عمومی.",
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

// ============ CALCULATOR DATA ==============

export const PRODUCTS_FROM_MOCK_CALCULATOR = PRODUCT_ITEMS.map((p) => ({
  value: String(p.id),
  label: p.title,
  categoryValue: String(p.category.id),
  density: parseDensityFromProduct(p),
}));

export const CATEGORIES_FROM_MOCK = Array.from(
  new Map(
    Object.values(PRODUCT_DETAIL_MOCK).map((p) => [p.category.id, { value: String(p.category.id), label: p.category.title }])
  ).values()
);