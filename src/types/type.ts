export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt: string;
}

export interface ICategory {
  id: number;
  image?: string;
  title: string;
  introduction: string;
  slug: string;
}

export interface IChemicalComposition {
  id: number;
  slug: string;
  faTitle: string;
  percentage: string;
}

export interface IMechanicalProperties {
  id: number;
  slug: string;
  faTitle: string;
  value: string;
}

export interface IPhysicalProperties {
  id: number;
  slug: string;
  faTitle: string;
  value: string;
}

export type IElement = {
  id: number;
  image?: string;
  title: string;
  category: ICategory;
  introduction: string;
  usage: string;
  standards?: string;
  chemicalComposition?: IChemicalComposition[];
  mechanicalProperties?: IMechanicalProperties[];
  physicalProperties?: IPhysicalProperties[];
  thermalExpansion?: string;
  corrosionResistance?: string;
  heatResistance?: string;
  manufacturing?: string;
  hotForming?: string;
  coldForming?: string;
  welding?: string;
  machining?: string;
  createdAt: string;
};

export interface IApplication {
  id: number;
  slug: string;
  faTitle: string;
  description: string;
}

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
  applicationTitle?: string;
  application?: IApplication[];
};

export interface ICalculateWeightParams {
  length: string;
  width: string;
  height: string;
  lengthUnit: IUnit;
  widthUnit: IUnit;
  heightUnit: IUnit;
  density: number;
}

export type IUnit = "cm" | "m";

export interface ICalculatorInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  unit: IUnit;
  onUnitChange: (unit: IUnit) => void;
  inputClassName?: string;
  selectContentClassName?: string;
}

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

export interface ITextsProps {
  article: IArticle;
  dir?: "rtl" | "ltr";
}

export interface IQuestionSectionProps {
  questions?: IQuestion[];
  title?: string;
}

export interface IQuestion {
  id: number;
  question: string;
  answer: String;
}

export interface IPageProps {
  params: Promise<{ id: string }>;
}

export interface IArticleCardProps {
  article: IArticle;
}
