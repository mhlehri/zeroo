"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import FilterBy from "./FilterBy";

export type Category = {
  label: string;
  href: string;
  subCategory?: { label: string; href: string }[];
};

export default function FilterMenu({
  categoryLinks,
  isCategoriesLoading,
  minPrice,
  maxPrice,
  priceRange,
  handleMinPriceChange,
  handleMaxPriceChange,
  handlePriceChange,
}: {
  categoryLinks: Category[];
  isCategoriesLoading: boolean;
  minPrice: string;
  maxPrice: string;
  priceRange: number[];
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (value: [number, number]) => void;
}) {
  const [open, setOpen] = useState(false);

  // console.log(categories, "categories from mobile menu");

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="light"
            className="flex text-xs md:text-sm lg:hidden"
          >
            <FilterIcon /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent className="p-0" side="left">
          <SheetHeader className="px-4 py-3">
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <FilterBy
            categoryLinks={categoryLinks}
            isCategoriesLoading={isCategoriesLoading}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            handleMinPriceChange={handleMinPriceChange}
            handleMaxPriceChange={handleMaxPriceChange}
            handlePriceChange={handlePriceChange}
            setOpen={setOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
