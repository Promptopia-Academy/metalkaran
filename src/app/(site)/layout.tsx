import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AnimatedSection from "@/components/ui/animated-section";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <AnimatedSection delay={0.1} variant="fade">
          <Footer />
        </AnimatedSection>
      </footer>
    </>
  );
}
