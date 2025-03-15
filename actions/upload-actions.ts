"use server";

import { fetchExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

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

    let summary;
    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log("Summary from OPEN AI: ", summary);
    } catch (error) {
      console.log(
        "Error in generating summary from OPEN AI in server action: ",
        error
      );
      // Call gemini api here
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary!",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }
}
