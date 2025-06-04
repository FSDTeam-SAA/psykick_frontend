import HeroSection from "@/components/common/layout/HeroSection";
import AboutRemotView from "./_components/AboutRemotView/AboutRemotView";
import Faq from "./_components/CuriousAboutRemoteViewing/Faq";
import Toastbynotification from "@/components/toastbynotification";

export default function Home() {
  return (
    <div className="pt-[-61px]">
      <Toastbynotification/>
      <HeroSection />
      <AboutRemotView />
      <Faq />
    </div>
  );
}
