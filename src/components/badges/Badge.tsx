import React from "react";

interface BadgeProps {
  text: string;
  icon: React.ReactNode;
}

const Badge = ({ text, icon }: BadgeProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="flex justify-center items-center bg-button w-28 h-28 rounded-2xl"
        style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
      >
        {icon}
      </div>
      <p className="text-center text-lg font-medium text-button">{text}</p>
    </div>
  );
};

export default Badge;
