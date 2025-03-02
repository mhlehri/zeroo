"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type Category = {
  label: string;
  href: string;
  subCategory?: { label: string; href: string }[];
};

export default function MobileMenu({
  textHidden,
  className,
  categories,
}: {
  textHidden?: boolean;
  className?: string;
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  // const [openCategories, setOpenCategories] = useState<string[]>([]);
  // const { isProductPage } = usePage();
  // const toggleCategory = (category: string) => {
  //   setOpenCategories((prev) =>
  //     prev.includes(category)
  //       ? prev.filter((c) => c !== category)
  //       : [...prev, category],
  //   );
  // };

  // console.log(categories, "categories from mobile menu");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={className}>
        <>
          <Menu className="size-5 text-black" />
          <span
            className="text-primary-500 truncate text-xs"
            hidden={textHidden}
          >
            Menu
          </span>
        </>
      </SheetTrigger>
      <SheetContent className="p-0" side="left">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto">
          {categories?.length > 0 &&
            categories?.map((category) => (
              <div key={category.label} className="border-b last:border-b-0">
                {/* {category.subCategory ? (
                  <Collapsible
                    open={openCategories.includes(category.label)}
                    onOpenChange={() => toggleCategory(category.label)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 transition-colors outline-none hover:bg-gray-100">
                      <Link href={category.href}>
                        <span className="font-medium">{category.label}</span>
                      </Link>
                      <ChevronDown
                        className={cn(
                          "size-4 text-gray-900 transition-transform duration-200",
                          openCategories.includes(category.label) &&
                            "rotate-180",
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t bg-gray-100">
                        {category.subCategory.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="flex items-center border-b px-6 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-gray-50"
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : ( */}
                <Link
                  href={category.href}
                  className="flex items-center px-4 py-3 transition-colors hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-medium">{category.label}</span>
                </Link>
                {/* )} */}
              </div>
            ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
