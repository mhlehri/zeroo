import Checkout from "@/components/pages/checkout/checkout";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div className="loader mx-auto" />}>
        <Checkout />
      </Suspense>
    </div>
  );
}
