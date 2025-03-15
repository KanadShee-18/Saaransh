"use server";

import { getDatabaseConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction(summaryId: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return {
        success: false,
        message: "User must be authenticated!",
      };
    }
    // delete from db
    const sql = await getDatabaseConnection();
    const result = await sql`
        DELETE FROM pdf_summaries
        WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id`;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Summary deleted successfully!",
      };
    }
    return {
      success: false,
      message: "Summary cannot be deleted!",
    };
  } catch (error) {
    console.error("Error deleting summary: ", error);
    return {
      success: false,
      message: "Error deleting summary!",
    };
  }
}
