import Banner from "@/context/Banner";
import type { ITextsProps } from "@/types/type";

const Texts = ({ article, dir }: ITextsProps) => {
  const header =
    (article.title || article.title1 || article.applicationTitle || "").trim() ||
    undefined;
  const content = (article.introduction || article.content1 || "").trim() || undefined;
  const bulletPoints = article.application?.map((a) => a.faTitle);
  const banner = article.image;
  const hasText =
    !!header ||
    !!content ||
    !!(bulletPoints && bulletPoints.length > 0);
  const showTextBlock = hasText || !!banner;

  return (
    <>
      {banner && (
        <div className="my-10 flex items-center justify-center">
          <Banner imageSrc={banner} width={1150} height={400} />
        </div>
      )}
      {showTextBlock && (
        <div dir={dir}>
          {header && <h2 className="text-4xl font-bold mb-4 my-4">{header}</h2>}
          {content && <p className="mb-4 text-2xl">{content}</p>}
          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="list-disc list-inside">
              {bulletPoints.map((point, index) => (
                <li className="text-2xl" key={index}>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Texts;
