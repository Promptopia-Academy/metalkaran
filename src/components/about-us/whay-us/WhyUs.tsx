import { ABOUT_US_PAGE_DATA } from "@/lib/constants";
import type { IAboutUsPageData } from "@/types/type";

type WhyUsProps = { aboutUsPageData?: IAboutUsPageData | null };

const WhyUs = ({ aboutUsPageData }: WhyUsProps) => {
  const whyUs = aboutUsPageData?.whyUs ?? ABOUT_US_PAGE_DATA.whyUs;
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <h4 className="text-2xl font-semibold text-center">{whyUs.title}</h4>
      <p className="text-center text-xl font-normal max-w-3xl mt-6">
        {whyUs.description}
      </p>
    </div>
  );
};

export default WhyUs;
