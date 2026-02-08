import { PHONE_NUMBER } from "@/lib/constants";

const CallSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-5">
      <div className="py-1 flex flex-col items-center justify-center w-3xs rounded-2xl border-2 border-[#1E78AA]">
        <p className="text-2xl font-medium">با ما تماس بگیرید</p>
      </div>

      <a
        href={`tel:${PHONE_NUMBER}`}
        className="py-1 flex flex-col items-center justify-center w-3xs bg-[#1E78AA] text-white rounded-2xl border-2 border-[#1E78AA] hover:bg-[#2B517E] transition-all duration-300"
      >
        <p className="text-2xl font-medium">{PHONE_NUMBER}</p>
      </a>
    </div>
  );
};

export default CallSection;
