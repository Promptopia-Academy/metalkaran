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

export interface IChemicalComposition {
  id: number;
  slug: string;
  value: string;
  title: string;
}

export interface IMechanicalProperties {
  hardness: string                 //سختی
  elasticModulus: string           //مدول الاستیک
  elongation: string               //درصد تغییر طول در 50 میلی متر
  yieldStrength: string            //استحکام تسلیم
  tensileStrength: string          //استحکام کششی
}

export interface IPhysicalProperties {
  density: string                  //چگالی
  electricalResistivity: string    //مقاومت الکتریکی
  meltingPoint: string             //نقطه ذوب
  molarHeatCapacity: string        //ظرفیت گرمایی ویژه
}

export type IProduct = {
  id: number;
  image?: string;
  title: string;
  slug: string;
  category: ICategory;
  introduction: string;
  usage: string;
  standards?: string;
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

export interface IProductServiceResponse {
  success: boolean;
  message: string;
  data?: IProduct | IProduct[];
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
  category: ICategory;
}

export interface IBannerProps {
  text?: string;
  width?: number;
  height?: number;
  imageSrc: string;
  overlay?: boolean;
  overlayColor?: string;
}

export interface DataTableColumn<T extends object = object> {
  header: string;
  accessor: keyof T & string;
}

export interface IDataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  data: T;
  title?: string;
}

export interface ICardElementProps {
  id: number;
  image: string;
  title: string;
  slug?: string;
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

export interface IProductTableProps {
  mechanicalProperties?: IMechanicalProperties | null;
  physicalProperties?: IPhysicalProperties | null;
}

export interface IProductChemicalCompositionProps {
  ChemicalComposition: IChemicalComposition;
  color?: string;
}

export interface IProductChemicalCompositionDivProps {
  productChemicalComposition: IProduct;
}