import React from "react";
import { ProfileForm } from "./ProfileForm";
import { FORM_PARAPH } from "@/lib/constants";

const FormSection = () => {
  return (
    <div className="w-full h-full py-11 px-4 gap-3 flex flex-col justify-center items-center sm:flex-row-reverse">
      <div className="text-right w-[284px] sm:w-[523px] sm:font-medium sm:text-2xl">
        <p className="">{FORM_PARAPH}</p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default FormSection;
