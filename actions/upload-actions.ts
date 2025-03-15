"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
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
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
          console.log("Summary from GEMINI: ", summary);
        } catch (error) {
          console.log(
            `Gemini API failed after OpenAI api quota exceeded ${error}`
          );
          throw new Error(
            "Failed to generate summary with available AI providers!"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary!",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary has been generated successfully!",
      data: {
        summary,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }
}
