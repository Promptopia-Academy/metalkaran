import { PHONE_NUMBER } from "@/lib/constants";
import React from "react";

const CallSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-10">
      <div className="py-1 flex flex-col items-center justify-center w-3xs rounded-2xl border-2 border-[#1E78AA]">
        <p className="text-2xl font-medium">با ما تماس بگیرید</p>
      </div>

      <div className="py-1 flex flex-col items-center justify-center w-3xs bg-[#1E78AA] text-white rounded-2xl border-2 border-[#1E78AA]">
        <p className="text-2xl font-medium">{PHONE_NUMBER}</p>
      </div>
    </div>
  );
};

export default CallSection;
