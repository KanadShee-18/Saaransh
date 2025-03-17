"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      toast.error(
        <span className="text-rose-400">
          Order ID not found. Please contact support.
        </span>
      );
      return;
    }

    const verifyPayment = async () => {
      setIsLoading(true);

      try {
        const res = await axios.post("/api/verify-payment", {
          order_id: orderId,
        });
        console.log("Data from verify-payment: ", res.data);

        if (res?.data?.success) {
          setStatus("VERIFIED");
          setIsLoading(false);
          toast.message(
            <span className="text-rose-400">
              ✅ Payment Verified! Redirecting to Dashboard...
            </span>,
            {
              description: (
                <span className="text-slate-500">
                  We have verified your payment.
                </span>
              ),
            }
          );
          setTimeout(() => router.push("/dashboard"), 2000);
        } else {
          setStatus("FAILED");
          setIsLoading(false);
          toast.error("Payment verification failed. Please contact support.");
          setTimeout(() => router.push("/dashboard"), 5000);
        }
      } catch (error) {
        setStatus("FAILED");
        toast.error(
          <span className="text-rose-400">
            Payment verification failed. Please contact us.
          </span>
        );

        let errorMessage =
          "Something went wrong! Please try again or contact support ⚠️";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Handle specific HTTP error codes
            if (error.response.status === 404) {
              errorMessage = "Order not found. Please check your order ID.";
            } else if (error.response.status === 400) {
              errorMessage = "Invalid request. Please try again.";
            } else if (error.response.status === 401) {
              errorMessage = "Authentication failed. Please contact support.";
            } else {
              errorMessage = "Payment verification failed. Please try again.";
            }
          } else if (error.request) {
            errorMessage =
              "Network issue! Unable to connect to the server. Please check your internet connection.";
          } else {
            errorMessage = "Unexpected error occurred while verifying payment.";
          }
        }
        setIsLoading(false);

        setStatus("FAILED");
        toast.error(<span className="text-rose-400">{errorMessage}</span>);
        setTimeout(() => router.push("/dashboard"), 5000);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [orderId]);

  return (
    <div className="flex p-4 flex-col items-center justify-start pt-12 sm:pt-24 min-h-screen">
      <Card className="w-full max-w-md flex flex-col space-y-4 p-4 py-10">
        <CardHeader>
          <h3 className="text-2xl md:text-3xl text-center bg-linear-to-r from-slate-600 via-rose-500 to-orange-600 bg-clip-text text-transparent font-bold">
            Verifying Payment
          </h3>
          <hr />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full text-center">
            {status === "VERIFIED" ? (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-green-600">
                  Your Payment has been verified successfully.
                </h3>
                <p className="text-muted-foreground text-sm">
                  You will be redirected to your dashboard shortly.
                </p>
              </div>
            ) : status === "FAILED" ? (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-rose-600">
                  Payment Verification Failed.
                </h3>
                <p className="text-muted-foreground text-sm">
                  You will be redirected to your dashboard shortly.
                </p>
              </div>
            ) : (
              <BeatLoader color="#de407e" size={20} />
            )}
          </div>
          {isLoading && (
            <h4 className="text-sm text-rose-500 animate-pulse font-semibold text-center">
              Hold on for some time
            </h4>
          )}
          <p className="text-base text-gray-600 font-medium text-center bg-gradient-to-r from-slate-100 to-emerald-50 px-2 py-3 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300">
            Once your payment is being verified, you'll be redirected to your
            dashboard. If not then click{" "}
            <span className="text-indigo-600 underline cursor-pointer">
              <Link href={"/dashboard"}>here</Link>
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
