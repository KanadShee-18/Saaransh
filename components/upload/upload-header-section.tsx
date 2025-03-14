import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export const UploadHeader = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-200 transition-colors duration-200"
          >
            <Sparkles className="!size-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base font-semibold text-rose-600">
              AI-Powered PDF Summarizer
            </p>
          </Badge>
        </div>
      </div>
      <div className="flex flex-col capitalize items-center justify-center space-y-4 mt-12">
        <h1 className="text-4xl text-slate-800 font-bold text-center">
          Start Uploading{" "}
          <span className="inline-block relative">
            <span className="relative z-10 px-2">Your PDFs</span>{" "}
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-1 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>{" "}
          </span>
        </h1>
        <p className="text-center mt-2 text-lg leading-8 text-gray-600 max-w-2xl font-medium">
          Upload your PDF and let our AI do the magic! ✨
        </p>
      </div>
    </>
  );
};
