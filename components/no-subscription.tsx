"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle } from "lucide-react";
import Link from "next/link";

export const UpgradeRequired = () => {
  return (
    <div className="flex relative flex-col px-4 pt-16 md:pt-24 gap-4 items-center justify-center h-full min-h-1/2">
      <div className="flex items-center gap-2">
        <Sparkle className="size-7 text-rose-500 animate-pulse" />
        <p className="text-sm font-semibold">PREMIUM FEATURE</p>
      </div>
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-500 bg-clip-text text-transparent">
        <h1 className="font-bold text-2xl md:text-3xl">
          Subscription Required
        </h1>
      </div>
      <div className="p-4 md:p-6 border border-rose-200 bg-gradient-to-r from-rose-50/60 via-indigo-50 to-slate-50/80 rounded-lg">
        <p className="text-sm text-slate-600">
          You need to{" "}
          <span className="font-bold">
            Upgrade to the Basic Plan or the Pro Plan
          </span>{" "}
          to access this feature 💖
        </p>
      </div>
      <Link href={"/#pricing"}>
        <Button className="mt-4 bg-linear-to-r from-rose-500 to-rose-700 hover:from-slate-800 hover:to-rose-500 group">
          View Pricing Plans
          <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-all duration-300" />
        </Button>
      </Link>
    </div>
  );
};
