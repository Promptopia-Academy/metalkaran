"use client";
import { IAboutUsPageCard } from "@/types/type";
import AboutUsCard from "./AboutUsCard";
import { useEffect, useState } from "react";
import { getAboutUsCards } from "@/lib/cms/aboutUsCardsApi";

const AboutUsCardsDiv = () => {
  const [cards, setCards] = useState<IAboutUsPageCard[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAboutUsCards();
        setCards(data);
      } catch (error) {
        console.error("خطا در دریافت کارت‌های درباره ما:", error);
      }
    };

    fetchItems();
  }, []);
  return (
    <div className="gap-10 w-full h-full flex flex-col justify-between items-center md:flex-row">
      {cards.map((card) => (
        <AboutUsCard key={card.id} image={card.image} title={card.title} />
      ))}
    </div>
  );
};

export default AboutUsCardsDiv;
