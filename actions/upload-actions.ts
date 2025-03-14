"use server";

import { fetchExtractPdfText } from "@/lib/langchain";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: pdfName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }

  try {
    const pdfText = await fetchExtractPdfText(pdfUrl);
    console.log("PDF Text: ", pdfText);
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }
}
