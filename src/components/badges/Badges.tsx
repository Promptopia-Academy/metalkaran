import { Heart, ShieldCheck, UsersRound } from "lucide-react";
import React from "react";
import Badge from "./Badge";

const BADGES_ARRAY = [
  {
    text: "پشتیبانی",
    icon: <UsersRound className="text-background w-16 h-20 md:w-20 md:h-24" />,
  },
  {
    text: "تضمین  قیمت",
    icon: <ShieldCheck className="text-background w-16 h-20 md:w-20 md:h-24" />,
  },
  {
    text: "تضمین کیفیت",
    icon: <Heart className="text-background w-16 h-20 md:w-20 md:h-24" />,
  },
];

const Badges = () => {
  return (
    <section id="BADGES_ARRAY" className="mt-12 md:mt-20 lg:mt-32 px-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 xl:gap-40">
        {BADGES_ARRAY.map((badge, index) => (
          <Badge key={index} text={badge.text} icon={badge.icon} />
        ))}
      </div>
    </section>
  );
};

export default Badges;
