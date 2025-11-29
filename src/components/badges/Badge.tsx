import React from "react";

interface BadgeProps {
  text: string;
  icon: React.ReactNode;
}

const Badge = ({ text, icon }: BadgeProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-3 items-center">
      <div
        className="flex justify-center items-center bg-button w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl"
        style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="scale-75 md:scale-90 lg:scale-100">{icon}</div>
      </div>
      <p className="text-center text-base md:text-lg font-medium text-button">{text}</p>
    </div>
  );
};

export default Badge;
