import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base/relaxed xl:text-xl/relaxed">
              Transform lengthy documents into concise summaries with our
              AI-powered tool.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div>
              <Button
                size={"lg"}
                variant={"link"}
                className="hover:no-underline text-white group w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 transition-all duration-300"
              >
                <Link
                  href={"/#pricing"}
                  className="flex items-center gap-2 px-6 py-4"
                >
                  Get Started{" "}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform group-hover:duration-300 animate-pulse group-hover:animate-none" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
