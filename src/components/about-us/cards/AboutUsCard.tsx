import Image from "next/image";
import { AboutUsCardProps } from "@/types/type";

const AboutUsCard = ({ image, title }: AboutUsCardProps) => {
  return (
    <div className="w-[300px] h-fit flex flex-col justify-center items-center gap-2">
      <Image src={image} alt={title} width={300} height={380} />
      <div className="w-[300px] h-16 flex justify-center items-center gap-2 rounded-2xl bg-button text-white text-center">
        <h3 className="text-[28px] font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default AboutUsCard;
