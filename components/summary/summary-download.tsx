"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadSummaryButton = ({
  title,
  summaryText,
  createdAt,
  fileName,
}: {
  title: string;
  summaryText: string;
  createdAt: string;
  fileName: string;
}) => {
  const handleSummaryDownload = () => {
    const summaryContent = `# ${title}
Generated Summary:
Generated on: ${new Date(createdAt).toLocaleString()}
  
${summaryText}
  
Original File: ${fileName}
Generated by Saaransh
    `;

    const blob = new Blob([summaryContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Summary-${title.replace(/[^a-z0-9]/gi, "_")}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      size={"sm"}
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:shadow-md"
      onClick={handleSummaryDownload}
    >
      <Download className="!size-4 mr-1" />
      Download Summary
    </Button>
  );
};
