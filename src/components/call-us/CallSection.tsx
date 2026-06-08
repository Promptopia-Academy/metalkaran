"use client";
import type { ICompanyInformation } from "@/types/type";
import { useEffect, useState } from "react";

type CallSectionProps = { companyInfo?: ICompanyInformation | null };

const CallSection = () => {
  const [companyInfo, setCompanyInfo] = useState<ICompanyInformation[]>();
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await fetch("/api/cms/company-information");
        const data = await res.json();
        setCompanyInfo(data);
      } catch (err) {
        console.error("Hero fetch error:", err);
      }
    };

    fetchCompanyInfo();
  }, []);
  const info = companyInfo?.at(0);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-5">
      <div className="py-1 flex flex-col items-center justify-center w-3xs rounded-2xl border-2 border-[#1E78AA]">
        <p className="text-2xl font-medium">با ما تماس بگیرید</p>
      </div>

      <a
        href={`tel:${info?.phoneNumber}`}
        className="py-1 flex flex-col items-center justify-center w-3xs bg-[#1E78AA] text-white rounded-2xl border-2 border-[#1E78AA] hover:bg-[#2B517E] transition-all duration-300"
      >
        <p className="text-2xl font-medium">{info?.phoneNumber}</p>
      </a>
    </div>
  );
};

export default CallSection;
