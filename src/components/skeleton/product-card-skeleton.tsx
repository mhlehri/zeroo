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
        "roundeddd-lg w-full max-w-[230px] overflow-hidden border border-slate-200 bg-slate-50 p-2 md:max-w-[270px]",
        className,
      )}
    >
      <div className="p-0 sm:p-2 md:p-3">
        <Skeleton className="roundeddd-none sm:roundeddd md:roundeddd-lg h-[200px] w-full bg-slate-200" />
      </div>
      <div className="grid grid-rows-2 gap-0.5 px-2 py-2 text-center md:gap-2 md:px-4 md:pt-0 md:pb-4">
        <Skeleton className="roundeddd mx-auto h-4 w-3/4 bg-slate-200" />
        <Skeleton className="roundeddd mx-auto mt-2 h-4 w-1/2 bg-slate-200" />
      </div>
      <div className="flex flex-col gap-2 px-2 pt-0 pb-2 md:px-4 md:pb-4 xl:flex-row">
        <div className="roundeddd flex h-8 w-full items-center justify-center border border-slate-200 text-xs md:text-sm">
          <ShoppingCart className="text-slate-200" />
        </div>
        <div className="roundeddd flex h-8 w-full items-center justify-center border bg-slate-200 text-xs text-slate-50 md:text-sm">
          Buy Now
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Skeleton>
  );
}
