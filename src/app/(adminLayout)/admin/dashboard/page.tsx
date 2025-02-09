import { DailyOrdersOverview } from "@/components/chart/DailyOrdersOverview";
import { DailyOrderPaymentOverview } from "@/components/chart/DailyOrdersPayment";
import TotalCategoriesOverview from "@/components/chart/TotalCategoriesOverview";
import TotalProductsOverview from "@/components/chart/TotalProductsOverview";
import TotalUserOverview from "@/components/chart/TotalUserOverview";

export default function Page() {
  return (
    <div className="p-4">
      <h2 className="bg-primary-900 mb-3 rounded py-3 text-center text-2xl font-bold text-balance text-slate-200">
        Welcome to Zeroo Admin Dashboard
      </h2>
      <div className="container space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TotalProductsOverview />
          <TotalCategoriesOverview />
          <TotalUserOverview />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <DailyOrdersOverview />
          <DailyOrderPaymentOverview />
        </div>
      </div>
    </div>
  );
}
