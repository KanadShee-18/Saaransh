import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "@/components/common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <MotionDiv
        variants={itemVariants}
        className="flex items-center justify-center"
      >
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-200 transition-colors duration-200"
          >
            <Sparkles className="!size-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base font-semibold text-rose-600">
              Powered by AI
            </p>
          </Badge>
        </div>
      </MotionDiv>
      <MotionH1 className="font-bold py-6 text-center text-slate-800">
        Transform your PDFs into
        <span className="inline-block relative">
          <MotionSpan
            whileHover={buttonVariants}
            className="relative z-10 px-2"
          >
            concise
          </MotionSpan>{" "}
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>{" "}
        </span>
        summaries with Saaransh
      </MotionH1>
      <MotionH2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of your document in seconds.
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 transition-all duration-300 font-bold hover:no-underline group shadow-lg"
        >
          <Link href={"/#pricing"} className="flex gap-2 items-center">
            <span className="tracking-wide">Try Saaransh</span>
            <ArrowRight className="animate-pulse group-hover:translate-x-1 transition-all group-hover:animate-none group-hover:duration-300 group-hover:scale-110" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
