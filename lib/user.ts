import { getDatabaseConnection } from "@/lib/db";

export const getPriceIdByEmail = async (email: string) => {
  const sql = await getDatabaseConnection();

  const query =
    await sql`SELECT price_id FROM users where email = ${email} AND status = 'active' ORDER BY created_at DESC LIMIT 1`;

  return query?.[0]?.price_id || null;
};

export const getUserByEmail = async (email: string) => {
  const sql = await getDatabaseConnection();

  const query = await sql`SELECT * FROM users where email = ${email}`;
  return query?.[0] || null;
};

export type UploadLimitResponse = {
  allowed: boolean;
  data: { uploadCount: number; limit: number } | null;
};

export const hasReachedUploadLimit = async (
  email: string
): Promise<UploadLimitResponse> => {
  const sql = await getDatabaseConnection();

  const query =
    await sql`SELECT * FROM users WHERE email = ${email} AND status = 'active'`;

  if (query.length === 0) return { allowed: false, data: null };

  const user = query[0];

  if (user.price_id === "pro") {
    return { allowed: true, data: null };
  }

  if (user.price_id === "basic") {
    const today = new Date().toISOString().split("T")[0];

    const uploadCountQuery = await sql`
        SELECT COUNT(*) FROM pdf_summaries WHERE email = ${email} AND DATE(created_at) = ${today}
      `;

    const uploadCount = Number(uploadCountQuery[0]?.count) || 0;

    return { allowed: uploadCount < 10, data: { uploadCount, limit: 10 } };
  }

  return { allowed: false, data: null };
};
