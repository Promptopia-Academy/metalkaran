import Texts from "@/components/articles/Texts";
import { ARTICLE_ITEMS } from "@/lib/constants";
import React from "react";

const page = () => {
  return (
    <div className="px-36 py-16">
      {ARTICLE_ITEMS.map((item, index) => (
        <Texts
          key={index}
          header={item.title}
          content={item.description}
          bulletPoints={item.bulletpoints}
          banner={item.image}
          dir="rtl"
        />
      ))}
    </div>
  );
};

export default page;
