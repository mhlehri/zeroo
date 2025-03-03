"use client";
import ProductCard from "@/components/card/product-card";
import type React from "react";

import ProductCardSkeleton from "@/components/skeleton/product-card-skeleton";
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
import { useCategories, useCategoryLinks } from "@/hooks/use-category";
import { useGetProducts } from "@/hooks/use-product";
import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  MoveLeft,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterBy from "./FilterBy";
import FilterMenu from "./FilterMenu";

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
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("2000");

  // console.log("Query =>", query, "from product.tsx");
  // console.log("Category =>", category, "from product.tsx");
  // console.log("selectedCategory =>", selectedCategory, "from product.tsx");
  const { products, isLoading, isError, totalProducts, maximumPrice } =
    useGetProducts({
      sortOrder,
      category: selectedCategory,
      query,
      page: currentPage,
      limit: itemsPerPage,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  const { categories, isCategoriesLoading } = useCategories();

  useEffect(() => {
    if (maximumPrice) {
      setPriceRange([0, maximumPrice]);
      setMaxPrice(maximumPrice.toString());
    }
  }, [maximumPrice]);

  const categoryLinks = useCategoryLinks(categories);
  console.log(categoryLinks, "categoryLinks from product.tsx");
  const totalItems = totalProducts || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // console.log("products =>", products, "from product.tsx");
  console.log("categories =>", categories, "from product.tsx");
  // console.log(
  //   "isCategoriesLoading =>",
  //   isCategoriesLoading,
  //   "from product.tsx",
  // );
  // console.log("selectedCategory =>", selectedCategory, "from product.tsx");

  useEffect(() => {
    setSelectedCategory(category);
    setSortOrder(sort ? sort : "");
  }, [category, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort, query]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setMinPrice(value[0].toString());
    setMaxPrice(value[1].toString());
    setCurrentPage(1);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    if (value && !isNaN(Number(value))) {
      setPriceRange([Number(value), priceRange[1]]);
      setCurrentPage(1);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (value && !isNaN(Number(value))) {
      setPriceRange([priceRange[0], Number(value)]);
      setCurrentPage(1);
    }
  };
  const filterProps = {
    categoryLinks,
    isCategoriesLoading,
    minPrice,
    maxPrice,
    priceRange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handlePriceChange,
    maximumPrice,
  };
  return (
    <div className="min-h-[90dvh] space-y-3 md:my-6 md:space-y-5">
      <div className="flex items-center justify-between">
        <Breadcrumb className="hidden lg:block">
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
        <FilterMenu {...filterProps} />
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger
            className="h-9 w-fit rounded-md px-3 text-xs md:text-sm"
            icon={<ListFilter className="size-4 opacity-70" />}
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOrder ? <SelectItem value="0">No sorting</SelectItem> : null}
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
            <SelectItem value="new">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <hr />
      <div className="lg:flex lg:divide-x">
        <div className="sticky top-20 hidden w-1/6 lg:block">
          <FilterBy {...filterProps} />
        </div>
        <div className="w-full lg:pl-4">
          {isError && <p>Something went wrong please try again later.</p>}

          {isLoading ? (
            <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {Array(itemsPerPage)
                .fill(null)
                .map((_, index) => (
                  <ProductCardSkeleton key={`${index}-card-skeleton`} />
                ))}
            </div>
          ) : products?.length ? (
            <div className="grid grid-cols-2 place-items-center gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {products?.map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-6 flex h-20 w-full items-center justify-center gap-2 rounded bg-amber-500/20 p-3 text-lg font-medium text-slate-600">
                <Search /> No products found
              </div>
              {sortOrder || selectedCategory || category ? (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSortOrder("");
                      setSelectedCategory("");
                      setPriceRange(priceRange);
                      setMinPrice("0");
                      setMaxPrice(maximumPrice.toString());
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <Button asChild>
                  <Link href="/products">
                    <MoveLeft /> Continue Shopping
                  </Link>
                </Button>
              )}
            </>
          )}
          {/* Pagination controls */}
          {products.length > 0 && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
