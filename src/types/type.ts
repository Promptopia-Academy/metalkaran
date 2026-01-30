export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt: string;
}

export type IElement = {
  id: number;
  image?: string;
  title: string;
  introduction: string; // معرفی
  usage: string; // کاربرد
  standards?: string; // استانداردها
  chemicalComposition?: string; // ترکیبات شیمیایی
  physicalProperties?: string; // مشخصات فیزیکی
  thermalExpansion?: string; // ضریب انبساط حرارتی
  corrosionResistance?: string; // مقاومت در برابر خوردگی
  heatResistance?: string; // مقاومت حرارتی
  manufacturing?: string; // مشخصات ساخت و پردازش
  hotForming?: string; // شکل دهی داغ
  coldForming?: string; // شکل دهی سرد
  welding?: string; // جوشکاری
  machining?: string; // ماشینکاری
};

export type IArticle = {
  id: number;
  image?: string;
  title: string;
  introduction: string;
  title1: string;
  content1: string;
  title2?: string;
  content2?: string;
  title3?: string;
  content3?: string;
  title4?: string;
  content4?: string;
  title5?: string;
  content5?: string;
  sources?: string;
};

export interface IContactFormData {
  id?: number;
  name: string;
  phone: string;
  email: string;
  company: string;
}

export interface IRateLimitEntry {
  id: number;
  ip: string;
  count: number;
  resetTime: number;
}

export interface IArticleServiceResponse {
  success: boolean;
  message: string;
  data?: IArticle | IArticle[];
  errors?: unknown;
}

export interface IContactServiceResponse {
  success: boolean;
  message: string;
  data?: IContact;
  errors?: unknown;
}

export interface IRateLimitResponse {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

export interface IElementServiceResponse {
  success: boolean;
  message: string;
  data?: IElement | IElement[];
  errors?: unknown;
}

export interface IUploadServiceResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
    fileName: string;
    size: number;
    type: string;
  };
}

export interface AboutUsCardProps {
  image: string;
  title: string;
}

export interface IApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  apiKey?: string;
}

export interface ICategoryItemProps {
  src: string;
  alt: string;
  title: string;
}

export interface ICardElementProps {
  image: string;
  title: string;
  slug: string;
}

export interface IBadgeProps {
  text: string;
  icon: React.ReactNode;
}
