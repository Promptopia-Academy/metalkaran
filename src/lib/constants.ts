/**
 * ثابت‌های استاتیک UI — داده‌های واقعی از API (بک‌اند) گرفته می‌شوند.
 * این فایل فقط برای منوی ادمین، لینک‌های ناو، ستون‌های جدول و رنگ‌های ترکیب شیمیایی است.
 */

import type { IHeroSection, ICompanyInformation, IContactUsPageData, IHomePageAbout, IAboutUsPageData, IQuestion, ICategory, IProduct } from "@/types/type";
import type { DataTableColumn } from "@/types/type";
import type { IMechanicalProperties, IPhysicalProperties } from "@/types/type";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  ImageIcon,
  MessageSquare,
  Info,
  Contact,
  Settings,
  HelpCircle,
  Layout,
} from "lucide-react";

// ——— منوی ادمین ———
export const ADMIN_MENU_ITEMS = [
  { title: "داشبورد", href: "/admin", icon: LayoutDashboard },
  { title: "محصولات", href: "/admin/products", icon: FolderOpen },
  { title: "مقالات", href: "/admin/articles", icon: FileText },
  { title: "دسته‌بندی‌ها", href: "/admin/categories", icon: FolderOpen },
  { title: "سوالات متداول", href: "/admin/questions", icon: HelpCircle },
  { title: "صفحه تماس", href: "/admin/contact-us", icon: Contact },
  { title: "درباره ما", href: "/admin/about-us", icon: Info },
  { title: "اطلاعات شرکت", href: "/admin/information", icon: MessageSquare },
  { title: "لندینگ و اسلایدر", href: "/admin/landing-page", icon: Layout },
  { title: "پیام‌های تماس", href: "/admin/contacts", icon: MessageSquare },
  { title: "تنظیمات", href: "/admin/settings", icon: Settings },
] as const;

// ——— لینک‌های هدر ———
export const NAV_LINKS = [
  { label: "محصولات", href: "/products" },
  { label: "درباره ما", href: "/about-us" },
  { label: "مقالات", href: "/articles" },
  { label: "سوالات متداول", href: "/questions" },
  { label: "تماس با ما", href: "/contact-us" },
] as const;

// ——— لوگوی پیش‌فرض (وقتی از API نیامد) ———
export const LOGO_IMAGE: IHeroSection = {
  id: 0,
  src: "/logo.png",
  alt: "لوگو",
};

// ——— ستون‌های جدول خواص مکانیکی و فیزیکی ———
export const MECHANICAL_COLUMNS: DataTableColumn<IMechanicalProperties>[] = [
  { header: "سختی", accessor: "hardness" },
  { header: "مدول الاستیک", accessor: "elasticModulus" },
  { header: "ازدیاد طول", accessor: "elongation" },
  { header: "استحکام تسلیم", accessor: "yieldStrength" },
  { header: "استحکام کششی", accessor: "tensileStrength" },
];

export const PHYSICAL_COLUMNS: DataTableColumn<IPhysicalProperties>[] = [
  { header: "چگالی", accessor: "density" },
  { header: "مقاومت الکتریکی", accessor: "electricalResistivity" },
  { header: "نقطه ذوب", accessor: "meltingPoint" },
  { header: "ظرفیت گرمایی مولی", accessor: "molarHeatCapacity" },
];

// ——— رنگ‌های کارت ترکیب شیمیایی ———
export const CHEMICAL_COLORS = [
  "#1E78AA",
  "#2E8B57",
  "#CD853F",
  "#6A5ACD",
  "#DC143C",
  "#20B2AA",
  "#9370DB",
  "#FF6347",
];

// ——— بخش‌های اضافی مقاله (title2/content2, ...) ———
export const EXTRA_CONTENT_SECTIONS = [
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
  { title: "title4", content: "content4" },
  { title: "title5", content: "content5" },
] as const;

// ——— پیش‌فرض‌ها وقتی API خالی یا خطا برگرداند ———
export const DEFAULT_HERO_SECTION: IHeroSection[] = [];
export const DEFAULT_INDUSTRIES_CAROUSEL: IHeroSection[] = [];
export const DEFAULT_COMPANY_INFORMATION: ICompanyInformation = {
  phoneNumber: "",
  emailAddress: "",
  companyAddress: "",
  socialLinks: [],
};
export const DEFAULT_CONTACT_US_PAGE_DATA: IContactUsPageData = {
  mainParagraph: "",
  subParagraph: "",
};
export const DEFAULT_HOME_PAGE_ABOUT: IHomePageAbout = {
  title: "",
  detail: "",
  extraTitle: "",
  extraDetail: "",
};
export const DEFAULT_ABOUT_US_PAGE_DATA: IAboutUsPageData = {
  whyUs: { title: "", description: "" },
  aboutUsCards: [],
  aboutUsDescription: [],
};
export const DEFAULT_QUESTION_ITEMS: IQuestion[] = [];

// نام‌های قدیمی برای سازگاری با کامپوننت‌ها (fallback)
export const QUESTION_ITEMS = DEFAULT_QUESTION_ITEMS;
export const HERO_SECTION = DEFAULT_HERO_SECTION;
export const INDUSTRIES_CAROUSEL = DEFAULT_INDUSTRIES_CAROUSEL;
export const COMPANY_INFORMATION = DEFAULT_COMPANY_INFORMATION;
export const CONTACT_US_PAGE_DATA = DEFAULT_CONTACT_US_PAGE_DATA;
export const HOME_PAGE_ABOUT = DEFAULT_HOME_PAGE_ABOUT;
export const ABOUT_US_PAGE_DATA = DEFAULT_ABOUT_US_PAGE_DATA;

// لیست خالی برای fallback وقتی از API داده نیامده
export const CATEGORIES_ARRAY: ICategory[] = [];
export const PRODUCT_ITEMS: IProduct[] = [];
