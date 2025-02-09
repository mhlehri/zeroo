import React from "react";
import { Skeleton } from "../ui/skeleton";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Skeleton
      className={cn(
        "overflow-hidden w-full max-w-[230px] md:max-w-[270px] bg-slate-50 border border-slate-200 rounded-lg p-2",
        className
      )}
    >
      <div className="p-0 sm:p-2 md:p-3">
        <Skeleton className="w-full h-[200px] bg-slate-200 rounded-none sm:rounded md:rounded-lg" />
      </div>
      <div className="gap-0.5 md:gap-2 px-2 py-2 md:pb-4 md:px-4 md:pt-0 text-center grid grid-rows-2">
        <Skeleton className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
        <Skeleton className="h-4 bg-slate-200 rounded w-1/2 mx-auto mt-2" />
      </div>
      <div className="px-2 md:px-4 pt-0 pb-2 md:pb-4 flex gap-2 flex-col xl:flex-row">
        <div className="h-8 border border-slate-200 rounded w-full text-xs md:text-sm flex justify-center items-center">
          <ShoppingCart className="text-slate-200" />
        </div>
        <div className="h-8 border bg-slate-200 text-slate-50 rounded w-full text-xs md:text-sm flex justify-center items-center">
          Buy Now
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Skeleton>
  );
}
