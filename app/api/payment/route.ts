import { NextResponse } from "next/server";
import { USE_BASE_URL } from "@/utils/use-base-url";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const user = await sql`SELECT * FROM users WHERE id = ${userId}`;

    const {
      order_id,
      order_amount,
      customer_id,
      customer_phone,
      customer_email,
    } = await req.json();

    console.log("Received payment request:", {
      order_id,
      order_amount,
      customer_id,
      customer_phone,
    });

    const cashfreeEndpoint =
      process.env.NEXT_PUBLIC_CASHFREE_MODE === "TEST"
        ? "https://sandbox.cashfree.com/pg/orders"
        : "https://api.cashfree.com/pg/orders";

    console.log("Cashfree API Endpoint:", cashfreeEndpoint);

    console.log("next public base url: ", USE_BASE_URL);

    const response = await fetch(cashfreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2025-01-01",
      },
      body: JSON.stringify({
        order_id,
        order_amount: Number(order_amount),
        order_currency: "INR",
        customer_details: {
          customer_id,
          customer_phone,
          customer_email,
        },
        order_meta: {
          return_url: `${USE_BASE_URL}/payment-success?order_id=${order_id}`,
        },
      }),
    });

    const data = await response.json();
    console.log("Full Cashfree response:", JSON.stringify(data, null, 2));

    if (data?.payment_session_id) {
      return NextResponse.json({
        success: true,
        data: { payment_session_id: data.payment_session_id },
      });
    } else {
      console.log("Error in Cashfree response:", data);
      return NextResponse.json({
        success: false,
        error: data.error || data.message || "Unknown error from Cashfree",
      });
    }
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
