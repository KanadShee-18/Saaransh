"use server";

import { getDatabaseConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-filename";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PDFSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

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

    const formattedFileName = formatFileNameAsTitle(pdfName);

    return {
      success: true,
      message: "Summary has been generated successfully!",
      data: {
        title: formattedFileName,
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

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummary) {
  try {
    const sql = await getDatabaseConnection();
    const result = await sql`
      INSERT INTO pdf_summaries 
        (user_id, original_file_url, summary_text, title, file_name)
      VALUES 
        (
          ${userId},
          ${fileUrl},
          ${summary},
          ${title},
          ${fileName}
        ) RETURNING id, summary_text;
    `;
    console.log("result saved in db: ", result);
    return {
      success: true,
      message: "PDF summary saved successfully!",
      data: {
        id: result[0].id,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Problem occurred to store PDF in database!",
    };
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PDFSummary) {
  // let savePdfSummaryResponse;
  let savePdfSummaryResponse: {
    success: boolean;
    message: string;
    data: { id: string } | null;
  } | null = null;

  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User have to be authenticated!",
      };
    }
    savePdfSummaryResponse = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    console.log("savePdfSummaryResponse: ", savePdfSummaryResponse);
    if (!savePdfSummaryResponse) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Problem occurred to store PDF in database!",
    };
  }

  // revalidate our cache
  if (savePdfSummaryResponse?.success && savePdfSummaryResponse?.data?.id) {
    revalidatePath(`/summaries/${savePdfSummaryResponse.data.id}`);
  }

  return {
    success: true,
    message: "PDF summary saved successfully!",
    data: {
      id: savePdfSummaryResponse?.data?.id,
    },
  };
}
