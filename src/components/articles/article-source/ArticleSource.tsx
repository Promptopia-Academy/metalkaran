import Link from "next/link";
import type { IArticleSource } from "@/types/type";

const ArticleSource = ({ source }: { source: IArticleSource }) => {
  return (
    <Link
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#2C5D3F] text-white text-[16px] font-normal px-3 py-2 rounded-lg inline-block hover:bg-[#2C5D3F]/80 transition-all duration-300"
    >
      {source.title}
    </Link>
  );
};

export default ArticleSource;
