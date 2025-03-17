import { BgGradient } from "@/components/common/bg-gradient";
import { EmptySummaryState } from "@/components/summary/empty-state";
import { SummaryCard } from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { SUMMARY } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  hasReachedUploadLimit,
  UploadLimitResponse,
} from "@/lib/user";
import { UploadLimitReached } from "./upload-limit";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const summaries: SUMMARY[] = await getSummaries(userId);

  const uploadLimitResponse: UploadLimitResponse = await hasReachedUploadLimit(
    email
  );

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex flex-col gap-4"
      >
        <div className="px-2 py-12 sm:py-24">
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView={"visible"}
                className="bg-gradient-to-r from-gray-600 to-slate-900 text-transparent bg-clip-text text-4xl tracking-tight font-bold"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate={"visible"}
                className="font-semibold text-gray-600"
              >
                Transform your PDFs into{" "}
                <span className="text-rose-500">concise, actionable</span>{" "}
                insights with your friend{" "}
                <span className="text-rose-500">Saaransh</span>
              </MotionP>
            </div>

            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              className="self-start"
            >
              <Button
                className="group w-full md:w-auto hover:no-underline linear-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-900 hover:to-rose-500 hover:scale-105 transition-all duration-300"
                variant={"link"}
              >
                <Link
                  href="/upload"
                  className="flex items-center gap-2 text-white no-underline"
                >
                  <PlusIcon className="!w-5 !h-5 group-hover:scale-110 transition-all duration-300" />
                  New Summary
                </Link>
              </Button>
            </MotionDiv>
          </div>

          <MotionDiv
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <UploadLimitReached uploadLimitResponse={uploadLimitResponse} />
          </MotionDiv>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0 md:pt-10 pt-6">
            {summaries.length > 0 ? (
              summaries.map((summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <EmptySummaryState />
              </div>
            )}
          </div>
        </div>
      </MotionDiv>
    </main>
  );
}
