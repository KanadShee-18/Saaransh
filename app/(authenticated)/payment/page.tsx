"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get("price");
  const plan = searchParams.get("plan");

  const price = Number(priceParam);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cashfree, setCashfree] = useState<any>(null);

  useEffect(() => {
    const createPaymentSession = async () => {
      if (!price || isNaN(price) || !plan) {
        setError("Invalid price or missing plan.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: `order_${Date.now()}`,
            order_amount: price,
            customer_id: `cust_${Date.now()}`,
            customer_phone: "1234567890",
            return_url: `${
              window.location.origin
            }/payment-success?order_id=order_${Date.now()}`,
          }),
        });

        const data = await response.json();
        console.log("Cashfree API Response:", data);

        if (data.data?.payment_session_id) {
          setPaymentSessionId(data.data.payment_session_id);
        } else {
          throw new Error(data.error || "Payment initiation failed.");
        }
      } catch (error) {
        console.error("Payment initiation error:", error);
        setError(error instanceof Error ? error.message : "Unexpected error.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentSession();
  }, [price, plan]);

  // Load Cashfree SDK once when component mounts
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        console.log("🚀 Initializing Cashfree...");
        const cashfreeInstance = await load({
          mode:
            process.env.NEXT_PUBLIC_CASHFREE_MODE === "TEST"
              ? "sandbox"
              : "production",
        });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("❌ Cashfree SDK error:", error);
        setError("Error loading Cashfree SDK.");
      }
    };

    initializeCashfree();
  }, []);

  // Trigger payment when session ID is available
  useEffect(() => {
    if (!paymentSessionId || !cashfree) return;

    console.log("✅ Cashfree SDK loaded. Starting payment...");

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self", // Open in the same tab
    });
  }, [paymentSessionId, cashfree]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment for {plan}</h1>
      <p className="text-lg mb-4">Amount: ₹{price}</p>

      {loading && <p>Loading payment gateway...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
