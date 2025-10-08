import { Heart, ShieldCheck, UsersRound } from "lucide-react";
import React from "react";
import Badge from "./Badge";

const badges = [
  {
    text: "پشتیبانی",
    icon: <UsersRound className="text-background w-20 h-24" />,
  },
  {
    text: "تضمین  قیمت",
    icon: <ShieldCheck className="text-background w-20 h-24" />,
  },
  {
    text: "تضمین کیفیت",
    icon: <Heart className="text-background w-20 h-24" />,
  },
];

const Badges = () => {
  return (
    <section id="badges" className="mt-32">
      <div className="flex justify-center gap-40">
        {badges.map((badge, index) => (
          <Badge key={index} text={badge.text} icon={badge.icon} />
        ))}
      </div>
    </section>
  );
};

export default Badges;
