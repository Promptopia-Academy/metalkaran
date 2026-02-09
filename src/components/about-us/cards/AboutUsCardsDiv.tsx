import AboutUsCard from "./AboutUsCard";
import { ABOUT_US_CARDS } from "@/lib/constants";

const AboutUsCardsDiv = () => {
  return (
    <div className="gap-10 w-full h-full flex flex-col justify-between items-center md:flex-row">
      {ABOUT_US_CARDS.map((card) => (
        <AboutUsCard key={card.id} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default AboutUsCardsDiv;
