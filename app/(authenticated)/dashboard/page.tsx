import { BgGradient } from "@/components/common/bg-gradient";
import { SummaryCard } from "@/components/summary/summary-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const uploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "The Future of AI",
      summary_text:
        "The future of AI is bright. It will be used to help us with our daily lives and make our lives easier.",
      status: "completed",
    },
    {
      id: 2,
      title: "AI and the Future of Work",
      summary_text:
        "AI will change the way we work. It will be used to help us with our daily lives and make our lives easier.",
      status: "completed",
    },
    {
      id: 3,
      title: "Challenges of AI",
      summary_text:
        "AI will change the way we work. It will be used to help us with our daily lives and make our lives easier.",
      status: "completed",
    },
    {
      id: 4,
      title: "Digital Marketing Trends",
      summary_text:
        "Digital marketing is changing the way we market our products and services. It is becoming more important to have a strong online presence.",
      status: "completed",
    },
  ];
  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="bg-gradient-to-r from-gray-600 to-slate-900 text-transparent bg-clip-text text-4xl tracking-tight font-bold">
                Your Summaries
              </h1>
              <p className="font-semibold text-gray-600">
                Transform your PDFs into{" "}
                <span className="text-rose-500">concise, actionable</span>{" "}
                insights with your friend{" "}
                <span className="text-rose-500">Saaransh</span>
              </p>
            </div>

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
          </div>
          <div className="mb-6">
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
              <p className="text-sm font-medium md:leading-normal leading-7">
                You've reached the limit of {uploadLimit} uploads on the Basic
                plan.
                <Link
                  href={"/#pricing"}
                  className="mx-2 bg-rose-100 hover:bg-rose-300 shadow-sm shadow-rose-300 hover:shadow-rose-500 transition-all duration-300 px-2 py-1 gap-1 rounded-lg group"
                >
                  Upgrade to Pro{" "}
                  <ArrowRight className="!size-4 inline-block group-hover:translate-x-1 transition-all duration-300" />{" "}
                </Link>
                for unlimited uploads.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
