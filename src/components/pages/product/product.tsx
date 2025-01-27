"use client";
import ProductCard from "@/components/card/product-card";
import { getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Product() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await getProducts({});
      console.log(result, "result");
      return result;
    },
  });
  const productData = data || {};
  return (
    <div className="container my-10 md:my-20">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData &&
          productData?.data?.products?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
