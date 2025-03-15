import { FileIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EmptySummaryState = () => {
  return (
    <div className="text-center py-12">
      <div className="flex flex-col gap-3 items-center">
        <FileText className="size-16 text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-800">
          No Summeries Yet
        </h2>
        <p className="font-semibold text-slate-600">
          Upload your first PDF to get started with AI-powered summaries.
        </p>
        <Link href="/upload">
          <Button
            variant={"link"}
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Create Your First Summary
            <FileIcon className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
