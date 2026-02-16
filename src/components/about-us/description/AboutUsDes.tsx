import Image from "next/image";
import { ABOUT_US_PAGE_DATA } from "@/lib/constants";
import { getImageUrl } from "@/lib/api";

const AboutUsDes = () => {
  return (
    <div>
      {ABOUT_US_PAGE_DATA.aboutUsDescription.map((item) => (
        <div
          key={item.id}
          className="flex flex-col w-full justify-between items-center gap-6 py-14 md:flex-row md:gap-10"
        >
          <Image
            src={getImageUrl(item.image)}
            alt={item.alt}
            width={item.width}
            height={item.height}
            unoptimized
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
