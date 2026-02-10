import Image from "next/image";
import { IAboutUsCardProps } from "@/types/type";

const AboutUsCard = ({ image, title }: IAboutUsCardProps) => {
  return (
    <div className="w-[300px] h-[450px] flex flex-col justify-end items-center gap-2">
      <Image src={image} alt={title} width={300} height={380} />
      <div className="w-[300px] h-16 flex justify-center items-center gap-2 rounded-2xl bg-button text-white text-center">
        <h3 className="text-[28px] font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default AboutUsCard;
