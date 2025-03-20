import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeftIcon, Clock, Sparkles } from "lucide-react";

export const SummaryHeader = ({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) => {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-sm ml-3">
          <div className="transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="p-0.5 bg-gradient-to-br from-amber-300 via-emerald-300 to-indigo-300 rounded-lg">
              <span className="w-fit rounded-lg bg-white flex gap-1 items-center text-slate-700 font-semibold px-2 py-1">
                <Sparkles className="!size-4 mr-1.5 text-rose-500 animate-pulse" />
                AI Summary
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="!size-4 text-rose-400" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Clock className="!size-4 text-rose-400" />
            {readingTime} {readingTime === 1 ? "minute" : "minutes"} read
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-linear-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div className="self-start">
        <Link href={"/dashboard"}>
          <Button
            variant={"link"}
            size={"sm"}
            className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-rose-100/30 bg-rose-100 px-2 sm:px-3"
          >
            <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Back <span className="hidden sm:inline">to Summaries</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
