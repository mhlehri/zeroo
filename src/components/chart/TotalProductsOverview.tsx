"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useGetProducts } from "@/hooks/use-product";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function TotalProductsOverview() {
  const { totalProducts, isLoading } = useGetProducts({});

  return (
    <Card>
      <CardHeader className="text-center text-xl font-bold md:text-2xl">
        Total Products
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          {isLoading ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            totalProducts
          )}
        </p>
      </CardContent>
      {!isLoading && (
        <CardFooter>
          <Link
            href="/admin/product-list"
            className="mx-auto my-auto text-center text-sm underline hover:text-blue-500"
          >
            View list
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
