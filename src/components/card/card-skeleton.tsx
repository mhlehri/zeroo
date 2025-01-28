import { ShoppingCart } from "lucide-react";
import { Card } from "../ui/card";

export default function CardSkeleton() {
  return (
    <Card className="overflow-hidden w-full max-w-[230px] md:max-w-[270px] animate-pulse">
      <div className="p-0 sm:p-2 md:p-3">
        <div className="w-full h-[200px] bg-gray-300 rounded-none sm:rounded md:rounded-lg"></div>
      </div>
      <div className="gap-0.5 md:gap-2 px-2 py-2 md:pb-4 md:px-4 md:pt-0 text-center grid grid-rows-2">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2"></div>
      </div>
      <div className="px-2 md:px-4 pt-0 pb-2 md:pb-4">
        <div className="h-8 border border-gray-300 text-gray-300 rounded w-full text-xs md:text-sm flex items-center justify-center gap-2">
          <ShoppingCart /> add to cart
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Card>
  );
}
