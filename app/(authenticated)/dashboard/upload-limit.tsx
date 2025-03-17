"use client";

import { ArrowRight, Crown } from "lucide-react";
import { UploadLimitResponse } from "@/lib/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface UploadLimitProps {
  uploadLimitResponse: UploadLimitResponse;
}

export const UploadLimitReached = ({
  uploadLimitResponse,
}: UploadLimitProps) => {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    if (uploadLimitResponse.allowed && uploadLimitResponse.data === null) {
      setPro(true);
    }
  }, [uploadLimitResponse]);

  const uploadCount = uploadLimitResponse.data?.uploadCount ?? 0;
  const limit = uploadLimitResponse.data?.limit ?? 10;

  return (
    <div
      className={cn(
        "bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800",
        pro && "bg-emerald-50/50 border-emerald-200 text-emerald-600"
      )}
    >
      {pro ? (
        <p className="text-center flex items-center">
          You are on the
          <span className="text-sm mx-2 flex items-center text-slate-700 font-medium bg-amber-100 px-1 rounded-lg shadow-sm border border-amber-300">
            Pro
            <Crown className="!size-4 mx-1 text-amber-600" />
          </span>{" "}
          plan. Enjoy unlimited uploads for your PDFs.
        </p>
      ) : (
        <p className="text-sm font-medium md:leading-normal leading-7">
          {uploadLimitResponse.allowed ? (
            <>
              You&apos;ve used {uploadCount} out of {limit} uploads on the Basic
              plan.
            </>
          ) : (
            <>
              <span className="text-red-600 font-semibold">
                Upload limit reached!{" "}
              </span>
              You have used {uploadCount} out of {limit} uploads today.
            </>
          )}
          <Link
            href={"/#pricing"}
            className="mx-2 bg-rose-100 hover:bg-rose-300 shadow-sm shadow-rose-300 hover:shadow-rose-500 transition-all duration-300 px-2 py-1 gap-1 rounded-lg group"
          >
            Upgrade to Pro{" "}
            <ArrowRight className="!size-4 inline-block group-hover:translate-x-1 transition-all duration-300" />{" "}
          </Link>
          for unlimited uploads.
        </p>
      )}
    </div>
  );
};
