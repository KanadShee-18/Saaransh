import { getDatabaseConnection } from "@/lib/db";
import { SUMMARY } from "@/utils/types";

export async function getSummaries(userId: string): Promise<SUMMARY[]> {
  const sql = await getDatabaseConnection();
  const summaries = await sql`
      SELECT * FROM pdf_summaries
      WHERE user_id = ${userId} ORDER BYcreated_at DESC
    `;
  return summaries as SUMMARY[];
}

export async function getSummaryById(id: string): Promise<SUMMARY | null> {
  try {
    const sql = await getDatabaseConnection();
    const [summary] = await sql`SELECT 
    id, 
    user_id, 
    title, 
    original_file_url, 
    summary_text, 
    status, 
    created_at, 
    updated_at, 
    file_name, 
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
    FROM pdf_summaries where id=${id}`;
    return summary as SUMMARY;
  } catch (error) {
    console.log("Error fetching summary by id: ", error);
    return null;
  }
}
