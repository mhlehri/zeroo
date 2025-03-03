import React, { useState } from "react";
import { Category } from "./FilterMenu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import CategorySkeleton from "@/components/skeleton/category-skeleton";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export type filterPropsType = {
  categoryLinks: Category[];
  isCategoriesLoading: boolean;
  minPrice: string;
  maxPrice: string;
  priceRange: number[];
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (value: [number, number]) => void;
  maximumPrice: number;
};

export default function FilterBy({
  categoryLinks,
  isCategoriesLoading,
  minPrice,
  maxPrice,
  priceRange,
  handleMinPriceChange,
  handleMaxPriceChange,
  handlePriceChange,
  setOpen,
  maximumPrice,
}: filterPropsType & { setOpen?: (open: boolean) => void }) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };
  const maxPriceValue = maximumPrice > 2000 ? maximumPrice : 2000;
  return (
    <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-2 lg:max-h-[calc(100vh-15rem)]">
      <div className="mb-6">
        <h4 className="mb-4 text-lg font-medium uppercase">Filter by price</h4>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, maximumPrice]}
            max={maxPriceValue}
            step={10}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="py-4"
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="h-9"
              />
            </div>
            <span className="text-sm">to</span>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="h-9"
              />
            </div>
          </div>
        </div>
      </div>
      <h4 className="mb-4 text-lg font-medium uppercase">Categories</h4>
      <div className="flex flex-col">
        {isCategoriesLoading ? (
          <div className="flex flex-col gap-6">
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
                        openCategories.includes(category.label) && "rotate-180",
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="ml-2 border-l">
                      {category.subCategory.map((sub) => (
                        <Link
                          onClick={() => setOpen && setOpen(false)}
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
                  onClick={() => setOpen && setOpen(false)}
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
  );
}
