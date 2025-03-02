"use client";
import ProductCard from "@/components/card/product-card";
import { Category } from "@/components/layout/navbar/mobile-menu";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories, useCategoryLinks } from "@/hooks/use-category";
import { useGetProducts } from "@/hooks/use-product";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  ListFilter,
  MoveLeft,
  Search,
} from "lucide-react";
import Link from "next/link";
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
  const { categories, isCategoriesLoading } = useCategories();
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };
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
        <div className="hidden w-1/6 flex-col gap-2 pr-2 lg:flex">
          {/* <div>
            <h4 className="text-lg uppercase font-medium">Filter by price</h4>
          </div> */}
          <div className="sticky top-14">
            <h4 className="mb-2 text-lg font-medium uppercase">Categories</h4>
            <div className="flex flex-col">
              {isCategoriesLoading ? (
                <div className="mt-4 flex flex-col gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <CategorySkeleton key={`${index}-category-skeleton`} />
                  ))}
                </div>
              ) : (
                categoryLinks?.length &&
                categoryLinks?.map((category: Category) => (
                  <div key={category.label} className="">
                    {category.subCategory ? (
                      <Collapsible
                        open={openCategories.includes(category.label)}
                        onOpenChange={() => toggleCategory(category.label)}
                      >
                        <CollapsibleTrigger
                          className={`flex w-full cursor-pointer items-center justify-between px-2 py-3 transition-colors outline-none hover:bg-gray-100`}
                        >
                          <span className="font-medium">{category.label}</span>
                          <ChevronDown
                            className={cn(
                              "size-4 text-gray-900 transition-transform duration-200",
                              openCategories.includes(category.label) &&
                                "rotate-180",
                            )}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-2 border-l">
                            {category.subCategory.map((sub) => (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className="flex items-center px-3 py-2.5 text-sm transition-colors hover:bg-gray-100"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={category.href}
                        className="flex items-center px-4 py-3 transition-colors hover:bg-gray-100"
                      >
                        <span className="font-medium">{category.label}</span>
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>
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
