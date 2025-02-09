import Checkout from "@/components/pages/checkout/checkout";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<Loader2 className="mx-auto my-2 animate-spin" />}>
        <Checkout />
      </Suspense>
    </div>
  );
}
