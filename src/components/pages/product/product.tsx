"use client";
import ProductCard from "@/components/card/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/use-product";
import Link from "next/link";
import { useState } from "react";

export default function Product() {
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { products, isLoading, isError } = useProducts({
    sortOrder,
    category: selectedCategory,
  });

  console.log(products, "productData");

  return (
    <div className="container my-4 md:my-6 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Products</h1>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">No sorting</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
            <SelectItem value="new">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <hr />
      <div className="lg:flex lg:divide-x">
        <div className="hidden lg:flex flex-col w-1/5 pr-2 gap-2">
          {/* <div>
            <h4 className="text-lg uppercase font-medium">Filter by price</h4>
          </div> */}
          <div>
            <h4 className="text-lg uppercase font-medium">
              Product categories
            </h4>
            <ul>
              <Link href="">
                <li></li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="lg:pl-4">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching data</p>}
          <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center lg:grid-cols-4 gap-2 sm:gap-4">
            {productData &&
              products?.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
