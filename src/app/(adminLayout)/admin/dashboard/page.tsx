import { DailyOrdersOverview } from "@/components/chart/DailyOrdersOverview";
import { DailyOrderPaymentOverview } from "@/components/chart/DailyOrdersPayment";
import TotalOverview from "@/components/chart/TotalOverview";
// import { Loader2 } from "lucide-react";
// import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container">
      <h2 className="roundeddd mb-3 bg-teal-800 p-3 text-lg font-bold text-balance text-slate-200 sm:text-xl md:text-2xl">
        Welcome to Rongberong Admin Dashboard
      </h2>
      <div className="space-y-4">
        {/* <Suspense fallback={<Loader2 className="animate-spin" />}> */}
        <TotalOverview />
        {/* </Suspense> */}
        <div className="flex flex-wrap gap-4">
          <DailyOrdersOverview />
          <DailyOrderPaymentOverview />
        </div>
      </div>
    </div>
  );
}
