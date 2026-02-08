import Banner from "@/context/Banner";
import type { ITextsProps } from "@/types/type";

const EXTRA_CONTENT_SECTIONS = [
  { title: "title2", content: "content2" },
  { title: "title3", content: "content3" },
  { title: "title4", content: "content4" },
  { title: "title5", content: "content5" },
] as const;

const Texts = ({ article, dir }: ITextsProps) => {
  const mainTitle =
    (article.title || article.title1 || article.applicationTitle || "").trim() ||
    undefined;
  const introduction = (article.introduction || "").trim() || undefined;
  const content1 = (article.content1 || "").trim() || undefined;
  const applications = article.application ?? [];
  const banner = article.image;
  const sources = (article.sources || "").trim() || undefined;

  const hasMainContent =
    !!mainTitle ||
    !!introduction ||
    !!content1 ||
    applications.length > 0 ||
    !!sources;
  const hasExtraSections = EXTRA_CONTENT_SECTIONS.some(
    (s) =>
      !!((article as unknown as Record<string, string | undefined>)[s.title]?.trim() || (article as unknown as Record<string, string | undefined>)[s.content]?.trim())
  );
  const hasAnyContent = hasMainContent || hasExtraSections || !!banner;

  if (!hasAnyContent) return null;

  return (
    <div dir={dir} className="space-y-8">
      {banner && (
        <div className="flex items-center justify-center">
          <Banner imageSrc={banner} width={1150} height={400} />
        </div>
      )}

      {(hasMainContent || hasExtraSections) && (
        <div className="space-y-6">
          {mainTitle && (
            <h2 className="text-4xl font-bold mb-4">{mainTitle}</h2>
          )}
          {introduction && (
            <p className="mb-4 text-2xl">{introduction}</p>
          )}
          {content1 && (
            <p className="mb-4 text-2xl">{content1}</p>
          )}

          {EXTRA_CONTENT_SECTIONS.map((section) => {
            const articleRecord = article as unknown as Record<string, string | undefined>;
            const title = articleRecord[section.title]?.trim();
            const content = articleRecord[section.content]?.trim();
            if (!title && !content) return null;
            return (
              <div key={section.title}>
                {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}
                {content && <p className="text-xl">{content}</p>}
              </div>
            );
          })}

          {applications.length > 0 && (
            <ul className="list-disc list-inside space-y-2">
              {applications.map((item) => (
                <li className="text-2xl" key={item.id}>
                  {item.faTitle}
                  {item.description?.trim() && (
                    <span className="block text-xl mt-1 text-muted-foreground pr-4">
                      {item.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {sources && (
            <div className="mt-6 pt-4 border-t">
              <p className="text-lg text-muted-foreground">{sources}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Texts;
