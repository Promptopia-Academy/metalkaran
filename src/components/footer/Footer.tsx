import Link from "next/link";
import Image from "next/image";
import { XsocialIcon } from "@/components/icons/XsocialIcon";
import { COMPANY_INFORMATION, LOGO_IMAGE } from "@/lib/constants";
import type { ICompanyInformation } from "@/types/type";
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

type FooterProps = {
  companyInfo?: ICompanyInformation | null;
};

const Footer = ({ companyInfo: propCompanyInfo }: FooterProps) => {
  const companyInfo = propCompanyInfo ?? COMPANY_INFORMATION;
  const socialLinks = companyInfo.socialLinks ?? [];

  return (
    <div className="w-full min-h-60 mt-5 flex flex-col md:flex-row justify-between px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 rounded-t-2xl py-6 md:py-8 bg-primary gap-8 md:gap-16 lg:gap-32 xl:gap-52">
      <div id="left" className="flex flex-col w-full order-2 md:order-1">
        <div
          id="top"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
        >
          <Link href="/" className="flex-shrink-0">
            <Image
              src={LOGO_IMAGE.src}
              alt={LOGO_IMAGE.alt}
              width={100}
              height={33}
              className="sm:w-[110px] md:w-[120px]"
            />
          </Link>

          <div
            className="flex flex-col justify-between font-bold text-sm sm:text-base md:text-lg text-background gap-2 md:gap-4 text-center sm:text-right"
            dir="rtl"
          >
            <p>
              شماره تماس :<a href={`tel:${companyInfo.phoneNumber}`}> {companyInfo.phoneNumber}</a>
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              آدرس ایمیل :
              <a href={`mailto:${companyInfo.emailAddress}`}> {companyInfo.emailAddress}</a>
            </p>
            {(companyInfo.companyAddress != null && companyInfo.companyAddress !== "") && (
              <p className="text-xs sm:text-sm md:text-base">
                آدرس شرکت : {companyInfo.companyAddress}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-[2px] bg-background my-4 md:mb-4"></div>
        {socialLinks.length > 0 && (
          <div className="flex gap-8 sm:gap-12 md:gap-16 justify-center sm:justify-start">
            {socialLinks[0] && (
              <Link href={socialLinks[0].url}>
                <InstagramLogoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-background cursor-pointer transition-all duration-200 ease-out hover:text-primary-secondary hover:scale-110 hover:rotate-6" />
              </Link>
            )}
            {socialLinks[1] && (
              <Link href={socialLinks[1].url}>
                <LinkedInLogoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-background cursor-pointer transition-all duration-200 ease-out hover:text-primary-secondary hover:scale-110 hover:-rotate-6" />
              </Link>
            )}
            {socialLinks[2] && (
              <Link href={socialLinks[2].url}>
                <XsocialIcon className="w-5 h-5 sm:w-6 sm:h-6 text-background cursor-pointer transition-all duration-200 ease-out hover:text-primary-secondary hover:scale-110 hover:rotate-3" />
              </Link>
            )}
          </div>
        )}
      </div>
      <div
        id="right"
        className="flex flex-col gap-3 md:gap-4 text-background font-bold text-base md:text-lg min-w-36 order-1 md:order-2 items-center md:items-start"
        dir="rtl"
      >
        <Link
          className="transition-all duration-200 hover:text-primary-secondary hover:translate-x-1"
          href="/contact-us"
        >
          تماس با ما
        </Link>
        <Link
          className="transition-all duration-200 hover:text-primary-secondary hover:translate-x-1"
          href="/products"
        >
          محصولات
        </Link>
        <Link
          className="transition-all duration-200 hover:text-primary-secondary hover:translate-x-1"
          href="/questions"
        >
          سوالات متداول
        </Link>
        <Link
          className="transition-all duration-200 hover:text-primary-secondary hover:translate-x-1"
          href="/about-us"
        >
          درباره ما
        </Link>
      </div>
    </div>
  );
};

export default Footer;
