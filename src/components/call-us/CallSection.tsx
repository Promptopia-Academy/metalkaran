import { COMPANY_INFORMATION } from "@/lib/constants";
import type { ICompanyInformation } from "@/types/type";

type CallSectionProps = { companyInfo?: ICompanyInformation | null };

const CallSection = ({ companyInfo }: CallSectionProps) => {
  const info = companyInfo ?? COMPANY_INFORMATION;
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-5">
      <div className="py-1 flex flex-col items-center justify-center w-3xs rounded-2xl border-2 border-[#1E78AA]">
        <p className="text-2xl font-medium">با ما تماس بگیرید</p>
      </div>

      <a
        href={`tel:${info.phoneNumber}`}
        className="py-1 flex flex-col items-center justify-center w-3xs bg-[#1E78AA] text-white rounded-2xl border-2 border-[#1E78AA] hover:bg-[#2B517E] transition-all duration-300"
      >
        <p className="text-2xl font-medium">{info.phoneNumber}</p>
      </a>
    </div>
  );
};

export default CallSection;
