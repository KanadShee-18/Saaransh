import { getDatabaseConnection } from "@/lib/db";
import { SUMMARY } from "@/utils/types";

export async function getSummaries(userId: string): Promise<SUMMARY[]> {
  const sql = await getDatabaseConnection();
  const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId} ORDER BY created_at DESC
    `;
  return summaries as SUMMARY[];
}
