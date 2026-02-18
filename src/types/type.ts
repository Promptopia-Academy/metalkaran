import type * as React from "react";

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
  slug: string;
  title: string;
  image?: string;
}

export interface IHeroSection {
  id: number;
  src: string;
  alt: string;
}

export interface IHomePageAbout {
  title: string;
  detail: string;
  extraTitle: string;
  extraDetail: string;
}

export interface IChemicalComposition {
  id: number;
  slug: string;
  value: string;
  title: string;
}

export interface IMechanicalProperties {
  hardness: string; //سختی
  elasticModulus: string; //مدول الاستیک
  elongation: string; //درصد تغییر طول در 50 میلی متر
  yieldStrength: string; //استحکام تسلیم
  tensileStrength: string; //استحکام کششی
}

export interface IPhysicalProperties {
  density: string; //چگالی
  electricalResistivity: string; //مقاومت الکتریکی
  meltingPoint: string; //نقطه ذوب
  molarHeatCapacity: string; //ظرفیت گرمایی ویژه
}

export interface IUsage {
  id: string;
  title: string;
  image: string;
}

export type IProduct = {
  id: number;
  image?: string;
  title: string;
  slug: string;
  category: ICategory;
  introduction: string;
  description: string;
  standards?: string;
  usage: IUsage[];
  chemicalComposition?: IChemicalComposition[];
  mechanicalProperties?: IMechanicalProperties;
  physicalProperties?: IPhysicalProperties;
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

export interface IArticleSource {
  id: number;
  title: string;
  url: string;
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
  applicationTitle?: string;
  sources?: IArticleSource[];
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

export interface IContactFormData {
  id?: number;
  name: string;
  phone: string;
  email: string;
  company: string;
}

export interface IAboutUsPageCard {
  id: number;
  image: string;
  title: string;
}

export type IAboutUsCardProps = Pick<IAboutUsPageCard, "image" | "title">;


export type CreateProductFullInput = {
  image?: File | null;
  title: string;
  slug: string;
  categoryId?: number | null;
  introduction: string;
  description: string;
  standards?: string;
  thermalExpansion?: string;
  corrosionResistance?: string;
  heatResistance?: string;
  manufacturing?: string;
  hotForming?: string;
  coldForming?: string;
  welding?: string;
  machining?: string;
  usageIds?: string[];
  /** ترکیب شیمیایی (ریپیتینگ) */
  chemicalComposition?: { slug: string; title: string; value: string }[];
};


export interface IAboutUsPageWhyUs {
  title: string;
  description: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export interface IAboutUsPageDescription {
  id: number;
  image: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  contentClassName: string;
  description: string;
}

export interface IAboutUsPageData {
  whyUs: IAboutUsPageWhyUs;
  aboutUsCards: IAboutUsPageCard[];
  aboutUsDescription: IAboutUsPageDescription[];
}

export interface IContactUsPageData {
  mainParagraph: string;
  subParagraph: string;
}

export interface ICompanySocialLink {
  id: number;
  title: string;
  url: string;
}

export interface ICompanyInformation {
  phoneNumber: string;
  emailAddress: string;
  companyAddress: string;
  socialLinks: ICompanySocialLink[];
}

export interface IWebsiteContent {
  logoImage: IHeroSection;
  industriesCarousel: IHeroSection[];
  heroSection: IHeroSection[];
  homePageAbout: IHomePageAbout;
  aboutUsPageData: IAboutUsPageData;
  companyInformation: ICompanyInformation;
  contactUsPageData: IContactUsPageData;
}

export interface DataTableColumn<T extends object = object> {
  header: string;
  accessor: keyof T & string;
}

export interface IDataTableProps<T extends object = object> {
  columns: DataTableColumn<T>[];
  data: T;
  title?: string;
}

// Next.js App Router page props helper (e.g. /[id] routes)
export type IPageProps<
  TParams extends Record<string, string> = { id: string },
> = {
  params: TParams;
};

export type ICategoryPageProps = IPageProps<{ slug: string }>;

export interface IProductUsageDivProps {
  usages: IUsage[];
}

export interface IProductDetailProps {
  product: IProduct;
}

export interface IArticleCardProps {
  article: IArticle;
}

export interface IArticleTextsProps {
  article: IArticle;
  dir?: string;
}

export interface IProductUsageProps {
  usage: IUsage;
}

export interface IProductTableProps {
  mechanicalProperties?: IMechanicalProperties;
  physicalProperties?: IPhysicalProperties;
}

export interface IProductChemicalCompositionDivProps {
  productChemicalComposition: IProduct;
}

export interface IProductChemicalCompositionProps {
  ChemicalComposition: IChemicalComposition;
  color?: string;
}

export interface IBannerProps {
  imageSrc: string;
  text?: string;
  width?: number;
  height?: number;
  overlay?: boolean;
  overlayColor?: string;
}

export interface IBadgeProps {
  text: string;
  icon: React.ReactNode;
}

export interface ICategoryItemProps {
  category: ICategory;
}

export interface ICardElementProps {
  product: IProduct;
}

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

export interface IQuestionSectionProps {
  questions?: IQuestion[];
  title?: string;
}

export interface IQuestion {
  id: number;
  question: string;
  answer: String;
}
