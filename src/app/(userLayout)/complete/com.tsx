"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Com() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    const status = searchParams.get("status");
    console.log("transactionId", transactionId);
    if (status === "success" && transactionId) {
      console.log("Payment successful. Transaction ID:", transactionId);
      // You can also update the UI or redirect the user based on the payment status
    } else {
      console.error("Payment failed or transaction ID is missing");
    }
  }, [searchParams]);
  return (
    <div>
      <div className="bg-primary-50 mx-auto min-h-[70vh] max-w-6xl p-3 md:p-6">
        <h1 className="text-primary-800 mb-8 text-center text-3xl font-bold">
          Payment Complete
        </h1>
        <p className="text-primary-600 text-center text-xl">
          Thank you for your purchase!
        </p>
      </div>
    </div>
  );
}
