"use client";

import { ShoppingBag, Wallet2 } from "lucide-react";

export default function CartSkeleton() {
  return (
    <div className="my-4 h-full min-h-[60vh]">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 gap-6 px-4 md:my-6 md:gap-8 lg:min-h-[50vh] lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          {/* Cart Items Skeleton */}
          <div className="roundeddd-lg bg-white p-3 shadow-md md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-start text-2xl font-semibold">
                <ShoppingBag className="mr-2" /> Items
              </h2>
              <div className="roundeddd h-7 w-24 animate-pulse bg-gray-200"></div>
            </div>
            <ul className="space-y-4">
              {/* Skeleton Item 1 */}
              <li className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row">
                <div className="flex gap-2 md:flex-nowrap md:gap-4">
                  <div className="roundeddd-md size-16 animate-pulse bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="roundeddd h-5 w-32 animate-pulse bg-gray-200"></div>
                    <div className="roundeddd h-4 w-24 animate-pulse bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="roundeddd-md h-9 w-28 animate-pulse bg-gray-200"></div>
                  <div className="roundeddd-md h-9 w-20 animate-pulse bg-gray-200"></div>
                </div>
              </li>

              {/* Skeleton Item 2 */}
              <li className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row">
                <div className="flex gap-2 md:flex-nowrap md:gap-4">
                  <div className="roundeddd-md size-16 animate-pulse bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="roundeddd h-5 w-40 animate-pulse bg-gray-200"></div>
                    <div className="roundeddd h-4 w-28 animate-pulse bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="roundeddd-md h-9 w-28 animate-pulse bg-gray-200"></div>
                  <div className="roundeddd-md h-9 w-20 animate-pulse bg-gray-200"></div>
                </div>
              </li>

              {/* Skeleton Item 3 */}
              <li className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="flex gap-2 md:flex-nowrap md:gap-4">
                  <div className="roundeddd-md size-16 animate-pulse bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="roundeddd h-5 w-36 animate-pulse bg-gray-200"></div>
                    <div className="roundeddd h-4 w-20 animate-pulse bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="roundeddd-md h-9 w-28 animate-pulse bg-gray-200"></div>
                  <div className="roundeddd-md h-9 w-20 animate-pulse bg-gray-200"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative h-full">
          <div className="top-20 space-y-8 lg:sticky">
            {/* Order Summary Skeleton */}
            <div className="roundeddd-lg bg-white p-3 shadow-md md:p-6">
              <h2 className="mb-4 flex items-center text-2xl font-semibold">
                <Wallet2 className="mr-2" /> Cart Total
              </h2>
              <div className="space-y-2 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <div className="roundeddd h-5 w-20 animate-pulse bg-gray-200"></div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <div className="roundeddd h-5 w-20 animate-pulse bg-gray-200"></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="roundeddd-full h-4 w-4 animate-pulse bg-gray-200"></div>
                    <div className="roundeddd h-4 w-32 animate-pulse bg-gray-200"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="roundeddd-full h-4 w-4 animate-pulse bg-gray-200"></div>
                    <div className="roundeddd h-4 w-36 animate-pulse bg-gray-200"></div>
                  </div>
                </div>
                <hr />
                <div className="mt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <div className="roundeddd h-6 w-24 animate-pulse bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Actions Skeleton */}
            <div className="roundeddd-md h-10 w-full animate-pulse bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
