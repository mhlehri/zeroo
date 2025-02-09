"use client";
import ProductCard from "@/components/card/product-card";
import CategorySkeleton from "@/components/skeleton/category-skeleton";
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
import { useCategories } from "@/hooks/use-category";
import { useGetProducts } from "@/hooks/use-product";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Link,
  ListFilter,
  MoveLeft,
  Search,
} from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // console.log("Query =>", query, "from product.tsx");
  // console.log("Category =>", category, "from product.tsx");
  // console.log("selectedCategory =>", selectedCategory, "from product.tsx");
  const { products, isLoading, isError, totalProducts } = useGetProducts({
    sortOrder,
    category: selectedCategory,
    query,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalItems = totalProducts || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { categories, isCategoriesLoading } = useCategories();
  // console.log("products =>", products, "from product.tsx");
  // console.log("categories =>", categories, "from product.tsx");
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

  return (
    <div className="my-2 min-h-[90dvh] space-y-3 md:my-6 md:space-y-5">
      <div className="flex items-center justify-between">
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
        <Button
          size="sm"
          variant="light"
          className="flex text-xs md:hidden md:text-sm"
        >
          <Filter /> Filters
        </Button>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger
            className="text-primary h-9 w-fit rounded-md px-3 text-xs md:text-sm"
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
        <div className="hidden w-1/6 flex-col gap-2 pr-2 lg:flex">
          {/* <div>
            <h4 className="text-lg uppercase font-medium">Filter by price</h4>
          </div> */}
          <div>
            <h4 className="mb-2 text-lg font-medium uppercase">Categories</h4>
            <ul className="flex flex-col">
              {isCategoriesLoading ? (
                <div className="mt-4 flex flex-col gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <CategorySkeleton key={`${index}-category-skeleton`} />
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
