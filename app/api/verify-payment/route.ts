import { getDatabaseConnection } from "@/lib/db";
import { USE_PAYMENT_MODE } from "@/utils/use-base-url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sql = await getDatabaseConnection();
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    console.log("Verifying order:", order_id);

    const cashfreeEndpoint =
      USE_PAYMENT_MODE === "TEST"
        ? `https://sandbox.cashfree.com/pg/orders/${order_id}`
        : `https://api.cashfree.com/pg/orders/${order_id}`;

    console.log("Cashfree App ID:", process.env.CASHFREE_APP_ID);
    console.log("Cashfree Secret Key:", process.env.CASHFREE_SECRET_KEY);
    console.log("Cashfree Mode:", process.env.CASHFREE_MODE);

    const response = await fetch(cashfreeEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("❌ Cashfree API Error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch order" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("✅ Cashfree API Response:", data);

    if (data.order_status === "PAID") {
      const { order_amount, customer_details } = data;
      const { customer_email, customer_id } = customer_details;

      // Insert into payment table
      const newPlan = order_amount === 99 ? "basic" : "pro";

      console.log("Customer email is: ", customer_email);

      await sql`
      INSERT INTO payments (cashfree_payment_id, amount, status, price_id, user_email, created_at, updated_at)
      VALUES (${order_id}, ${order_amount}, 'SUCCESS', ${newPlan}, ${customer_email}, NOW(), NOW())`;

      await sql`
        UPDATE users 
        SET status = 'active', customer_id = ${customer_id}, updated_at = NOW()
        WHERE email = ${customer_email}`;

      // Update user status
      await sql`
        UPDATE users 
        SET status = 'active', 
        price_id = ${newPlan}, 
        updated_at = NOW()
        WHERE email = ${customer_email}`;

      return NextResponse.json({
        success: true,
        message: "Payment verified and plan updated successfully!",
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
