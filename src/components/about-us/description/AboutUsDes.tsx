import { ABOUT_US_PAGE_DATA } from "@/lib/constants";
import UploadedImage from "@/components/ui/UploadedImage";
import type { IAboutUsPageData } from "@/types/type";

type AboutUsDesProps = { aboutUsPageData?: IAboutUsPageData | null };

const AboutUsDes = ({ aboutUsPageData }: AboutUsDesProps) => {
  const descriptions = aboutUsPageData?.aboutUsDescription ?? ABOUT_US_PAGE_DATA.aboutUsDescription;
  return (
    <div>
      {descriptions.map((item) => (
        <div
          key={item.id}
          className="flex flex-col w-full justify-between items-center gap-6 py-14 md:flex-row md:gap-10"
        >
          <UploadedImage
            src={item.image}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
          <div className={item.contentClassName}>
            <h3 className="text-4xl font font-semibold">{item.title}</h3>
            <p className="text-2xl font-medium max-w-[500px] text-right">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsDes;
