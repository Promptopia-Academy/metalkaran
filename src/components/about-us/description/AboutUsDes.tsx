"use client";
import UploadedImage from "@/components/ui/UploadedImage";
import { getAboutUsDescriptions } from "@/lib/cms/companyInformationApi";
import type { IAboutUsPageData, IAboutUsPageDescription } from "@/types/type";
import { useEffect, useState } from "react";
import { set } from "zod";

type AboutUsDesProps = { aboutUsPageData?: IAboutUsPageData | null };

const AboutUsDes = () => {
  const [descriptions, setDescriptions] = useState<IAboutUsPageDescription[]>();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAboutUsDescriptions();
        setDescriptions(data);
      } catch (error) {
        console.error("خطا در دریافت  اطلاعات درباره ما:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div>
      {descriptions?.map((item) => (
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
