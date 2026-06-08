import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AnimatedSection from "@/components/ui/animated-section";
import { getCategoriesForSite } from "@/lib/cms/categoryApi";
import { getSiteWebsiteContent } from "@/lib/dev/getData";
import type { ICategory } from "@/types/type";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, siteContent] = await Promise.all([
    getCategoriesForSite(),
    getSiteWebsiteContent(),
  ]);

  const logoImage = siteContent?.logoImage ?? null;

  return (
    <>
      <header>
        <Header categories={categories as ICategory[]} logoImage={logoImage} />
      </header>
      <main>{children}</main>
      <footer>
        <AnimatedSection delay={0.1} variant="fade">
          <Footer  />
        </AnimatedSection>
      </footer>
    </>
  );
}
