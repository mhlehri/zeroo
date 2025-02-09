"use client";
import { useCategories } from "@/hooks/use-category";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
export default function TotalCategoriesOverview() {
  const { totalCategories, isCategoriesLoading } = useCategories();

  return (
    <Card>
      <CardHeader className="text-center text-xl font-bold md:text-2xl">
        Total Categories
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          {isCategoriesLoading ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            totalCategories
          )}
        </p>
      </CardContent>
      {!isCategoriesLoading && (
        <CardFooter>
          <Link
            href="/admin/category-list"
            className="mx-auto my-auto text-center text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
