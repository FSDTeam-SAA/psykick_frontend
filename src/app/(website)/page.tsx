import HeroSection from "@/components/common/layout/HeroSection";
import AboutRemotView from "./_components/AboutRemotView/AboutRemotView";
import Faq from "./_components/Faq/Faq";

export default function Home() {
  return (
    <div className="pt-[-61px]">
      <HeroSection />
      <AboutRemotView />
      <Faq />
    </div>
  );
}
