"use client";
import CardSkeleton from "@/components/card/card-skeleton";
import ProductCard from "@/components/card/product-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/use-category";
import { useProducts } from "@/hooks/use-product";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Product({
  query,
  category,
  sort,
}: {
  query: string;
  category: string;
  sort: string;
}) {
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("Query =>", query, "from product.tsx");
  console.log("Category =>", category, "from product.tsx");
  console.log("selectedCategory =>", selectedCategory, "from product.tsx");
  const { products, isLoading, isError } = useProducts({
    sortOrder,
    category: selectedCategory,
    query,
  });

  const { categories, isCategoriesLoading } = useCategories();
  console.log("products =>", products, "from product.tsx");
  console.log("categories =>", categories, "from product.tsx");
  console.log(
    "isCategoriesLoading =>",
    isCategoriesLoading,
    "from product.tsx"
  );
  console.log("selectedCategory =>", selectedCategory, "from product.tsx");

  useEffect(() => {
    setSelectedCategory(category);
    setSortOrder(sort ? sort : "");
  }, [category, sort]);

  return (
    <div className="container my-2 md:my-6 space-y-3 md:space-y-5">
      <div className="flex justify-between items-center">
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="outline" className="text-xs md:text-sm flex md:hidden">
          <Filter /> Filters
        </Button>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-fit text-xs md:text-sm">
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
        <div className="hidden lg:flex flex-col w-1/6 pr-2 gap-2">
          {/* <div>
            <h4 className="text-lg uppercase font-medium">Filter by price</h4>
          </div> */}
          <div>
            <h4 className="text-lg uppercase font-medium mb-2">Categories</h4>
            <ul className="flex flex-col">
              {isCategoriesLoading ? (
                <div className="flex flex-col gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2.5 bg-gray-200 rounded w-3/4 animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                categories &&
                categories?.map((category) => (
                  <Button
                    key={category._id}
                    variant="link"
                    onClick={() => setSelectedCategory(category?.name)}
                    asChild
                    className="inline-block cursor-pointer pl-0 font-normal"
                  >
                    <li>{category.name}</li>
                  </Button>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="lg:pl-4 w-full">
          {isError && <p>Error fetching data</p>}

          <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center lg:grid-cols-4 gap-2 sm:gap-4">
            {isLoading ? (
              Array(8)
                .fill(null)
                .map((_, index) => (
                  <CardSkeleton key={`${index}-card-skeleton`} />
                ))
            ) : products?.length ? (
              products?.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center font-medium text-lg flex gap-2 w-full">
                <Search /> No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
