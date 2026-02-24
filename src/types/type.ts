// ========== Backend: users (authentication) ==========
export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

// ========== Backend: contacts ==========
export interface IContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt: string;
}

// ========== Backend: categories ==========
export interface ICategory {
  id: number;
  slug: string;
  title: string;
  image?: string;
}

// ========== Backend: hero_sections ==========
export interface IHeroSection {
  id: number;
  src: string;
  alt: string;
}

// ========== Backend: home_page_about ==========
export interface IHomePageAbout {
  id?: number;
  title: string;
  detail: string;
  extraTitle: string;
  extraDetail: string;
}

// ========== Backend: usages ==========
export interface IUsage {
  id: string;
  title: string;
  image: string;
  productId?: number;
}

// ========== Backend: chemical_compositions ==========
export interface IChemicalComposition {
  id: number;
  slug: string;
  value: string;
  title: string;
  productId?: number;
}

// ========== Backend: mechanical_properties ==========
export interface IMechanicalProperties {
  id?: number;
  productId?: number;
  hardness: string;
  elasticModulus: string;
  elongation: string;
  yieldStrength: string;
  tensileStrength: string;
}

// ========== Backend: physical_properties ==========
export interface IPhysicalProperties {
  id?: number;
  productId?: number;
  density: string;
  electricalResistivity: string;
  meltingPoint: string;
  molarHeatCapacity: string;
}

// ========== Backend: products_full + product_usages ==========
export type IProduct = {
  id: number;
  image?: string;
  title: string;
  slug: string;
  categoryId: number;
  /** وقتی API دسته را join کند (مثلاً برای سایت) */
  category?: { id: number; title: string; slug?: string; image?: string };
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

// ========== Backend: applications ==========
export interface IApplication {
  id: number;
  slug: string;
  faTitle: string;
  description: string;
}

// ========== Backend: article_sources ==========
export interface IArticleSource {
  id: number;
  articleId?: number;
  title: string;
  url: string;
}

// ========== Backend: articles ==========
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
  createdAt?: string;
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

// ========== Backend: contact_form_data ==========
export interface IContactFormData {
  id?: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt?: string;
}

// ========== Backend: about_us_page_cards ==========
export interface IAboutUsPageCard {
  id: number;
  image: string;
  title: string;
}

export type IAboutUsCardProps = Pick<IAboutUsPageCard, "image" | "title">;

/** یک ردیف کاربرد در فرم ریپیتینگ (عنوان + تصویر) */
export type ProductUsageRow = { title: string; image: string };

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
  /** انتخاب از کاربردهای موجود CMS */
  usageIds?: string[];
  /** کاربردهای ریپیتینگ (عنوان + تصویر) برای همین محصول */
  usages?: ProductUsageRow[];
  chemicalComposition?: { slug: string; title: string; value: string }[];
};

// ========== Backend: about_us_page_why_us ==========
export interface IAboutUsPageWhyUs {
  id?: number;
  title: string;
  description: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ========== Backend: about_us_page_descriptions ==========
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

// ========== Backend: contact_us_page_data ==========
export interface IContactUsPageData {
  id?: number;
  mainParagraph: string;
  subParagraph: string;
}

// ========== Backend: company_social_links ==========
export interface ICompanySocialLink {
  id: number;
  title: string;
  url: string;
}

// ========== Backend: company_information ==========
export interface ICompanyInformation {
  id?: number;
  phoneNumber: string;
  emailAddress: string;
  /** ممکن است در بک‌اند به جدول جدا یا فیلد اضافه شود */
  companyAddress?: string;
  socialLinks: ICompanySocialLink[];
}

// ترکیب داده‌های چند جدول برای صفحهٔ لندینگ
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

export type ICategoryPageProps = IPageProps<{ id: string }>;

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

// ========== Backend: questions ==========
export interface IQuestion {
  id: number;
  question: string;
  answer: string;
}
