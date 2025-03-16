"use client";

import { Card } from "@/components/ui/card";
import { DeleteBtn } from "@/components/summary/delete-button";
import Link from "next/link";
import { FileTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/utils/format-filename";
import { SUMMARY } from "@/utils/types";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileTextIcon className="!size-6 sm:!size-8 text-rose-500 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-800 truncate w-4/5">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="tetx-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize",
        status.toLowerCase() === "completed"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export const SummaryCard = ({ summary }: { summary: SUMMARY }) => {
  console.log("Summary in card: ", summary);

  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteBtn summaryId={summary.id} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="tetx-sm sm:text-base pl-2 line-clamp-2 font-medium text-gray-600">
              {summary.summary_text}
            </p>
            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};
