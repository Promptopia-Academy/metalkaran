import { Box, FileText, Home, MessageSquare, Settings } from "lucide-react";

export const FORM_MAIN_PARAPH =
  "ما از تمام سوالات مشتریان استقبال می‌کنیم و اگر در مورد راه‌حل‌ها و خدمات فویل‌های نوارهای دقیق ما سؤالی دارید، لطفاً از طریق فرم تماس زیر با ما تماس بگیرید.ما در اسرع وقت به شما پاسخ خواهیم داد.";

export const FORM_SUB_PARAPH =
  "همکاران ما در اسرع وقت با شما تماس خواهند گرفت.";

export const PHONE_NUMBER = "09123456789";

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

export const NAV_LINKS = [
  { href: "#", label: "خانه" },
  { href: "/contact-us", label: "تماس با ما" },
  { href: "#", label: "محصولات" },
  { href: "/questions", label: "سوالات متداول" },
  { href: "/about-us", label: "درباره ما" },
];

export const INDUSTRIES_CAROUSEL = [
  { id: 1, image: "/images/industry-oil.jpg", title: "صنعت نفت و گاز" },
  { id: 2, image: "/images/industry-tech.jpg", title: "الکترونیک و فناوری" },
  { id: 3, image: "/images/industry-auto.jpg", title: "خودروسازی" },
  { id: 4, image: "/images/industry-jet.jpg", title: "خودروسازی" },
  { id: 5, image: "/images/industry-jet.jpg", title: "خودروسازی" },
];

export const CATEGORIES_ARRAY = [
  { src: "/images/aluminum_profile.png", alt: "Aluminum Profiles" },
  { src: "/images/metal_coils.png", alt: "Metal Coils" },
  { src: "/images/steel_sheets.png", alt: "Steel Sheets" },
  { src: "/images/platinum_ingots.png", alt: "Platinum Ingots" },
  { src: "/images/aluminum_sheets.png", alt: "Aluminum Sheets" },
  { src: "/images/tin_alloy.png", alt: "Tin Alloys" },
  { src: "/images/ingots.png", alt: "Ingots" },
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

export const CARD_ITEMS = [
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
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
