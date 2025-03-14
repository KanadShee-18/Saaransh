import { BgGradient } from "@/components/common/bg-gradient";
import { DemoSection } from "@/components/landing/demo-section";
import { HeroSection } from "@/components/landing/hero-section";
import { WorkingProcess } from "@/components/landing/how-it-works";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <WorkingProcess />
      </div>
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
    </div>
  );
}
