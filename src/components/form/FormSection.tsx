import { ProfileForm } from "./ProfileForm";
import { CONTACT_US_PAGE_DATA } from "@/lib/constants";

const FormSection = () => {
  return (
    <div className="w-full h-full py-11 px-4 gap-3 flex flex-col justify-center items-center sm:flex-row-reverse sm:items-start sm:justify-center">
      <div className="text-right w-[284px] sm:w-[400px] sm:font-medium sm:text-2xl flex flex-col justify-start items-start">
        <p className="">{CONTACT_US_PAGE_DATA.mainParagraph}</p>
        <p className="">{CONTACT_US_PAGE_DATA.subParagraph}</p>
      </div>

      <ProfileForm />
    </div>
  );
};

export default FormSection;
