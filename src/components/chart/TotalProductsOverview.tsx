"use client";
import { useGetProducts } from "@/hooks/use-product";
import { Loader2, Package } from "lucide-react";
// import Link from "next/link";

export default function TotalProductsOverview() {
  const { totalProducts, isLoading } = useGetProducts({});

  return (
    <div className="rounded border p-4">
      <div className="text-lg font-medium text-slate-800 md:text-xl">
        <Package /> Total Products
      </div>
      <div>
        <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {isLoading ? <Loader2 className="animate-spin" /> : totalProducts}
        </p>
        {/* {!isLoading && (
          <Link
            href="/admin/product-list"
            className="my-auto text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        )} */}
      </div>
    </div>
  );
}
