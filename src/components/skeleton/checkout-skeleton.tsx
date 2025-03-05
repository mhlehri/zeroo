import { ShoppingBag, Truck, Wallet2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function CheckoutSkeleton() {
  return (
    <div>
      <div className="flex h-full flex-col justify-center md:flex-row">
        <div className="min-h-full w-full p-3 md:bg-white md:py-10 md:pr-10">
          {/* Shipping Information Skeleton */}
          <div className="w-full max-w-xl space-y-3 md:mr-0 md:ml-auto">
            <h2 className="mb-4 flex items-center text-xl font-semibold md:text-2xl">
              <Truck className="mr-2" /> Shipping Information
            </h2>

            {/* Name field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Email field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Phone field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Address field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Shipping method skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>

            {/* Payment method skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>

            {/* Button skeleton */}
            <Skeleton className="mt-3 hidden h-10 w-full md:block" />
          </div>
        </div>

        <div className="w-full md:pl-10">
          {/* Order Summary Skeleton */}
          <div className="w-full max-w-xl space-y-2 p-3 md:space-y-4 md:py-10">
            <h2 className="flex items-center text-xl font-semibold md:text-2xl">
              <ShoppingBag className="mr-2" /> Cart Items
            </h2>

            {/* Cart items skeleton */}
            <ul className="space-y-2 overflow-x-auto overflow-y-scroll pt-2 md:max-h-[360px]">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 border-b pb-2"
                  >
                    <Skeleton className="size-14 rounded-md" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </li>
                ))}
            </ul>

            <h2 className="flex items-center text-xl font-semibold md:text-2xl">
              <Wallet2 className="mr-2" /> Order Summary
            </h2>

            {/* Order summary skeleton */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="mt-4 flex justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            {/* Mobile button skeleton */}
            <Skeleton className="mt-3 mb-10 h-10 w-full md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
