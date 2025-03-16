import { USE_PAYMENT_MODE } from "@/utils/use-base-url";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
