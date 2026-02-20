import AboutUsCard from "./AboutUsCard";
import { ABOUT_US_PAGE_DATA } from "@/lib/constants";
import type { IAboutUsPageData } from "@/types/type";

type AboutUsCardsDivProps = { aboutUsPageData?: IAboutUsPageData | null };

const AboutUsCardsDiv = ({ aboutUsPageData }: AboutUsCardsDivProps) => {
  const cards = aboutUsPageData?.aboutUsCards ?? ABOUT_US_PAGE_DATA.aboutUsCards;
  return (
    <div className="gap-10 w-full h-full flex flex-col justify-between items-center md:flex-row">
      {cards.map((card) => (
        <AboutUsCard key={card.id} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default AboutUsCardsDiv;
