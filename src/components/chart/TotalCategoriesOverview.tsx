"use client";
import { useCategories } from "@/hooks/use-category";
import { Loader2, Tags } from "lucide-react";
// import Link from "next/link";
export default function TotalCategoriesOverview() {
  const { totalCategories, isCategoriesLoading } = useCategories();

  return (
    <div className="rounded border p-4">
      <div className="text-lg font-medium text-slate-800 md:text-xl">
        <Tags /> Total Categories
      </div>
      <div>
        <p className="text-xl font-semibold md:text-2xl lg:text-3xl">
          {isCategoriesLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            totalCategories
          )}
        </p>
        {/* {!isCategoriesLoading && (
          <Link
            href="/admin/category-list"
            className="my-auto text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        )} */}
      </div>
    </div>
  );
}
