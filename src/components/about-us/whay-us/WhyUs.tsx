"use client";

import { getAboutUsWhyUs } from "@/lib/cms/aboutUsWhyUsApi";
import type { IAboutUsPageWhyUs } from "@/types/type";
import { useEffect, useState } from "react";

const WhyUs = () => {
  const [data, setData] = useState<IAboutUsPageWhyUs[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getAboutUsWhyUs();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      {data.map((item) => (
        <div key={item.id} className="mb-8 w-full">
          <h4 className="text-center text-2xl font-semibold">{item.title}</h4>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xl font-normal">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WhyUs;
