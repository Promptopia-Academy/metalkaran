import React from "react";

interface BadgeProps {
  text: string;
  icon: React.ReactNode;
}

const Badge = ({ text, icon }: BadgeProps) => {
  return (
    <div className="group flex flex-col gap-2 md:gap-3 items-center transition-all duration-300">
      <div
        className="flex justify-center items-center bg-button w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl relative overflow-hidden transition-all duration-300 ease-out group-hover:shadow-xl group-hover:scale-105"
        style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/30 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
          <div className="scale-75 md:scale-90 lg:scale-100">{icon}</div>
        </div>
      </div>
      <p className="text-center text-base md:text-lg font-medium text-button transition-colors duration-300 group-hover:text-primary-secondary">
        {text}
      </p>
    </div>
  );
};

export default Badge;
