"use client";

import { Suspense, useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
// @ts-ignore - Cashfree SDK has incomplete or incorrect TypeScript definitions
import { load } from "@cashfreepayments/cashfree-js";
import { useUser } from "@clerk/nextjs";

function PaymentContent() {
  const { isSignedIn, user, isLoaded } = useUser();
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
            order_id: `order_${uuidv4()}`,
            order_amount: price,
            customer_id: `cust_${uuidv4()}`,
            customer_email: user?.emailAddresses.toString(),
            customer_phone: "1234567890",
          }),
        });

        const data = await response.json();

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

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
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

  useEffect(() => {
    if (!paymentSessionId || !cashfree) return;

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self",
    });
  }, [paymentSessionId, cashfree]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment for {plan}</h1>
      <p className="text-lg mb-4">Amount: ₹{price}</p>
      {loading && <p>Loading payment gateway...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment page...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
