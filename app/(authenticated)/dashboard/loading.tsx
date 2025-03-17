import { BgGradient } from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";

function HeaderLoadingSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          whileInView={"visible"}
          className="bg-gradient-to-r from-gray-600 to-slate-900 text-transparent bg-clip-text text-4xl tracking-tight font-bold"
        >
          <div className="h-10 rounded-lg w-48 animate-pulse bg-gradient-to-r from-gray-200 to-slate-300" />
        </MotionH1>
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          animate={"visible"}
          className="font-semibold text-gray-600"
        >
          <Skeleton className="h-6 rounded-lg w-96 animate-pulse bg-gradient-to-r from-gray-300 to-slate-400" />
        </MotionH1>
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="self-start my-12"
        >
          <Skeleton className="h-10 rounded-lg w-32 md:w-64 animate-pulse bg-gradient-to-r from-slate-300 to-slate-100" />
        </MotionDiv>
      </div>
    </div>
  );
}

function SummaryCardLoadingSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border bg-rose-200 text-card-foreground shadow-sm"
    >
      <Skeleton className="h-48 w-full bg-gradient-to-br from-slate-200 to-rose-50 animate-pulse rounded-lg" />
    </MotionDiv>
  );
}

export default function DashboardLoading() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <section className="container mx-auto px-10 py-24 flex flex-col gap-4">
        <HeaderLoadingSkeleton />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:px-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <SummaryCardLoadingSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
