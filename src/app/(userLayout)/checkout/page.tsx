import Checkout from "@/components/pages/checkout/checkout";
import CheckoutSkeleton from "@/components/skeleton/checkout-skeleton";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<CheckoutSkeleton />}>
        <Checkout />
      </Suspense>
    </div>
  );
}
