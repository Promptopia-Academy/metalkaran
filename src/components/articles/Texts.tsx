import Banner from "@/context/Banner";
import React from "react";

interface TextsProps {
  header?: string;
  content?: string;
  bulletPoints?: string[];
  banner?: string;
  dir?: "rtl" | "ltr";
}

const Texts = ({ header, content, bulletPoints, banner, dir }: TextsProps) => {
  return (
    <>
      {!banner && (
        <div dir={dir}>
          {header && <h2 className="text-4xl font-bold mb-4 my-4">{header}</h2>}
          {content && <p className="mb-4 text-2xl">{content}</p>}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="list-disc list-inside">
              {bulletPoints.map((point, index) => (
                <li className="text-2xl" key={index}>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {banner && (
        <div className="my-10 flex items-center justify-center">
          <Banner imageSrc={banner} width={1150} height={400} />
        </div>
      )}
    </>
  );
};

export default Texts;
