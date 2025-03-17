"use server";

import { getDatabaseConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { hasReachedUploadLimit } from "@/lib/user";
import { formatFileNameAsTitle } from "@/utils/format-filename";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PDFSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
  email?: string;
}

export async function generatePdfText({
  fileUrl
}: {
  fileUrl: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload Failed!",
      data: null,
    };
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    return {
      success: false,
      message: "User email not found!",
      data: null,
    };
  }

  // Check if the user has reached their upload limit
  const uploadLimitResponse = await hasReachedUploadLimit(email);

  if (!uploadLimitResponse.allowed) {
    return {
      success: false,
      message: "Upload limit reached for today!",
      data: null,
    };
  }

  try {
    const pdfText = await fetchExtractPdfText(fileUrl);
    console.log("PDF Text: ", pdfText);
    if (!pdfText) {
      return {
        success: false,
        message: "Failed to fetch and extract text from PDF!",
        data: null,
      };
    }
    return {
      success: true,
      message: "Pdf text has been generated successfully!",
      data: {
        pdfText,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Pdf text extraction failed!",
      data: null,
    };
  }
}

export async function generatePdfSummary({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) {
  try {
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
        title: fileName,
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
  email,
}: PDFSummary) {
  try {
    const sql = await getDatabaseConnection();
    const result = await sql`
      INSERT INTO pdf_summaries 
        (user_id, original_file_url, summary_text, title, file_name, email)
      VALUES 
        (
          ${userId},
          ${fileUrl},
          ${summary},
          ${title},
          ${fileName},
          ${email}
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
  email,
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
    if (!email) {
      return {
        success: false,
        message: "Email is required to save PDF summary!",
      };
    }
    savePdfSummaryResponse = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
      email,
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
