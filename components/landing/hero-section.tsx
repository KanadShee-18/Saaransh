import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex items-center justify-center">
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
      </div>
      <h1 className="font-bold py-6 text-center text-slate-800">
        Transform your PDFs into
        <span className="inline-block relative">
          <span className="relative z-10 px-2">concise</span>{" "}
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>{" "}
        </span>
        summaries with Saaransh
      </h1>
      <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of your document in seconds.
      </h2>
      <div>
        <Button
          variant={"link"}
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 transition-all duration-300 font-bold hover:no-underline group shadow-lg"
        >
          <Link href={"/pricing"} className="flex gap-2 items-center">
            <span>Try Saaransh</span>
            <ArrowRight className="animate-pulse group-hover:translate-x-1 transition-all group-hover:animate-none group-hover:duration-300 group-hover:scale-110" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
